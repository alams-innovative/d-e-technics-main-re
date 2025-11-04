import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'node:path';

// Load environment variables from .env.local (project root)
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const resultLocal = dotenv.config({ path: envLocalPath });
if (resultLocal?.error) {
  console.warn(`⚠️  .env.local not loaded from ${envLocalPath} (this may be fine if variables are already set)`);
} else {
  console.log(`✅ Loaded environment variables from ${envLocalPath}`);
}
// Also attempt to load a generic .env as a fallback (no override)
dotenv.config();

function maskSecret(str) {
  if (!str) return '(not set)';
  if (str.length <= 4) return '***';
  return `${str.slice(0, 2)}***${str.slice(-2)}`;
}

function parseIntOr(val, fallback) {
  const n = parseInt(val, 10);
  return Number.isNaN(n) ? fallback : n;
}

function parseBool(val, defaultValue) {
  if (val === undefined || val === null || val === '') return defaultValue;
  const s = String(val).toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(s)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(s)) return false;
  return defaultValue;
}

function getCliArg(name, defaultValue) {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === `--${name}`) {
      return args[i + 1] ?? defaultValue;
    }
    if (a.startsWith(`--${name}=`)) {
      return a.split('=')[1] ?? defaultValue;
    }
  }
  return defaultValue;
}

const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = parseIntOr(process.env.SMTP_PORT, 465);
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASSWORD || '';
const emailFrom = process.env.EMAIL_FROM || '';
const configuredEmailTo = process.env.EMAIL_TO || '';

const defaultTo = 'asmir.alams.com@gmail.com';
const toEmail = getCliArg('to', defaultTo);
const subject = getCliArg('subject', `Test Email from D.E. Technics (${new Date().toLocaleString()})`);
const textBody = getCliArg('text', 'This is a test email to verify SMTP configuration.');

// Allow forcing TLS with SMTP_SECURE. Default: true per user request
const secureEnvRaw = process.env.SMTP_SECURE;
const isSecure = parseBool(secureEnvRaw, true);
const requireTLS = !isSecure && smtpPort !== 25;

console.log('\n🔧 SMTP Configuration Preview (from env):');
console.log('  SMTP_HOST      =', smtpHost || '(not set)');
console.log('  SMTP_PORT      =', smtpPort);
console.log('  SMTP_USER      =', smtpUser || '(not set)');
console.log('  SMTP_PASSWORD  =', maskSecret(smtpPass));
console.log('  EMAIL_FROM     =', emailFrom || '(not set)');
console.log('  EMAIL_TO (env) =', configuredEmailTo || '(not set)');
console.log('  SMTP_SECURE    =', secureEnvRaw ?? '(not set)');
console.log('  TO (effective) =', toEmail);
console.log('  secure         =', isSecure);
console.log('  requireTLS     =', requireTLS);
console.log('  node version   =', process.version);
console.log('  note           = Default recipient is Gmail unless you pass --to (EMAIL_TO is ignored).');

if (isSecure && smtpPort !== 465) {
  console.warn('⚠️  secure=true with non-465 port. Ensure your SMTP server supports implicit TLS on this port; otherwise use port 465.');
}

const required = [
  ['SMTP_HOST', smtpHost],
  ['SMTP_USER', smtpUser],
  ['SMTP_PASSWORD', smtpPass],
  ['EMAIL_FROM', emailFrom],
];
const missing = required.filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  console.error('\n❌ Missing required environment variables:', missing.join(', '));
  console.error('   Please set them in .env.local and try again.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: isSecure, // true for 465, false for others
  requireTLS,
  auth: { user: smtpUser, pass: smtpPass },
  tls: { rejectUnauthorized: false }, // allow self-signed certs
  logger: true,
  debug: true,
});

async function main() {
  console.log('\n🔍 Verifying SMTP connection...');
  try {
    const verifyRes = await transporter.verify();
    console.log('✅ SMTP verify passed:', verifyRes);
  } catch (e) {
    console.error('❌ SMTP verify failed:', e?.message || e);
    console.error('   You can still attempt to send, but verify failed.');
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height:1.5;">
      <h2>SMTP Test Email</h2>
      <p>This is a test email to confirm that SMTP sending is working.</p>
      <ul>
        <li><strong>Host</strong>: ${smtpHost}</li>
        <li><strong>Port</strong>: ${smtpPort}</li>
        <li><strong>Secure</strong>: ${isSecure}</li>
        <li><strong>RequireTLS</strong>: ${requireTLS}</li>
        <li><strong>Node</strong>: ${process.version}</li>
        <li><strong>Timestamp</strong>: ${new Date().toLocaleString()}</li>
      </ul>
      <p>${textBody}</p>
    </div>
  `;

  const mail = {
    from: `D.E. Technics Test <${emailFrom}>`,
    to: toEmail,
    subject,
    text: textBody,
    html: htmlBody,
    headers: {
      'X-Mailer': 'nodemailer',
    },
  };

  console.log('\n📤 Sending test email...');
  try {
    const info = await transporter.sendMail(mail);
    console.log('✅ Email sent successfully!');
    console.log('  messageId:', info.messageId);
    if (info.envelope) console.log('  envelope :', info.envelope);
    if (info.accepted?.length) console.log('  accepted :', info.accepted);
    if (info.rejected?.length) console.log('  rejected :', info.rejected);
    if (info.response) console.log('  response :', info.response);
    console.log('\nDone.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to send email:', err?.message || err);
    if (err?.response) console.error('SMTP response:', err.response);
    if (err?.code) console.error('Error code:', err.code);
    process.exit(2);
  }
}

main();
