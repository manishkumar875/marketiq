import "server-only";
import { Resend } from "resend";

/**
 * Sends a notification email when a new lead or research request comes
 * in. Entirely optional: if RESEND_API_KEY or NOTIFICATION_EMAIL is not
 * set in the environment, this silently no-ops rather than throwing —
 * the form submission itself must never fail just because email
 * notifications aren't configured.
 */
export async function sendNotificationEmail(params: {
  subject: string;
  heading: string;
  rows: { label: string; value: string }[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    return; // Not configured — skip silently, this is optional.
  }

  try {
    const resend = new Resend(apiKey);

    const rowsHtml = params.rows
      .map(
        (r) =>
          `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;white-space:nowrap;">${escapeHtml(
            r.label
          )}</td><td style="padding:6px 12px;color:#0f172a;font-size:13px;">${escapeHtml(
            r.value
          )}</td></tr>`
      )
      .join("");

    await resend.emails.send({
      from: "Prime Eye Research <notifications@prime-eyeresearch.com>",
      to,
      subject: params.subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color:#0369a1;font-size:18px;margin-bottom:16px;">${escapeHtml(
            params.heading
          )}</h2>
          <table style="border-collapse:collapse;width:100%;">
            ${rowsHtml}
          </table>
          <p style="color:#94a3b8;font-size:12px;margin-top:20px;">
            Sent automatically by Prime Eye Research admin notifications.
          </p>
        </div>
      `,
    });
  } catch (error) {
    // Never let an email failure block or fail the form submission.
    console.error("Notification email failed to send:", error);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
