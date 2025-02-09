<script lang="ts">
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
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
	<section>
		<h1 class="text-center text-3xl font-bold"><a href="{base}/">chilotiene.io</a></h1>
		<h2 class="mb-2 text-center text-sm text-zinc-700">Login</h2>
		<Accordion title="Login" noncollapsible>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<label>
					<span class="text-sm">E-mail address</span>
					<input type="text" name="email" class="text-input bg-zinc-900" />
				</label>
				<label>
					<span class="text-sm">Password</span>
					<input type="password" name="password" class="text-input bg-zinc-900" />
				</label>
				<button type="submit" class="generic-button">Login</button>
				<a class="text-center underline" href="{base}/signup">Don't have an account?</a>
			</form>
		</Accordion>
	</section>
</section>
