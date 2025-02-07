import type { Handle } from '@sveltejs/kit';
import '$lib/server/db/database';

export const handle: Handle = async ({ event, resolve }) => {
	// You can add custom logic here, for example, authentication or logging
	console.log(`Request for ${event.url.pathname}`);

	const response = await resolve(event);
	return response;
};
