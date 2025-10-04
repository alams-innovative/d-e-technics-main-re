// app/api/contacts/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getUserPermissions, canAccessResource } from "@/lib/perms";
import { validateCSRF } from "@/lib/csrf";
import { checkRateLimit, getClientIP } from "@/lib/ratelimit";
import { contactsQuerySchema, contactSchema } from "@/lib/zod-schemas";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }
    const session = await getSession(sessionCookie.value);
    if (!session) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_SESSION",
            message: "Invalid or expired session",
          },
        },
        { status: 401 }
      );
    }

    const userPermissions = await getUserPermissions(session.user_id);
    if (
      !userPermissions ||
      !canAccessResource(userPermissions, "CONTACTS", "READ")
    ) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const parsed = contactsQuerySchema.safeParse(
      Object.fromEntries(searchParams)
    );
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { page, limit, status, from, to, search } = parsed.data;

    let where = "WHERE 1=1";
    const params: any[] = [];
    let i = 0;

    const hasAllScope = canAccessResource(
      userPermissions,
      "CONTACTS",
      "READ",
      undefined
    );
    if (!hasAllScope) {
      where += ` AND c.owner_id = $${++i}`;
      params.push(session.user_id);
    }

    if (status) {
      where += ` AND c.status = $${++i}`;
      params.push(status);
    }
    if (from) {
      where += ` AND c.created_at >= $${++i}`;
      params.push(from);
    }
    if (to) {
      where += ` AND c.created_at <= $${++i}`;
      params.push(to);
    }
    if (search) {
      where += ` AND (c.name ILIKE $${++i} OR c.email ILIKE $${++i} OR c.subject ILIKE $${++i})`;
      const pat = `%${search}%`;
      params.push(pat, pat, pat);
    }

    const countRes = await query(
      `SELECT COUNT(*) as total FROM contacts c ${where}`,
      params
    );
    const total = parseInt(countRes.rows[0]?.total || "0", 10);

    const offset = (page - 1) * limit;
    const listRes = await query(
      `SELECT c.*, co.country_name, co.flag_emoji
       FROM contacts c
       LEFT JOIN countries co ON c.country_code = co.country_code
       ${where}
       ORDER BY c.created_at DESC
       LIMIT $${++i} OFFSET $${++i}`,
      [...params, limit, offset]
    );

    const contacts = listRes.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      country_code: row.country_code,
      subject: row.subject,
      message: row.message,
      status: row.status,
      converted_to_quote_id: row.converted_to_quote_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      country: row.country_name
        ? { country_name: row.country_name, flag_emoji: row.flag_emoji }
        : null,
    }));

    return new NextResponse(
      JSON.stringify({
        contacts,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "X-Request-Id": requestId,
        },
      }
    );
  } catch (error) {
    logger.error("Contacts GET error", {
      requestId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INTERNAL_ERROR",
          message: "An internal error occurred",
        },
        requestId,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
        },
      }
    );
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const clientIP = getClientIP(request);
  try {
    const limit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000);
    if (!limit.allowed)
      return new NextResponse(
        JSON.stringify({
          error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests" },
          requestId,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );

    if (!(await validateCSRF(request)))
      return new NextResponse(
        JSON.stringify({
          error: { code: "CSRF_ERROR", message: "Invalid CSRF token" },
          requestId,
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie)
      return new NextResponse(
        JSON.stringify({
          error: { code: "UNAUTHORIZED", message: "Authentication required" },
          requestId,
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );
    const session = await getSession(sessionCookie.value);
    if (!session)
      return new NextResponse(
        JSON.stringify({
          error: {
            code: "INVALID_SESSION",
            message: "Invalid or expired session",
          },
          requestId,
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );

    const userPermissions = await getUserPermissions(session.user_id);
    if (
      !userPermissions ||
      !canAccessResource(userPermissions, "CONTACTS", "CREATE")
    ) {
      return new NextResponse(
        JSON.stringify({
          error: { code: "FORBIDDEN", message: "Insufficient permissions" },
          requestId,
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: parsed.error.issues,
          },
          requestId,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );
    }

    const data = parsed.data as any;
    // Insert contact; set owner_id to current user if not provided
    const ownerId = session.user_id;
    const res = await query(
      `INSERT INTO contacts (name,email,phone,country_code,subject,message,status,owner_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        data.name,
        data.email,
        data.phone || null,
        data.country_code || null,
        data.subject || null,
        data.message || null,
        data.status || "new",
        ownerId,
      ]
    );
    const contact = res.rows[0];

    await query(
      `INSERT INTO events (event_type, table_name, record_id, actor_id, changes)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        "contact_created",
        "contacts",
        contact.id,
        session.user_id,
        JSON.stringify({ contact: data }),
      ]
    );

    return new NextResponse(JSON.stringify({ contact }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": requestId,
      },
    });
  } catch (error) {
    logger.error("Contacts POST error", {
      requestId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INTERNAL_ERROR",
          message: "An internal error occurred",
        },
        requestId,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
        },
      }
    );
  }
}
