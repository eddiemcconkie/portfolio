import {
	EMAIL_PERSONAL,
	EMAIL_USERNAME,
	OAUTH_CLIENTID,
	OAUTH_CLIENT_SECRET,
	OAUTH_REFRESH_TOKEN,
} from '$env/static/private';
import { fail, type Action } from '@sveltejs/kit';
import { createTransport } from 'nodemailer';
import { z } from 'zod';

export const contactAction: Action = async ({ request }) => {
	const data = await request.formData();

	const name = z.string().trim().default('').parse(data.get('name'));
	const email = z.string().email().safeParse(data.get('email'));
	const message = z.string().trim().default('').parse(data.get('message'));

	if (!email.success) {
		return fail(400, {
			name,
			message,
			email: data.get('email'),
			invalidEmail: true,
		});
	}

	// Setting up nodemailer with Gmail: https://www.turing.com/kb/comprehensive-guide-to-sending-an-email-using-nodemailer
	const transporter = createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			clientId: OAUTH_CLIENTID,
			clientSecret: OAUTH_CLIENT_SECRET,
			refreshToken: OAUTH_REFRESH_TOKEN,
			user: EMAIL_USERNAME,
		},
	});

	try {
		const mail = await transporter.sendMail({
			from: EMAIL_USERNAME,
			to: EMAIL_PERSONAL,
			subject: `${name} wants to contact you!`,
			html: `<p>Email: ${email.data}</p><p>Message: ${message}</p>`,
		});

		if (mail.rejected.length > 0) {
			throw new Error('Could not send email');
		}

		return { success: true };
	} catch (error) {
		console.error(error);

		return fail(500, {
			name,
			message,
			email: email.data,
			rejected: true,
		});
	}
};
