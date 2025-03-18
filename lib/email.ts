import { IncomingMessage } from 'node:http';

import { SendSmtpEmail, CreateSmtpEmail, TransactionalEmailsApi } from '@sendinblue/client';

export async function email(htmlContent: string): Promise<{ response: IncomingMessage; body: CreateSmtpEmail } | void> {
	const sendSMTPEmail = new SendSmtpEmail();
	const transactionalEmailsAPI = new TransactionalEmailsApi();

	// prettier-ignore
	transactionalEmailsAPI["authentications"]["apiKey"].apiKey = process.env.SENDINBLUE_API_KEY || "";

	sendSMTPEmail.to = [{ email: process.env.EMAIL_TO! }];
	sendSMTPEmail.sender = { email: process.env.EMAIL_FROM };
	sendSMTPEmail.subject = process.env.EMAIL_SUBJECT;
	sendSMTPEmail.htmlContent = htmlContent;

	return await transactionalEmailsAPI.sendTransacEmail(sendSMTPEmail);
}
