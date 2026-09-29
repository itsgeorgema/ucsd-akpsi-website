import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiting (in production, use Redis or similar)
const submissions = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS = 3;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = submissions.get(ip);

  if (!attempts) return false;

  if (now > attempts.resetTime) {
    submissions.delete(ip);
    return false;
  }

  return attempts.count >= MAX_SUBMISSIONS;
}

function recordSubmission(ip: string): void {
  const now = Date.now();
  const attempts = submissions.get(ip);

  if (!attempts || now > attempts.resetTime) {
    submissions.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    attempts.count += 1;
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

/** Newlines in a header value would let a sender inject extra SMTP headers. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, message, website } = await request.json();

    // Honeypot: real users never see this field, bots fill it in.
    if (typeof website === "string" && website.trim() !== "") {
      recordSubmission(clientIP);
      return NextResponse.json({ success: true });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (
      trimmedName.length > MAX_NAME_LENGTH ||
      trimmedEmail.length > MAX_EMAIL_LENGTH ||
      trimmedMessage.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long" },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

    // Send mail (it will always send the message as an email to itself)
    // so we include email sender in subject
    await transporter.sendMail({
      from: `"${sanitizeHeader(trimmedName)}" <${process.env.APP_EMAIL}>`,
      replyTo: sanitizeHeader(trimmedEmail),
      to: `${process.env.APP_EMAIL}`,
      subject: `[UCSD Alpha Kappa Psi] Contact Us - New Mail`,
      html: `
        <h3>Name: ${safeName}</h3>
        <h3>Email: 
          <a href="mailto:${safeEmail}">${safeEmail}</a>
        </h3>
        <h3>Message: ${safeMessage}</h3>`,
    });

    recordSubmission(clientIP);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
