import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { name, email, message } = await request.json();
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
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    // Send mail (it will always send the message as an email to itself)
    // so we include email sender in subject
    await transporter.sendMail({
      from: `"${name}" <${process.env.APP_EMAIL}>`,
      replyTo: email,
      to: `${process.env.APP_EMAIL}`,
      subject: `[UCSD Alpha Kappa Psi] Contact Us - New Mail`,
      html: `
        <h3>Name: ${name}</h3>
        <h3>Email: 
          <a href="mailto:${email}">${email}</a>
        </h3>
        <h3>Message: ${message}</h3>`
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
