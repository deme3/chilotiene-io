<script lang="ts">
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { PageProps } from './$types';

	let password: string = $state('');
	let confirmPassword: string = $state('');

	let { form }: PageProps = $props();
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
		{#if form?.success && form?.user && form?.token}
			<div class="mt-4 flex flex-col gap-4">
				<p class="text-center text-4xl">
					<i class="ti ti-circle-check"></i>
				</p>
				<p class="text-justify">
					You have successfully signed up. Please check your e-mail to confirm your account.
				</p>
				<p class="text-justify">
					Please note you cannot log in until you have confirmed your account. However, you can
					still access the website as a guest.
				</p>
				{#if form?.resent}
					<p class="text-justify">
						The e-mail has been sent again. Please check your inbox and spam folder. If you still
						did not receive it, please contact us at <a
							class="underline"
							href={`mailto:help@chilotiene.io?subject=${encodeURIComponent('Help: Confirmation token went missing')}&body=` +
								encodeURIComponent(`Hello,

I did not receive the confirmation e-mail twice. Could you please help me?
The e-mail address I used is ${form?.user?.emailAddress ?? '<error, please add manually>'}. [add any relevant detail that might help]`)}
							>help@chilotiene.io</a
						>.
					</p>
				{:else}
					<div class="text-justify">
						Did you not receive the e-mail? Please check your spam folder or <form
							method="post"
							action="?/resend"
							class="inline"
						>
							<input type="hidden" name="email" value={form?.user?.emailAddress} />
							<input type="hidden" name="token" value={form?.token?.token} />
							<button class="underline" type="submit">click here</button>
						</form>
						to resend it.
					</div>
				{/if}
			</div>
		{:else}
			<h2 class="mb-2 text-center text-sm text-zinc-700">Sign up</h2>
			<Accordion title="Sign up" noncollapsible>
				<form action="?/register" class="flex flex-col gap-4" method="POST" use:enhance>
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
		{/if}
	</section>
</section>
