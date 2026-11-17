import { EmailError } from './types';
import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
	apiKey: process.env.SENDINBLUE_API_KEY
});

export async function email(htmlContent: string) {
	try {
		const res = await brevo.transactionalEmails.sendTransacEmail({
			subject: process.env.EMAIL_SUBJECT,
			htmlContent,
			sender: { email: process.env.EMAIL_FROM },
			to: [{ email: process.env.EMAIL_TO! }]
		});

		console.log('✅ Email sent:', res);

		return res;
	} catch (e: unknown) {
		const err = e as EmailError;

		console.error('❌ Email send failed');
		console.error('Error name:', err.name);
		console.error('Message:', err.message);
		console.error('Status:', err.response?.statusCode);
		console.error('Body:', Object.keys(err.response?.body || {}));

		throw err;
	}
}
