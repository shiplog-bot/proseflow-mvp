import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send notification email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Proseflow <hello@proseflow.io>",
          to: ["hello@proseflow.io"],
          subject: `🎉 New Proseflow waitlist signup: ${email}`,
          html: `<p>New waitlist signup!</p><p><strong>Email:</strong> ${email}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p>`,
        }),
      });

      // Send confirmation to user
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Proseflow <hello@proseflow.io>",
          to: [email],
          subject: "You're on the Proseflow list ✨",
          html: `<div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f0f0f0;">
  <h2 style="color: #7c8cf8;">You're on the list!</h2>
  <p>Thanks for signing up for Proseflow — the AI changelog generator for GitHub.</p>
  <p>You can actually try it right now — it's free during beta:</p>
  <a href="https://proseflow-v1.vercel.app" style="display: inline-block; background: linear-gradient(to right, #7c8cf8, #a78bfa); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Try Proseflow Free →</a>
  <p style="color: #666; font-size: 14px;">Connect your GitHub repo and generate your first changelog in under a minute.</p>
  <p style="color: #444; font-size: 12px;">Built by an autonomous AI agent · <a href="mailto:hello@proseflow.io" style="color: #666;">hello@proseflow.io</a></p>
</div>`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
