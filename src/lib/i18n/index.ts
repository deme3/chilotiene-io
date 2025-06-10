import { browser } from '$app/environment';
import { register, init } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('es', () => import('./es.json'));
register('it', () => import('./it.json'));

init({
	fallbackLocale: 'en',
	initialLocale: browser ? window.navigator.language : 'en'
});
