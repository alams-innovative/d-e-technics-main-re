import nodemailer from 'nodemailer';
import { getCountryName } from './countries';

// Create email transporter
function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT) || 465;
  const secureRaw = process.env.SMTP_SECURE ?? 'true';
  const isSecure = secureRaw ? /^(1|true|yes|on)$/i.test(String(secureRaw)) : port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: isSecure, // implicit TLS when true
    requireTLS: !isSecure && port !== 25, // STARTTLS for non-secure ports except 25
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Additional options for custom SMTP servers
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates (for custom SMTP)
    }
  });
}

// Send contact notification email
/**
 * Send contact notification email
 * @param {{ name: string; email: string; phone?: string | null; country_code: string; company?: string; quantity?: string; subject?: string; message: string }} contactData
 * @param {{ name: string; flag: string } | null} [countryInfo]
 * @returns {Promise<{ success: boolean; messageId?: string; error?: string }>}
 */
export async function sendContactNotification(contactData, countryInfo = null) {
  const { name, email, phone, country_code, company, quantity, subject, message } = contactData;
  const country_display = await getCountryName(country_code);
  
  // Format display name with company info
  const displayName = company ? `${name} (${company})` : name;

  const emailSubject = `New Contact Form Submission from ${name}`;

  const htmlMessage = `
    <html>
    <head>
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #c8a415; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { text-align: left; padding: 8px; background-color: #f8f9fa; }
        td { padding: 8px; border-top: 1px solid #eee; }
        .message-box { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #c8a415; }
      </style>
    </head>
    <body>
      <div class='container'>
        <h2>New Contact Form Submission</h2>
        <p>A new contact form has been submitted through your website.</p>
        
        <table>
          <tr>
            <th>Name:</th>
            <td>${displayName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Country:</th>
            <td>${country_display}</td>
          </tr>
          ${quantity ? `<tr><th>Quantity:</th><td>${quantity}</td></tr>` : ''}
          <tr>
            <th>Subject:</th>
            <td>${subject || 'General Inquiry'}</td>
          </tr>
        </table>
        
        <p><strong>Message:</strong></p>
        <div class='message-box'>
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p style='font-size: 12px; color: #666; margin-top: 30px;'>
          This email was sent from your website contact form at ${new Date().toLocaleString()}
        </p>
      </div>
    </body>
    </html>
  `;

  const textMessage = `
New Contact Form Submission

Name: ${displayName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Country: ${country_display}${quantity ? `\nQuantity: ${quantity}` : ''}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: emailSubject,
    text: textMessage,
    html: htmlMessage,
  };

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Contact email sending error:', error);

    // Log the contact data to console as backup
    console.log('BACKUP - Contact data (email failed):', {
      name, email, phone, country_code, subject, message,
      timestamp: new Date().toISOString()
    });

    return { success: false, error: error.message };
  }
}

// Send quote notification email
export async function sendQuoteNotification(quoteData, countryInfo = null) {
  const { name, email, phone, country_code, company, quantity, product, message } = quoteData;
  const country_display = await getCountryName(country_code);
  
  // Format display names with additional info
  const displayName = company ? `${name} (${company})` : name;
  const displayProduct = quantity ? `${product} (Qty: ${quantity})` : product;

  const subject = `New Quote Request from ${name}`;

  const htmlMessage = `
    <html>
    <head>
      <title>New Quote Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #c8a415; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { text-align: left; padding: 8px; background-color: #f8f9fa; }
        td { padding: 8px; border-top: 1px solid #eee; }
        .message-box { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #c8a415; }
      </style>
    </head>
    <body>
      <div class='container'>
        <h2>New Quote Request Received</h2>
        <p>A new quote request has been submitted through your website form.</p>
        
        <table>
          <tr>
            <th>Name:</th>
            <td>${displayName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>${phone}</td>
          </tr>
          <tr>
            <th>Country:</th>
            <td>${country_display}</td>
          </tr>
          <tr>
            <th>Product:</th>
            <td>${displayProduct}</td>
          </tr>
        </table>
        
        <p><strong>Message:</strong></p>
        <div class='message-box'>
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p style='font-size: 12px; color: #666; margin-top: 30px;'>
          This email was sent from your website contact form at ${new Date().toLocaleString()}
        </p>
      </div>
    </body>
    </html>
  `;

  const textMessage = `
New Quote Request

Name: ${displayName}
Email: ${email}
Phone: ${phone}
Country: ${country_display}
Product: ${displayProduct}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: subject,
    text: textMessage,
    html: htmlMessage,
  };

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);

    // Log the quote data to console as backup
    console.log('BACKUP - Quote data (email failed):', {
      name, email, phone, country_code, product, message,
      timestamp: new Date().toISOString()
    });

    return { success: false, error: error.message };
  }
}

// Send quote reply email
export async function sendQuoteReply(toEmail, subject, message, fromName = 'D.E. Technics') {
  const replyMailOptions = {
    from: `"${fromName}" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: subject,
    html: `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #c8a415; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 10px; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class='container'>
          <div class='header'>
            <h2>D.E. Technics (Pvt) Limited</h2>
          </div>
          <div class='content'>
            ${message.replace(/\n/g, '<br>')}
          </div>
          <div class='footer'>
            <p>Best regards,<br>D.E. Technics Team</p>
            <p>Email: info@detechnics.com | Phone: +92-333-0184756</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: message
  };

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(replyMailOptions);
    console.log('Reply email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Reply email sending error:', error);
    return { success: false, error: error.message };
  }
}
