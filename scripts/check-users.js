// scripts/check-users.js
// Check all users in the database and show their current password hashes
import { Pool } from 'pg';
import { readFileSync } from 'fs';

// Load .env.local manually
const envFile = readFileSync('.env.local', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
});

const pool = new Pool({
  connectionString: envVars.DATABASE_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkUsers() {
  try {
    console.log('🔍 Connecting to database...\n');
    
    // Check if users table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('❌ Users table does not exist!');
      console.log('\nAvailable tables:');
      const tables = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      tables.rows.forEach(row => console.log(`  - ${row.table_name}`));
      return;
    }
    
    // Get all users
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    
    if (result.rows.length === 0) {
      console.log('⚠️  No users found in the database.');
      return;
    }
    
    console.log(`✅ Found ${result.rows.length} user(s):\n`);
    console.log('═'.repeat(80));
    
    result.rows.forEach((user, index) => {
      console.log(`\nUser #${index + 1}:`);
      console.log(`  ID:       ${user.id}`);
      console.log(`  Username: ${user.username}`);
      console.log(`  Email:    ${user.email || 'N/A'}`);
      console.log(`  Role:     ${user.role || 'N/A'}`);
      console.log(`  Password Hash: ${user.password_hash || 'NULL/EMPTY'}`);
      console.log(`  Hash Type: ${detectHashType(user.password_hash)}`);
      console.log(`  Created:  ${user.created_at || 'N/A'}`);
      console.log('─'.repeat(80));
    });
    
    console.log('\n📋 Summary:');
    const hashTypes = result.rows.reduce((acc, user) => {
      const type = detectHashType(user.password_hash);
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(hashTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} user(s)`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

function detectHashType(hash) {
  if (!hash) return 'EMPTY/NULL';
  if (/^\$argon2(i|d|id)\$/.test(hash)) return 'Argon2 (needs migration)';
  if (/^\$2[aby]\$\d{2}\$/.test(hash)) return 'Bcrypt (compatible)';
  if (/^[a-fA-F0-9]{64}$/.test(hash)) return 'SHA-256/WebCrypto (compatible)';
  return 'Unknown format';
}

checkUsers();
