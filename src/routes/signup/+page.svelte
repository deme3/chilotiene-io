<script lang="ts">
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';

	let password: string = $state('');
	let confirmPassword: string = $state('');
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
		<h2 class="mb-2 text-center text-sm text-zinc-700">Sign up</h2>
		<Accordion title="Sign up" noncollapsible>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<label>
					<span class="text-sm font-bold">Full name</span>
					<p class="mb-1 text-xs text-zinc-600">
						It will not be shared unless you explicitly allow it.
					</p>
					<input
						type="text"
						name="fullName"
						class="text-input bg-zinc-900"
						placeholder="Mario Rossi"
						required
					/>
				</label>
				<label>
					<span class="text-sm font-bold">E-mail address</span>
					<p class="mb-1 text-xs text-zinc-600">
						Please provide your institutional e-mail address.
					</p>
					<input
						type="text"
						name="email"
						class="text-input bg-zinc-900"
						placeholder="mario.rossi@unitn.it"
						required
					/>
				</label>
				<label>
					<span class="text-sm font-bold">Password</span>
					<input
						type="password"
						name="password"
						class="text-input bg-zinc-900"
						bind:value={password}
						required
					/>
				</label>
				<label>
					<span class="text-sm font-bold">Confirm Password</span>
					<input
						type="password"
						name="confirmpassword"
						class="text-input bg-zinc-900"
						bind:value={confirmPassword}
						required
					/>
				</label>
				<label>
					<input type="checkbox" name="privacy" required />
					<span class="text-sm"
						>I have read and I accept the <a href="/privacy" class="underline">Privacy Policy</a
						>.</span
					>
					<p class="text-xs text-zinc-600">
						Your data is never used for marketing or profiling activities. It will only be shared
						with service providers for the purpose of providing the service.
					</p>
				</label>
				<button type="submit" class="generic-button" disabled={confirmPassword !== password}
					>Sign up</button
				>
			</form>
		</Accordion>
	</section>
</section>
