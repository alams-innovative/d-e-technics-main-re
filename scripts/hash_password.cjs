// scripts/hash_password.cjs
// Usage:
//   1) Interactive (unmasked on Windows terminals):
//        node scripts/hash_password.cjs
//   2) Env var (recommended to avoid echo on screen/history):
//        $env:PASSWORD="yourSecret"; node scripts/hash_password.cjs; Remove-Item Env:PASSWORD
//   3) CLI flag:
//        node scripts/hash_password.cjs --password "yourSecret"
//
// Output: Argon2id PHC string suitable for storing in your DB
//   $argon2id$v=19$m=19456,t=2,p=1$<salt_b64>$<hash_b64>

const argon2 = require('argon2');
const readline = require('readline');

const CONFIG = {
  type: argon2.argon2id, // Argon2id (recommended)
  memoryCost: 19456,     // ~19 MB
  timeCost: 2,           // iterations
  parallelism: 1,        // threads/lanes
  hashLength: 32,        // 32 bytes (256-bit)
};

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
  const inputPwd = process.env.PASSWORD || cliPwd || (await promptPassword());
  if (!inputPwd) {
    console.error('No password provided. Use env PASSWORD, --password flag, or enter interactively.');
    process.exit(1);
  }

  const hash = await argon2.hash(inputPwd, CONFIG);
  // PHC string example:
  // $argon2id$v=19$m=19456,t=2,p=1$<salt_b64>$<hash_b64>
  console.log(hash);
}

main().catch((err) => {
  console.error('Error:', err?.message || err);
  process.exit(1);
});
