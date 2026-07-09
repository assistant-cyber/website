import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, neighborhood, description, referral } = body ?? {};

    if (!name || !email || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Inquiry type: ${inquiryType || "—"}`,
      `Neighborhood: ${neighborhood || "—"}`,
      `Referral: ${referral || "—"}`,
      "",
      "Project details:",
      description || "—",
    ];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Synergistic Development Website <onboarding@resend.dev>",
        to: ["shane@sddenver.com"],
        reply_to: email,
        subject: `New inquiry from ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
