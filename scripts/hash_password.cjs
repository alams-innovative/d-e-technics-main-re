// scripts/hash_password.cjs
// Usage:
//   1) Interactive (unmasked on Windows terminals):
//        node scripts/hash_password.cjs
//   2) Env var (recommended to avoid echo on screen/history):
//        $env:PASSWORD="yourSecret"; node scripts/hash_password.cjs; Remove-Item Env:PASSWORD
//   3) CLI flag:
//        node scripts/hash_password.cjs --password "yourSecret"
//
// Output: Bcrypt hash string suitable for storing in your DB
//   $2b$12$<salt+hash>

const bcrypt = require('bcryptjs');
const readline = require('readline');

const SALT_ROUNDS = 12; // Good balance of security and performance

function getCliPasswordArg() {
  const idx = process.argv.findIndex(a => a === '--password' || a === '-p');
  if (idx !== -1 && process.argv[idx + 1]) {
    return process.argv[idx + 1];
  }
  const eqArg = process.argv.find(a => a.startsWith('--password='));
  if (eqArg) return eqArg.split('=').slice(1).join('=');
  return null;
}

async function promptPassword(question = 'Enter password: ') {
  // Note: readline on Windows does not mask input by default.
  // Prefer using env PASSWORD or the --password flag.
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question(question, (ans) => resolve(ans)));
  rl.close();
  return answer;
}

async function main() {
  const cliPwd = getCliPasswordArg();
  const inputPwd = cliPwd || (await promptPassword());
  if (!inputPwd) {
    console.error('No password provided. Use --password flag or enter interactively.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(inputPwd, SALT_ROUNDS);
  // Bcrypt hash example:
  // $2b$12$<salt+hash>
  console.log(hash);
}

main().catch((err) => {
  console.error('Error:', err?.message || err);
  process.exit(1);
});
