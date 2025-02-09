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
	<p class="mt-4 text-center text-zinc-500/50">
		Brought to you with &hearts; by <a href="https://deme3.me" class="underline underline-offset-2"
			>Demetrio</a
		>
	</p>
	<p class="text-center text-zinc-500/50">
		<a href="/info" class="underline underline-offset-2">About</a> &middot;
		<a href="/feedback" class="underline underline-offset-2">Feedback</a>
	</p>
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
