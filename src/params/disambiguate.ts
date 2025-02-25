import type { ParamMatcher } from '@sveltejs/kit';
export const match: ParamMatcher = (
	param
): param is
	| 'admin'
	| 'confirm'
	| 'feedback'
	| 'info'
	| 'login'
	| 'logout'
	| 'privacy'
	| 'profile'
	| 'signup'
	| 'courses' => {
	return ![
		'admin',
		'confirm',
		'feedback',
		'info',
		'login',
		'logout',
		'privacy',
		'profile',
		'signup',
		'courses'
	].includes(param);
};
