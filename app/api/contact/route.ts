import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure the route is dynamically generated
export const dynamic = "force-dynamic";

// Named export for the POST method
export async function POST(req: NextRequest) {
	const { name, email, message } = await req.json();

	// Basic validation
	if (!name || !email || !message) {
		return NextResponse.json(
			{ message: "All fields are required." },
			{ status: 400 }
		);
	}

	// Nodemailer transporter configuration
	const transporter = nodemailer.createTransport({
		service: "Gmail", // Replace with your email service
		port: 587,
		secure: true, // Use TLS (not SSL) for port 587
		auth: {
			user: process.env.SMTP_USER, // Your email (env var)
			pass: process.env.SMTP_PASS, // Your email password (env var)
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	try {
		// Send the email
		await transporter.sendMail({
			from: process.env.SMTP_USER, // The sender's email address
			to: "osibemekunosifemi@gmail.com", // Replace with your email address to receive messages
			subject: `New Portfolio message from ${name}`,
			html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
		});

		return NextResponse.json(
			{ message: "Message sent successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ message: "Error sending email." },
			{ status: 500 }
		);
	}
}
