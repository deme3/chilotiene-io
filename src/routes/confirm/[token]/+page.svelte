<script lang="ts">
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
		<h1 class="text-center text-3xl font-bold"><a href="{base}/">chilotiene.io</a></h1>
		<h2 class="mb-2 text-center text-sm text-zinc-700">Welcome</h2>
		<div class="mt-4 flex flex-col gap-4">
			<p class="text-center text-4xl">
				<i class="ti ti-confetti"></i>
			</p>
			<p class="text-justify">
				Welcome, {data.user.fullName}! Your account is now active and you have been logged in.
			</p>
			<button class="generic-button zinc" onclick={() => goto(`${base}/`)}>Go to home</button>
		</div>
	</section>
</section>
