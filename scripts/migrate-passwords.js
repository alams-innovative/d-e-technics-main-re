// scripts/migrate-passwords.js
// Migrate user passwords from Argon2 to Bcrypt
// Usage: node scripts/migrate-passwords.js
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import readline from 'readline';
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function migratePasswords() {
  try {
    console.log('🔐 Password Migration Tool (Argon2 → Bcrypt)\n');
    
    // Get all users with Argon2 hashes
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    
    if (result.rows.length === 0) {
      console.log('⚠️  No users found.');
      rl.close();
      return;
    }
    
    const argon2Users = result.rows.filter(user => 
      /^\$argon2(i|d|id)\$/.test(user.password_hash)
    );
    
    if (argon2Users.length === 0) {
      console.log('✅ No Argon2 passwords found. All users are already migrated!');
      rl.close();
      return;
    }
    
    console.log(`Found ${argon2Users.length} user(s) with Argon2 passwords:\n`);
    argon2Users.forEach(user => {
      console.log(`  - ${user.username} (ID: ${user.id})`);
    });
    
    console.log('\n⚠️  You need to set new passwords for these users.');
    console.log('Options:');
    console.log('  1. Set individual passwords for each user');
    console.log('  2. Set same temporary password for all users');
    console.log('  3. Cancel\n');
    
    const choice = await question('Choose option (1/2/3): ');
    
    if (choice === '1') {
      await migrateIndividually(argon2Users);
    } else if (choice === '2') {
      await migrateWithSamePassword(argon2Users);
    } else {
      console.log('❌ Migration cancelled.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
    await pool.end();
  }
}

async function migrateIndividually(users) {
  console.log('\n📝 Setting individual passwords...\n');
  
  for (const user of users) {
    console.log(`\nUser: ${user.username} (ID: ${user.id})`);
    const password = await question('Enter new password: ');
    
    if (!password || password.length < 6) {
      console.log('⚠️  Password too short (min 6 chars). Skipping...');
      continue;
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, user.id]
    );
    
    console.log(`✅ Password updated for ${user.username}`);
  }
  
  console.log('\n✅ Migration complete!');
}

async function migrateWithSamePassword(users) {
  console.log('\n📝 Setting temporary password for all users...\n');
  
  const password = await question('Enter temporary password (min 6 chars): ');
  
  if (!password || password.length < 6) {
    console.log('❌ Password too short. Migration cancelled.');
    return;
  }
  
  const confirm = await question(`\n⚠️  Set "${password}" for ${users.length} user(s)? (yes/no): `);
  
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Migration cancelled.');
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  for (const user of users) {
    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, user.id]
    );
    console.log(`✅ Updated: ${user.username}`);
  }
  
  console.log('\n✅ Migration complete!');
  console.log(`\n⚠️  Remember to tell users to change their password after login.`);
}

migratePasswords();
