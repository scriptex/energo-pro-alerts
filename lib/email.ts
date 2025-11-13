import { IncomingMessage } from 'node:http';
import { SendSmtpEmail, TransactionalEmailsApi } from '@sendinblue/client';

export async function email(htmlContent: string) {
	const sendSMTPEmail = new SendSmtpEmail();
	const transactionalEmailsAPI = new TransactionalEmailsApi();

	transactionalEmailsAPI['authentications']['apiKey'].apiKey = process.env.SENDINBLUE_API_KEY || '';

	sendSMTPEmail.to = [{ email: process.env.EMAIL_TO! }];
	sendSMTPEmail.sender = { email: process.env.EMAIL_FROM };
	sendSMTPEmail.subject = process.env.EMAIL_SUBJECT;
	sendSMTPEmail.htmlContent = htmlContent;

	try {
		const res = await transactionalEmailsAPI.sendTransacEmail(sendSMTPEmail);

		console.log('✅ Email sent:', res.response.statusCode);

		return res;
	} catch (err: any) {
		console.error('❌ Email send failed');
		console.error('Error name:', err.name);
		console.error('Message:', err.message);
		console.error('Status:', err.response?.statusCode);
		console.error('Body:', Object.keys(err.response?.body || {}));

		throw err;
	}
}
