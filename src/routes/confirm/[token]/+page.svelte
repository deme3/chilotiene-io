<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
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

		main #login {
			@apply flex h-full w-full items-center justify-center;
		}
	</style>
</svelte:head>

<section id="login">
	<section class="max-w-96">
		<h1 class="text-center text-3xl font-bold"><a href="{base}/">{$_('title')}</a></h1>
		<h2 class="mb-2 text-center text-sm text-zinc-700">{$_('confirm.welcome')}</h2>
		<div class="mt-4 flex flex-col gap-4">
			<p class="text-center text-4xl">
				<i class="ti ti-confetti"></i>
			</p>
			<p class="text-justify">
				{$_('confirm.welcome_message', { values: { name: data.user.fullName } })}
			</p>
			<button class="generic-button zinc" onclick={() => goto(`${base}/`)}
				>{$_('confirm.go_to_home')}</button
			>
		</div>
	</section>
</section>
