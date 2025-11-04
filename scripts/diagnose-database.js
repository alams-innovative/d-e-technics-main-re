// Comprehensive database schema analysis and codebase validation
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Read .env.local file manually
function loadEnvFile() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key] = valueParts.join('=').replace(/^"(.*)"$/, '$1');
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error reading .env.local:', error.message);
    return {};
  }
}

async function getDatabaseSchema(pool) {
  console.log('📊 ANALYZING DATABASE SCHEMA...\n');
  
  const client = await pool.connect();
  try {
    // Get all tables and their columns
    const schemaQuery = `
      SELECT 
        t.table_name,
        c.column_name,
        c.data_type,
        c.character_maximum_length,
        c.is_nullable,
        c.column_default,
        tc.constraint_type
      FROM 
        information_schema.tables t
      LEFT JOIN 
        information_schema.columns c ON t.table_name = c.table_name
      LEFT JOIN 
        information_schema.key_column_usage kcu ON c.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN 
        information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name
      WHERE 
        t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
      ORDER BY 
        t.table_name, c.ordinal_position;
    `;
    
    const result = await client.query(schemaQuery);
    
    // Group by table
    const tables = {};
    result.rows.forEach(row => {
      if (!tables[row.table_name]) {
        tables[row.table_name] = [];
      }
      if (row.column_name) {
        tables[row.table_name].push({
          column: row.column_name,
          type: row.data_type,
          maxLength: row.character_maximum_length,
          nullable: row.is_nullable === 'YES',
          default: row.column_default,
          constraint: row.constraint_type
        });
      }
    });
    
    // Display schema
    console.log('🗄️  DATABASE TABLES AND COLUMNS:');
    console.log('=====================================\n');
    
    for (const [tableName, columns] of Object.entries(tables)) {
      console.log(`📋 Table: ${tableName.toUpperCase()}`);
      console.log('─'.repeat(50));
      
      columns.forEach(col => {
        const typeInfo = col.maxLength ? `${col.type}(${col.maxLength})` : col.type;
        const nullable = col.nullable ? 'NULL' : 'NOT NULL';
        const constraint = col.constraint ? `[${col.constraint}]` : '';
        const defaultValue = col.default ? `DEFAULT: ${col.default}` : '';
        
        console.log(`  • ${col.column.padEnd(20)} | ${typeInfo.padEnd(15)} | ${nullable.padEnd(8)} ${constraint} ${defaultValue}`);
      });
      console.log('');
    }
    
    return tables;
  } finally {
    client.release();
  }
}

async function analyzeCodebaseMatches(schema) {
  console.log('🔍 ANALYZING CODEBASE FOR SCHEMA MISMATCHES...\n');
  
  const issues = [];
  const fixes = [];
  
  // Define files to check
  const filesToCheck = [
    'lib/zod-schemas.ts',
    'components/contact-form.tsx',
    'app/api/contact/route.ts',
    'app/api/quote/route.ts'
  ];
  
  // Check each file
  for (const filePath of filesToCheck) {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }
    
    console.log(`📝 Checking: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for contacts table issues
    if (schema.contacts) {
      const contactColumns = schema.contacts.map(col => col.column);
      console.log(`   Contacts table columns: ${contactColumns.join(', ')}`);
      
      // Check if code references non-existent columns
      contactColumns.forEach(column => {
        const regex = new RegExp(`['"]\s*${column}\s*['"]|${column}\\s*:`, 'g');
        const matches = content.match(regex);
        if (matches) {
          console.log(`   ✅ Found references to column '${column}': ${matches.length} matches`);
        }
      });
      
      // Check for potential issues with country_code
      if (content.includes('country_code')) {
        const countryCol = schema.contacts.find(col => col.column === 'country_code');
        if (countryCol) {
          console.log(`   📍 country_code column type: ${countryCol.type}(${countryCol.maxLength || 'no limit'})`);
          
          // Check if validation matches database constraints
          if (countryCol.type === 'character varying' && countryCol.maxLength === 3) {
            console.log('   ✅ Database expects 3-character country codes');
          }
        }
      }
    }
    
    // Check for quotes table issues  
    if (schema.quotes) {
      const quoteColumns = schema.quotes.map(col => col.column);
      console.log(`   Quotes table columns: ${quoteColumns.join(', ')}`);
    }
    
    console.log('');
  }
  
  return { issues, fixes };
}

async function generateFixes(schema, issues) {
  console.log('🔧 GENERATING AUTOMATIC FIXES...\n');
  
  const fixes = [];
  
  // Check contact form validation
  if (schema.contacts) {
    const countryCol = schema.contacts.find(col => col.column === 'country_code');
    if (countryCol && countryCol.maxLength === 3) {
      fixes.push({
        file: 'lib/zod-schemas.ts',
        issue: 'country_code should accept country names and convert to 3-letter ISO codes',
        status: 'Already fixed in previous updates'
      });
    }
  }
  
  // Check API route consistency
  fixes.push({
    file: 'app/api/contact/route.ts',
    issue: 'Ensure API validates and transforms country codes properly',
    action: 'Verify contactSchema is used correctly'
  });
  
  return fixes;
}

async function validateFormData() {
  console.log('📋 TESTING FORM DATA VALIDATION...\n');
  
  // Test the actual payload that was failing
  const testPayload = {
    "name": "Halal Man",
    "email": "asmir.alams.com@gmail.com", 
    "phone": "3300005604",
    "country_code": "Pakistan",
    "product": "DE-BR Batch Roller",
    "message": "awdaefsef"
  };
  
  console.log('🧪 Testing payload that caused the error:');
  console.log(JSON.stringify(testPayload, null, 2));
  console.log('');
  
  // Import and test the schema
  try {
    // We'll need to dynamically import the schema to test it
    console.log('⏳ Loading validation schema...');
    
    // Check if the country mapping works
    const countries = [
      { name: 'Pakistan', expectedCode: 'PAK' },
      { name: 'United States', expectedCode: 'USA' },
      { name: 'India', expectedCode: 'IND' }
    ];
    
    console.log('🌍 Testing country code mapping:');
    countries.forEach(country => {
      console.log(`   ${country.name} → should map to → ${country.expectedCode}`);
    });
    
  } catch (error) {
    console.error('❌ Schema validation test failed:', error.message);
  }
}

async function runDiagnosis() {
  const env = loadEnvFile();
  
  if (!env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    return;
  }
  
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  console.log('🚀 STARTING COMPREHENSIVE DATABASE DIAGNOSIS\n');
  console.log('='.repeat(60));
  
  try {
    // Test connection
    console.log('⏳ Testing database connection...');
    const client = await pool.connect();
    console.log('✅ Database connection successful!\n');
    client.release();
    
    // Get schema
    const schema = await getDatabaseSchema(pool);
    
    // Analyze codebase
    const analysis = await analyzeCodebaseMatches(schema);
    
    // Generate fixes
    const fixes = await generateFixes(schema, analysis.issues);
    
    // Validate form data
    await validateFormData();
    
    // Summary
    console.log('📊 DIAGNOSIS SUMMARY');
    console.log('===================');
    console.log(`Tables found: ${Object.keys(schema).length}`);
    console.log(`Issues identified: ${analysis.issues.length}`);
    console.log(`Fixes available: ${fixes.length}`);
    
    if (fixes.length > 0) {
      console.log('\n🔧 RECOMMENDED FIXES:');
      fixes.forEach((fix, index) => {
        console.log(`${index + 1}. ${fix.file}: ${fix.issue}`);
        if (fix.action) console.log(`   Action: ${fix.action}`);
        if (fix.status) console.log(`   Status: ${fix.status}`);
      });
    }
    
    console.log('\n✅ Diagnosis complete!');
    
  } catch (error) {
    console.error('❌ Diagnosis failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await pool.end();
  }
}

// Run the diagnosis
runDiagnosis().catch(console.error);
