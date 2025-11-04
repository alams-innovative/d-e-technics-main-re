// Test database connection to Neon PostgreSQL
import { Pool } from 'pg';
import fs from 'fs';

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
          envVars[key] = valueParts.join('=');
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error reading .env.local:', error.message);
    return {};
  }
}

async function testConnection() {
  const env = loadEnvFile();
  
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
  });

  console.log('🔍 Testing connection to Neon PostgreSQL...');
  console.log('🔗 Using DATABASE_URL from .env.local');
  console.log('🔒 SSL: Enabled');
  console.log('');

  try {
    console.log('⏳ Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    console.log('⏳ Testing basic query...');
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Query test successful!');
    console.log('🕒 Current time:', result.rows[0].current_time);
    console.log('🐘 PostgreSQL version:', result.rows[0].pg_version.split(' ')[0]);
    
    // Check if tables exist
    console.log('⏳ Checking for existing tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📊 Available tables:', tablesResult.rows.length);
    if (tablesResult.rows.length > 0) {
      tablesResult.rows.forEach(row => {
        console.log('   • ' + row.table_name);
      });
      
      // If quotes table exists, count records
      const quotesTable = tablesResult.rows.find(row => row.table_name === 'quotes');
      if (quotesTable) {
        const countResult = await client.query('SELECT COUNT(*) as count FROM quotes');
        console.log('📈 Quotes in database:', countResult.rows[0].count);
      }
    } else {
      console.log('⚠️  No tables found. You may need to run the schema setup.');
      console.log('💡 Run: node -e "import(\'./lib/setup-database.js\')"');
    }
    
    client.release();
    await pool.end();
    
    console.log('');
    console.log('🎉 All tests passed! Your Neon PostgreSQL connection is working perfectly!');
    
  } catch (error) {
    console.log('');
    console.error('❌ Database connection failed:', error.message);
    console.error('🔍 Error code:', error.code);
    
    // Provide helpful troubleshooting tips
    console.log('');
    console.log('🛠️  Troubleshooting tips:');
    
    if (error.code === 'ENOTFOUND') {
      console.log('   • Check if DATABASE_URL is correct in .env.local');
      console.log('   • Verify your Neon database is active');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('   • Check your Neon database status');
      console.log('   • Verify the connection string is correct');
    } else if (error.message.includes('password authentication failed')) {
      console.log('   • Check your DATABASE_URL credentials');
      console.log('   • Verify the password in your Neon dashboard');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.log('   • Check if the database name in DATABASE_URL is correct');
      console.log('   • Verify the database exists in your Neon project');
    }
    
    await pool.end();
  }
}

testConnection();
