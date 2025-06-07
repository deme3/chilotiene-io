import { Resend } from 'resend';
import type { IUser } from './db/models/User';
import type { IConfirmationToken } from './db/models/ConfirmationToken';
import config from '$lib/server/config';

const resend = new Resend(config.mail.api_key);

export async function sendConfirmationToken(user: IUser, token: IConfirmationToken): Promise<void> {
	const { data, error } = await resend.emails.send({
		from: 'Chilotiene <register@auto.chilotiene.io>',
		to: [user.emailAddress],
		subject: 'Confirm your email address for Chilotiene',
		html: `<p>Hello, ${user.fullName}.</p><p>Click on the following link to confirm your e-mail address for Chilotiene.io</p><p style='text-align: center'><a href='https://chilotiene.io/confirm/${token.token}'>https://chilotiene.io/confirm/${token.token}</a></p><p>If you did not register for Chilotiene, please ignore this e-mail.</p><p>If you did, thank you for joining!</p>`
	});

	console.log('Email sent:', data);

	if (error) {
		console.error('Error sending email:', error);
	} else {
		console.log('Confirmation email sent successfully to:', user.emailAddress);
	}
}

export async function sendWelcomeEmail(user: IUser): Promise<void> {
	const { data, error } = await resend.emails.send({
		from: 'Chilotiene <register@auto.chilotiene.io>',
		to: [user.emailAddress],
		subject: 'Welcome to Chilotiene!',
		html: `<p>Hello, ${user.fullName}.</p><p>Welcome to Chilotiene.io!</p><p>Thank you for registering. We hope you enjoy your stay.</p>`
	});

	console.log('Welcome email sent:', data);
	if (error) {
		console.error('Error sending welcome email:', error);
	} else {
		console.log('Welcome email sent successfully to:', user.emailAddress);
	}
}
