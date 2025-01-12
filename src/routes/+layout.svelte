<script lang="ts">
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
		setTimeout(() => {
			document.querySelector('.preload')?.classList.remove('preload');
		}, 1000);
	}
</script>

<main class="preload">
	{@render children()}
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
