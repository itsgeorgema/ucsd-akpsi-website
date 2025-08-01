import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { name, email, message } = await request.json();
    console.log(email);
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter for sending email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail (it will always send the message as an email to itself)
    // so we include email sender in subject
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'jiangalan21@gmail.com',
      subject: `New message from ${name} ${email}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
