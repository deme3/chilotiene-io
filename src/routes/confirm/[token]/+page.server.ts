import * as auth from '$lib/server/auth';
import * as mail from '$lib/server/mail';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import User from '$lib/server/db/models/User';
import ConfirmationToken from '$lib/server/db/models/ConfirmationToken';
import Session from '$lib/server/db/models/Session';

export const load: PageServerLoad = async ({ params, request, cookies }) => {
	if (!params.token) error(400, 'Token is required');
	if (typeof params.token !== 'string') error(400, 'Invalid token');

	const token = await ConfirmationToken.findOne({ token: params.token }).exec();
	if (!token) error(404, 'Invalid token');

	const user = await User.findById(token.user).exec();
	if (!user) error(404, 'Invalid token');
	if (user.confirmed) error(404, 'Invalid token');

	user.confirmed = true;
	user.confirmedAt = new Date();
	await user.save();
	await token.deleteOne();

	const jwtGenerated = auth.createJwt(user);
	const jwtData = auth.checkJwtValidity(jwtGenerated)!;

	await Session.createSession(jwtData, request.headers.get('user-agent') ?? '');
	cookies.set(auth.COOKIE_NAME, jwtGenerated, {
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
		sameSite: 'lax',
		secure: import.meta.env.MODE === 'production',
		httpOnly: true
	});

	await mail.sendWelcomeEmail(user);

	return {
		user: user.toObject({ flattenObjectIds: true })
	};
};
