// test-email.ts - SMTP Configuration Tester
// Run with: npx tsx test-email.ts

import nodemailer from 'nodemailer';

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface TestResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface ConfigTest {
  name: string;
  config: SMTPConfig;
}

// Test configurations - try each one
const configurations: ConfigTest[] = [
  {
    name: "Current Config (mail.detechnics.com:465)",
    config: {
      host: "mail.detechnics.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@detechnics.com", 
        pass: "tlJBkUgAcN{W"
      }
    }
  },
  {
    name: "Alternative 1 (mail.detechnics.com:587)",
    config: {
      host: "mail.detechnics.com",
      port: 587,
      secure: false,
      auth: {
        user: "noreply@detechnics.com",
        pass: "tlJBkUgAcN{W"
      }
    }
  },
  {
    name: "Alternative 2 (smtp.detechnics.com:465)",
    config: {
      host: "smtp.detechnics.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@detechnics.com",
        pass: "tlJBkUgAcN{W"
      }
    }
  },
  {
    name: "Alternative 3 (smtp.detechnics.com:587)",
    config: {
      host: "smtp.detechnics.com",
      port: 587,
      secure: false,
      auth: {
        user: "noreply@detechnics.com",
        pass: "tlJBkUgAcN{W"
      }
    }
  },
  {
    name: "Alternative 4 (detechnics.com:465)",
    config: {
      host: "detechnics.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@detechnics.com",
        pass: "tlJBkUgAcN{W"
      }
    }
  },
  {
    name: "Alternative 5 (detechnics.com:587)",
    config: {
      host: "detechnics.com",
      port: 587,
      secure: false,
      auth: {
        user: "noreply@detechnics.com",
        pass: "tlJBkUgAcN{W"
      }
    }
  }
];

async function testConfiguration(name: string, config: SMTPConfig): Promise<TestResult> {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   Host: ${config.host}:${config.port} (secure: ${config.secure})`);
  
  try {
    // Create transporter (correct 2024 syntax)
    const transporter = nodemailer.createTransport({
      ...config,
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    });

    // Verify connection
    console.log("   ⏳ Verifying connection...");
    await transporter.verify();
    console.log("   ✅ Connection verified!");

    // Send test email
    console.log("   ⏳ Sending test email...");
    const info = await transporter.sendMail({
      from: '"Test Sender" <noreply@detechnics.com>',
      to: "asmir.alams.com@gmail.com",
      subject: `Test Email - ${name}`,
      text: `This is a test email using configuration: ${name}\n\nHost: ${config.host}:${config.port}\nSecure: ${config.secure}\n\nTimestamp: ${new Date().toISOString()}`,
      html: `
        <h2>✅ Test Email Success!</h2>
        <p><strong>Configuration:</strong> ${name}</p>
        <p><strong>Host:</strong> ${config.host}:${config.port}</p>
        <p><strong>Secure:</strong> ${config.secure}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    console.log(`   ✅ Email sent successfully! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.message}`);
    console.log(`   📝 Error code: ${error.code || 'N/A'}`);
    return { success: false, error: error.message };
  }
}

async function testAllConfigurations(): Promise<void> {
  console.log("🚀 Starting SMTP Configuration Tests");
  console.log("=".repeat(50));
  
  const results: Array<{ name: string } & TestResult> = [];
  
  for (const { name, config } of configurations) {
    const result = await testConfiguration(name, config);
    results.push({ name, ...result });
    
    // Wait between tests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY:");
  console.log("=".repeat(50));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  if (successful.length > 0) {
    console.log(`\n✅ WORKING CONFIGURATIONS (${successful.length}):`);
    successful.forEach(r => {
      console.log(`   ✅ ${r.name}`);
    });
  }
  
  if (failed.length > 0) {
    console.log(`\n❌ FAILED CONFIGURATIONS (${failed.length}):`);
    failed.forEach(r => {
      console.log(`   ❌ ${r.name} - ${r.error}`);
    });
  }
  
  if (successful.length === 0) {
    console.log("\n💡 SUGGESTIONS:");
    console.log("   • Check if SMTP is enabled on your hosting account");
    console.log("   • Verify the email password is correct");
    console.log("   • Contact your hosting provider for correct SMTP settings");
    console.log("   • Try using Gmail SMTP as a temporary solution");
  }
}

// Run the tests
testAllConfigurations().catch(console.error);
