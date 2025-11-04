// scripts/create-bcrypt-hash.js
// Quick tool to generate bcrypt hashes for any password
// Usage:
//   1) Interactive:
//        node scripts/create-bcrypt-hash.js
//   2) With password argument:
//        node scripts/create-bcrypt-hash.js "myPassword123"
//   3) Environment variable:
//        $env:PASSWORD="myPassword123"; node scripts/create-bcrypt-hash.js; Remove-Item Env:PASSWORD

import bcrypt from 'bcryptjs';
import readline from 'readline';

const SALT_ROUNDS = 12; // Good balance of security and performance

function getPasswordFromArgs() {
  // Check if password was passed as argument
  if (process.argv[2]) {
    return process.argv[2];
  }
  return null;
}

function promptPassword(question = 'Enter password to hash: ') {
  const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
  });
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log('🔐 Bcrypt Password Hash Generator\n');
  
  // Get password from args, env, or prompt
  const password = process.env.PASSWORD || getPasswordFromArgs() || await promptPassword();
  
  if (!password) {
    console.error('❌ No password provided.');
    process.exit(1);
  }
  
  if (password.length < 6) {
    console.error('⚠️  Warning: Password is very short (less than 6 characters)');
  }
  
  console.log('\n⏳ Generating bcrypt hash...\n');
  
  const startTime = Date.now();
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const duration = Date.now() - startTime;
  
  console.log('✅ Hash generated successfully!\n');
  console.log('═'.repeat(80));
  console.log('Password:', password);
  console.log('Hash:    ', hash);
  console.log('═'.repeat(80));
  console.log(`\nSalt Rounds: ${SALT_ROUNDS}`);
  console.log(`Generation Time: ${duration}ms`);
  console.log(`Hash Length: ${hash.length} characters`);
  
  // Verify the hash works
  console.log('\n🔍 Verifying hash...');
  const isValid = await bcrypt.compare(password, hash);
  console.log(isValid ? '✅ Verification successful!' : '❌ Verification failed!');
  
  console.log('\n📋 Copy the hash above to use in your database or .env file');
}

main().catch((err) => {
  console.error('❌ Error:', err?.message || err);
  process.exit(1);
});
