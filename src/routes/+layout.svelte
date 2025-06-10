<script lang="ts">
	import '$lib/i18n'; // Import to initialize
	import { locale, _ } from 'svelte-i18n';
	import '../app.css';
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children } = $props();

	// Remove preload class
	if (browser) {
		locale.set(window.navigator.language);
		setTimeout(() => {
			document.querySelector('.preload')?.classList.remove('preload');
		}, 1000);
	}
</script>

<svelte:head>
	<title>Chi lo tiene...</title>
</svelte:head>

<main class="preload">
	{@render children()}
	<footer class="[&_a:hover]:no-underline [&_a]:underline [&_a]:underline-offset-4">
		<p class="mt-4 text-center text-zinc-500/50">
			Brought to you with &hearts; by <a href="https://deme3.me" target="_blank">Demetrio</a>
		</p>
		<p class="text-center text-zinc-500/50">
			<a href="/info">{$_('footer.about')}</a> &middot;
			<a href="/feedback">{$_('footer.feedback')}</a> &middot;
			<a href="/privacy">{$_('footer.privacy')}</a>
		</p>
		<div class="flex items-center gap-2">
			<button onclick={() => locale.set('en')}>EN</button>
			<button onclick={() => locale.set('es')}>ES</button>
			<button onclick={() => locale.set('it')}>IT</button>
		</div>
	</footer>
</main>

<style>
	:global(.preload *) {
		-webkit-animation: none !important;
		animation: none !important;
	}

	:global(#logo, .small-logo, .big-logo) {
		view-transition-name: page-logo;
		width: fit-content;
	}

	:global(.big-logo) {
		@apply text-4xl;
	}

	:global(.small-logo) {
		@apply text-lg;
	}

	:global(::view-transition-old(root), ::view-transition-new(root)) {
		/* animation: none; */
	}
</style>
