import * as auth from '$lib/server/auth';
import * as mail from '$lib/server/mail';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import User from '$lib/server/db/models/User';
import ConfirmationToken from '$lib/server/db/models/ConfirmationToken';

export const load: PageServerLoad = async () => {};

export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();

		if (!formData.has('fullName') || !formData.has('email') || !formData.has('password')) {
			return error(400, 'Full name, email and password are required');
		}

		const fullName = formData.get('fullName') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const privacyAccepted = ((formData.get('privacy') as string) ?? 'off') === 'on';

		if (typeof email !== 'string' || typeof password !== 'string') {
			return error(400, 'Invalid form data');
		}

		if (!privacyAccepted) {
			return error(400, 'You must accept the privacy policy to sign up.');
		}

		if (!email.endsWith('@studenti.unitn.it') && !email.endsWith('@unitn.it')) {
			return error(400, 'Email must be a valid @studenti.unitn.it or @unitn.it email.');
		}

		const { user: newUser, token } = await auth.registerNewUser(fullName, email, password);
		if (!newUser) error(500);

		return {
			success: true,
			user: { ...newUser.toObject({ flattenObjectIds: true }) },
			token: { ...token.toObject({ flattenObjectIds: true }) }
		};
	},
	resend: async ({ request }) => {
		const formData = await request.formData();

		if (!formData.has('email')) {
			return error(400, 'Email is required');
		}
		if (!formData.has('token')) {
			return error(400, 'Token is required');
		}

		const email = formData.get('email') as string;
		const token = formData.get('token') as string;

		if (typeof email !== 'string' || typeof token !== 'string') {
			return error(400, 'Invalid form data');
		}

		const user = await User.findOne({ emailAddress: email, confirmed: false });
		if (!user) {
			return error(400, 'User not found');
		}

		const confirmationToken = await ConfirmationToken.findOne({ token, user: user._id });
		if (!confirmationToken) {
			return error(400, 'Invalid token');
		}

		const newToken = await ConfirmationToken.createFor(user._id);
		await mail.sendConfirmationToken(user, newToken);

		return {
			success: true,
			resent: true,
			user: { ...user.toObject({ flattenObjectIds: true }) },
			token: { ...newToken.toObject({ flattenObjectIds: true }) }
		};
	}
};
