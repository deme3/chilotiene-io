import { error, redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import * as auth from '$lib/server/auth';
import '$lib/server/db/database';
import { base } from '$app/paths';
import { UserRole } from '$lib/UserRole';

export const handle: Handle = async ({ event, resolve }) => {
	// You can add custom logic here, for example, authentication or logging
	console.log(`Request for ${event.url.pathname}`);

	const jwtCookie = event.cookies.get(auth.COOKIE_NAME);
	let isLoggedIn = false;

	if (jwtCookie) {
		const login = await auth.checkLogin(event.cookies);
		if (login) {
			event.locals.user = login;
			isLoggedIn = true;
		} else {
			const invalidData = jwt.decode(jwtCookie);

			event.locals.user = null;
			isLoggedIn = false;
			event.cookies.delete(auth.COOKIE_NAME, {
				path: '/',
				sameSite: 'lax',
				secure: import.meta.env.MODE === 'production'
			});

			if (typeof invalidData !== 'string' && invalidData?.jti) {
				await auth.terminateSession(invalidData.jti);
				console.warn(`Invalidated session with ID ${invalidData?.jti}.`);
			}
			console.warn(`Invalid or expired session terminated while visiting ${event.url.pathname}.`);
		}
	} else {
		isLoggedIn = false;
	}

	if (!isLoggedIn && event.url.pathname.startsWith(base + '/admin')) {
		error(404);
	}

	if (isLoggedIn && event.url.pathname.startsWith(base + '/login')) {
		redirect(303, base + '/');
	}

	if (
		isLoggedIn &&
		event.locals.user?.user.role !== UserRole.Admin &&
		event.url.pathname.startsWith(base + '/admin')
	) {
		error(404);
	}

	const response = await resolve(event);
	return response;
};
