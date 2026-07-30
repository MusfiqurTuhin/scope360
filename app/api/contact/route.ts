import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  organization?: string;
  interest?: string;
  brief: string;
  company_website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: unknown): { data: ContactPayload } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const name = asString(raw.name, 120);
  const email = asString(raw.email, 200);
  const brief = asString(raw.brief, 4000);

  if (asString(raw.company_website, 200) !== "") {
    return { error: "Submission rejected." };
  }
  if (name.length < 2) return { error: "Please tell us your name." };
  if (!EMAIL_PATTERN.test(email)) return { error: "That email address does not look right." };
  if (brief.length < 20) {
    return { error: "Please tell us a little more about what you need." };
  }

  return {
    data: {
      name,
      email,
      organization: asString(raw.organization, 160),
      interest: asString(raw.interest, 120),
      brief,
    },
  };
}

async function deliver(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !inbox || !from) {
    console.info(
      "[contact] delivery not configured; enquiry logged",
      JSON.stringify({ name: data.name, email: data.email, interest: data.interest }),
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [inbox],
      reply_to: data.email,
      subject: `Scope360 enquiry — ${data.name}${data.organization ? ` (${data.organization})` : ""}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Organization: ${data.organization || "—"}`,
        `Interest: ${data.interest || "—"}`,
        "",
        data.brief,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Email provider responded ${response.status}: ${detail.slice(0, 200)}`);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  try {
    await deliver(result.data);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "We could not send that right now. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
