import { NextResponse } from "next/server"
import { sendContactNotification } from "@/lib/email"
import { query } from "@/lib/db"
import { contactSchema } from "@/lib/zod-schemas"
import { parsePhoneNumberFromString } from "libphonenumber-js"

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()
  
  try {
    const body = await request.json()
    console.log('📝 Contact form submission:', { requestId, body })
    
    const { name, email, phone, country_code, company, quantity, subject, message } = body || {}

    if (!name || !email || !message) {
      console.error('❌ Missing required fields:', { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate input using Zod schema
    const validation = contactSchema.safeParse({
      name,
      email,
      phone: phone || null,
      country_code,
      company,
      quantity,
      subject: subject || 'General Inquiry',
      message,
      status: "new"
    })

    if (!validation.success) {
      console.error('❌ Contact validation failed:', { requestId, errors: validation.error.issues })
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      )
    }

    const validatedData = validation.data
    console.log('✅ Validation successful:', validatedData)

    // Save to database
    let contactId = null
    try {
      console.log('💾 Saving to database...')
      // Use dial code directly if provided, otherwise derive from E.164 phone
      let dbCountryCode: string | null = null
      if (validatedData.country_code && validatedData.country_code.startsWith('+')) {
        dbCountryCode = validatedData.country_code
      }
      if (!dbCountryCode && validatedData.phone) {
        const parsed = parsePhoneNumberFromString(validatedData.phone)
        if (parsed) dbCountryCode = `+${parsed.countryCallingCode}`
      }

      const result = await query(`
        INSERT INTO contacts (name, email, phone, country_code, company, quantity, subject, message, status, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING id
      `, [
        validatedData.name,
        validatedData.email,
        validatedData.phone ?? null,
        dbCountryCode,
        validatedData.company ?? null,
        validatedData.quantity ?? null,
        validatedData.subject,
        validatedData.message,
        validatedData.status
      ])
      
      contactId = result.rows[0]?.id
      console.log('✅ Contact saved to database:', { requestId, contactId, email: validatedData.email })
    } catch (dbError) {
      console.error('❌ Failed to save contact to database:', { 
        requestId, 
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : undefined,
        data: validatedData
      })
      // Return error instead of continuing - user should know if data isn't saved
      return NextResponse.json(
        { success: false, error: "Failed to save contact. Please try again." },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      console.log('📧 Sending email notification...')
      
      // Check if email is configured
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.warn('⚠️ Email not configured - skipping email send')
        return NextResponse.json({ 
          success: true, 
          contactId,
          message: "Contact saved successfully (email not configured)" 
        })
      }

      const emailResult = await sendContactNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone ?? null,
        country_code: (validatedData.country_code && validatedData.country_code.startsWith('+'))
          ? validatedData.country_code
          : (validatedData.phone ? (() => { const p = parsePhoneNumberFromString(validatedData.phone!); return p ? `+${p.countryCallingCode}` : '' })() : ''),
        company: validatedData.company,
        quantity: validatedData.quantity,
        subject: validatedData.subject ?? 'General Inquiry',
        message: validatedData.message ?? ''
      }, null)

      if (!emailResult?.success) {
        console.error('❌ Email send failed:', emailResult?.error)
        // Contact saved but email failed - inform user
        return NextResponse.json({ 
          success: true, 
          contactId,
          warning: "Contact saved but email notification failed" 
        })
      }

      console.log('✅ Email sent successfully:', emailResult.messageId)
      return NextResponse.json({ 
        success: true, 
        contactId,
        messageId: emailResult.messageId,
        message: "Contact submitted successfully!" 
      })
      
    } catch (emailError) {
      console.error('❌ Email error:', emailError)
      return NextResponse.json({ 
        success: true, 
        contactId,
        warning: "Contact saved but email notification failed" 
      })
    }
  } catch (err: any) {
    console.error('❌ Unexpected error in contact API:', { 
      requestId, 
      error: err?.message, 
      stack: err?.stack 
    })
    return NextResponse.json(
      { success: false, error: err?.message || "Unexpected error occurred" },
      { status: 500 }
    )
  }
}
