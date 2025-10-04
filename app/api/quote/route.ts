import { NextResponse } from "next/server"
import { sendQuoteNotification } from "@/lib/email"
import { query } from "@/lib/db"
import { quoteSchema } from "@/lib/zod-schemas"
import { logger } from "@/lib/logger"
import { parsePhoneNumberFromString } from "libphonenumber-js"

export const runtime = 'nodejs'

async function parseBody(request: Request) {
  const contentType = request.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return { body: await request.json(), isJson: true }
  }
  // Handle HTML form submissions (application/x-www-form-urlencoded or multipart/form-data)
  const form = await request.formData()
  const obj: Record<string, string> = {}
  for (const [key, value] of form.entries()) {
    obj[key] = typeof value === "string" ? value : value.name
  }
  return { body: obj, isJson: false }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()
  
  try {
    const parsed = await parseBody(request)
    const {
      name,
      email,
      phone,
      country_code,
      company,
      quantity,
      product = "General Inquiry",
      message,
    } = parsed.body || {}

    if (!name || !email || !phone || !message) {
      const errorResponse = { success: false, error: "Missing required fields" }
      
      if (parsed.isJson) {
        return NextResponse.json(errorResponse, { status: 400 })
      } else {
        return NextResponse.redirect(new URL("/quote-form?error=1", request.url), { status: 303 })
      }
    }

    // Validate input
    const validation = quoteSchema.safeParse({
      name,
      email,
      phone,
      country_code,
      company,
      quantity,
      product,
      message,
      status: "pending",
      estimated_value: 0
    })

    if (!validation.success) {
      logger.error('Quote validation failed', { requestId, errors: validation.error.issues })
      const errorResponse = { success: false, error: "Invalid input data" }
      
      if (parsed.isJson) {
        return NextResponse.json(errorResponse, { status: 400 })
      } else {
        return NextResponse.redirect(new URL("/quote-form?error=1", request.url), { status: 303 })
      }
    }

    // Normalize country_code to match DB schema (dial codes like +92) and save to database
    try {
      const normalized = validation.data
      let dbCountryCode: string | null = null
      // Prefer explicit dial code if provided and valid
      if (normalized.country_code && normalized.country_code.startsWith('+')) {
        dbCountryCode = normalized.country_code
      }
      // Otherwise derive from E.164 phone
      if (!dbCountryCode && normalized.phone) {
        const parsedPhone = parsePhoneNumberFromString(normalized.phone)
        if (parsedPhone) {
          dbCountryCode = `+${parsedPhone.countryCallingCode}`
        }
      }

      const result = await query(`
        INSERT INTO quotes (name, email, phone, country_code, company, quantity, product, message, status, estimated_value, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING id
      `, [name, email, normalized.phone, dbCountryCode, company || null, quantity || null, product, message, "pending", 0])
      
      const quoteId = result.rows[0]?.id
      logger.info('Quote saved to database', { requestId, quoteId, email })
    } catch (dbError) {
      logger.error('Failed to save quote to database', { 
        requestId, 
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        data: { name, email, phone, country_code: undefined, product, message }
      })
      // Continue with email sending even if database save fails
    }

    // Check if email is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log("Quote request (email not configured):", { name, email, phone, country_code, product, message })
      
      if (parsed.isJson) {
        return NextResponse.json({ success: true, messageId: "dev_mode" })
      } else {
        return NextResponse.redirect(new URL("/quote-form?success=1", request.url), { status: 303 })
      }
    }

    // Compute dial code for email display if possible
    let emailCountryCode: string | null = null
    {
      const normalized = validation.success ? validation.data : { phone, country_code: undefined as string | undefined }
      if (normalized.country_code && normalized.country_code.startsWith('+')) {
        emailCountryCode = normalized.country_code
      } else if (normalized.phone) {
        const parsedPhone = parsePhoneNumberFromString(normalized.phone)
        if (parsedPhone) emailCountryCode = `+${parsedPhone.countryCallingCode}`
      }
    }

    const result = await sendQuoteNotification(
      { name, email, phone, country_code: emailCountryCode || '', company, quantity, product, message },
      null,
    )

    if (!result?.success) {
      console.error("Email send failed:", result?.error)
      
      if (parsed.isJson) {
        return NextResponse.json({ success: true, messageId: "fallback" })
      } else {
        return NextResponse.redirect(new URL("/quote-form?success=1", request.url), { status: 303 })
      }
    }

    // Return appropriate response format
    if (parsed.isJson) {
      return NextResponse.json({ success: true, messageId: result.messageId })
    } else {
      return NextResponse.redirect(new URL("/quote-form?success=1", request.url), { status: 303 })
    }
  } catch (err: any) {
    // For JSON requests, return JSON error
    // For form requests, redirect to error page
    const contentType = request.headers.get("content-type") || ""
    const isJsonRequest = contentType.includes("application/json")
    
    if (isJsonRequest) {
      return NextResponse.json(
        { success: false, error: err?.message || "Unexpected error" },
        { status: 500 }
      )
    } else {
      return NextResponse.redirect(new URL("/quote-form?error=1", request.url), { status: 303 })
    }
  }
}
