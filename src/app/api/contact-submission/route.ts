import nodemailer from "nodemailer";
import type {
  ContactSubmissionRequestDto,
  ContactSubmissionResponseDto,
} from "@/lib/contact-submission.dtos";

function respond(body: ContactSubmissionResponseDto, status: number) {
  return Response.json(body, { status });
}

function parseSubmission(body: unknown): ContactSubmissionRequestDto | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  )
    return null;

  const submission = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
  if (
    !submission.name ||
    submission.name.length > 100 ||
    submission.email.length > 254 ||
    !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(submission.email) ||
    /[\r\n]/.test(submission.name + submission.email) ||
    submission.message.length < 10 ||
    submission.message.length > 5000
  )
    return null;

  return submission;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return respond({ success: false, message: "Invalid JSON request." }, 400);
  }

  const submission = parseSubmission(body);
  if (!submission) {
    return respond(
      {
        success: false,
        message:
          "Provide a valid name, email, and message (10–5000 characters).",
      },
      400,
    );
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO, SMTP_SECURE } =
    process.env;
  const port = Number(process.env.SMTP_PORT ?? "587");
  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !SMTP_FROM ||
    !SMTP_TO ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    (SMTP_SECURE !== undefined &&
      SMTP_SECURE !== "true" &&
      SMTP_SECURE !== "false")
  ) {
    return respond(
      { success: false, message: "Contact email is currently unavailable." },
      503,
    );
  }

  const secure =
    SMTP_SECURE === undefined ? port === 465 : SMTP_SECURE === "true";
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      requireTLS: !secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    const delivery = await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      replyTo: submission.email,
      subject: "Portfolio inquiry",
      text: `${submission.message}\n\nFrom: ${submission.name}\nEmail: ${submission.email}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    if (delivery.accepted.length === 0) {
      throw new Error("No recipients accepted the message.");
    }
    return respond(
      { success: true, message: "Message sent successfully." },
      200,
    );
  } catch {
    return respond(
      {
        success: false,
        message: "Unable to send your message. Please try again later.",
      },
      502,
    );
  }
}
