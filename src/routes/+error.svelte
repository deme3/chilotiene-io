<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<style>
		body,
		html {
			@apply h-full;
		}

		main {
			@apply flex h-full flex-col items-center justify-center;
		}

		main #error {
			@apply flex h-full w-full items-center justify-center;
		}
	</style>
</svelte:head>

<section id="error">
	<section class="max-w-96">
		<h1 class="text-center text-lg font-bold"><a href="{base}/">Oops!</a></h1>
		<div class="mt-4 flex flex-col gap-4">
			<p class="text-center text-4xl font-bold">
				{$page.status}
			</p>
			<p class="text-center text-xl text-zinc-600">
				{$page.error?.message ??
					($_(`error.${$page.status}`) != `error.${$page.status}`
						? $_(`error.${$page.status}`)
						: $_(`error.unknown`))}
			</p>
			<button class="generic-button zinc" onclick={() => window.history.back()}>
				{$_('error.go_back')}
			</button>
		</div>
	</section>
</section>
