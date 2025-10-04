// app/api/contacts/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getUserPermissions, canAccessResource } from "@/lib/perms";
import { validateCSRF } from "@/lib/csrf";
import { checkRateLimit, getClientIP } from "@/lib/ratelimit";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID();
  try {
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

    const perms = await getUserPermissions(session.user_id);
    if (!perms)
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

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    const res = await query("SELECT * FROM contacts WHERE id = $1", [id]);
    if (res.rows.length === 0)
      return new NextResponse(
        JSON.stringify({
          error: { code: "NOT_FOUND", message: "Contact not found" },
          requestId,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );
    const contact = res.rows[0];

    const allowed = canAccessResource(
      perms,
      "CONTACTS",
      "READ",
      contact.owner_id
    );
    if (!allowed)
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

    return new NextResponse(JSON.stringify({ contact }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "X-Request-Id": requestId,
      },
    });
  } catch (error) {
    logger.error("Contact GET by id error", {
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

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
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
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );

    const session = await getSession(sessionCookie.value);
    if (!session)
      return NextResponse.json(
        {
          error: {
            code: "INVALID_SESSION",
            message: "Invalid or expired session",
          },
        },
        { status: 401 }
      );

    const perms = await getUserPermissions(session.user_id);
    if (!perms)
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
        { status: 403 }
      );

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    const cur = await query("SELECT * FROM contacts WHERE id = $1", [id]);
    if (cur.rows.length === 0)
      return new NextResponse(
        JSON.stringify({
          error: { code: "NOT_FOUND", message: "Contact not found" },
          requestId,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );
    const contact = cur.rows[0];

    const allowed = canAccessResource(
      perms,
      "CONTACTS",
      "DELETE",
      contact.owner_id
    );
    if (!allowed)
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
        { status: 403 }
      );

    await query("DELETE FROM contacts WHERE id = $1", [id]);

    await query(
      `INSERT INTO events (event_type, table_name, record_id, actor_id, changes)
       VALUES ($1,$2,$3,$4,$5)`,
      ["contact_deleted", "contacts", id, session.user_id, JSON.stringify({})]
    );

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": requestId,
      },
    });
  } catch (error) {
    logger.error("Contact DELETE error", {
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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID();
  const clientIP = getClientIP(request);
  try {
    const limit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000);
    if (!limit.allowed)
      return NextResponse.json(
        {
          error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests" },
        },
        { status: 429 }
      );

    if (!(await validateCSRF(request)))
      return NextResponse.json(
        { error: { code: "CSRF_ERROR", message: "Invalid CSRF token" } },
        { status: 403 }
      );

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie)
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );

    const session = await getSession(sessionCookie.value);
    if (!session)
      return NextResponse.json(
        {
          error: {
            code: "INVALID_SESSION",
            message: "Invalid or expired session",
          },
        },
        { status: 401 }
      );

    const perms = await getUserPermissions(session.user_id);
    if (!perms)
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
        { status: 403 }
      );

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    const current = await query("SELECT * FROM contacts WHERE id = $1", [id]);
    if (current.rows.length === 0)
      return new NextResponse(
        JSON.stringify({
          error: { code: "NOT_FOUND", message: "Contact not found" },
          requestId,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": requestId,
          },
        }
      );
    const contact = current.rows[0];

    const allowed = canAccessResource(
      perms,
      "CONTACTS",
      "UPDATE",
      contact.owner_id
    );
    if (!allowed)
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
        { status: 403 }
      );

    const body = await request.json();
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    (
      [
        "name",
        "email",
        "phone",
        "country_code",
        "subject",
        "message",
        "status",
      ] as const
    ).forEach((k) => {
      if (body[k as keyof typeof body] !== undefined) {
        fields.push(`${k} = $${idx++}`);
        values.push((body as any)[k]);
      }
    });
    if (fields.length === 0)
      return new NextResponse(JSON.stringify({ contact }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
        },
      });
    values.push(id);

    const updated = await query(
      `UPDATE contacts SET ${fields.join(
        ", "
      )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`,
      values
    );

    await query(
      `INSERT INTO events (event_type, table_name, record_id, actor_id, changes)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        "contact_updated",
        "contacts",
        id,
        session.user_id,
        JSON.stringify({ changes: body }),
      ]
    );

    return new NextResponse(JSON.stringify({ contact: updated.rows[0] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": requestId,
      },
    });
  } catch (error) {
    logger.error("Contact PATCH error", {
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
