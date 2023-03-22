import { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_PERSONAL } from '$env/static/private';
import { z } from 'zod';
import { createTransport } from 'nodemailer';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url }) => {
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

		console.log(EMAIL_USERNAME, EMAIL_PASSWORD);
		console.log(name, email, message);

		const transporter = createTransport({
			service: 'hotmail',
			auth: {
				user: EMAIL_USERNAME,
				pass: EMAIL_PASSWORD,
			},
		});

		const mail = await transporter.sendMail({
			from: EMAIL_USERNAME,
			to: EMAIL_PERSONAL,
			subject: `${name} wants to contact you!`,
			text: `Email: ${email.data}
	Message: ${message}`,
		});

		if (mail.rejected.length > 0) {
			return fail(500, {
				name,
				message,
				email: email.data,
				rejected: true,
			});
		}

		return { success: true };
	},
};
