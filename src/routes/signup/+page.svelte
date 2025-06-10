<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { PageProps } from './$types';

	let password: string = $state('');
	let confirmPassword: string = $state('');

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>{$_('signup.title')} - {$_('title')}</title>
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
		{#if form?.success && form?.user && form?.token}
			<div class="mt-4 flex flex-col gap-4">
				<p class="text-center text-4xl">
					<i class="ti ti-circle-check"></i>
				</p>
				<p class="text-justify">{$_('signup.success_message')}</p>
				<p class="text-justify">{$_('signup.cannot_login_message')}</p>
				{#if form?.resent}
					<p class="text-justify">
						{$_('signup.resent_message')}
						<a
							class="underline"
							href="mailto:help@chilotiene.io?subject={encodeURIComponent(
								$_('signup.email_subject')
							)}&body={encodeURIComponent(
								$_('signup.email_body', {
									values: { email: form?.user?.emailAddress ?? '<error, please add manually>' }
								})
							)}">help@chilotiene.io</a
						>.
					</p>
				{:else}
					<div class="text-justify">
						{$_('signup.not_received_message')}
						<form method="post" action="?/resend" class="inline">
							<input type="hidden" name="email" value={form?.user?.emailAddress} />
							<input type="hidden" name="token" value={form?.token?.token} />
							<button class="underline" type="submit">{$_('signup.click_here')}</button>
						</form>
						{$_('signup.to_resend')}
					</div>
				{/if}
			</div>
		{:else}
			<h2 class="mb-2 text-center text-sm text-zinc-700">{$_('signup.title')}</h2>
			<Accordion title={$_('signup.title')} noncollapsible>
				<form action="?/register" class="flex flex-col gap-4" method="POST" use:enhance>
					<label>
						<span class="text-sm font-bold">{$_('signup.full_name')}</span>
						<p class="mb-1 text-xs text-zinc-600">{$_('signup.full_name_description')}</p>
						<input
							type="text"
							name="fullName"
							class="text-input bg-zinc-900"
							placeholder={$_('signup.full_name_placeholder')}
							required
						/>
					</label>
					<label>
						<span class="text-sm font-bold">{$_('signup.email_address')}</span>
						<p class="mb-1 text-xs text-zinc-600">
							{$_('signup.email_address_description')}
						</p>
						<input
							type="text"
							name="email"
							class="text-input bg-zinc-900"
							placeholder={$_('signup.email_address_placeholder')}
							required
						/>
					</label>
					<label>
						<span class="text-sm font-bold">{$_('signup.password')}</span>
						<input
							type="password"
							name="password"
							class="text-input bg-zinc-900"
							bind:value={password}
							required
						/>
					</label>
					<label>
						<span class="text-sm font-bold">{$_('signup.confirm_password')}</span>
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
							>{$_('signup.privacy_policy_agreement_1')}
							<a href="/privacy" class="underline">{$_('signup.privacy_policy_agreement_2')}</a
							>.</span
						>
						<p class="text-xs text-zinc-600">
							{$_('signup.privacy_policy_description')}
						</p>
					</label>
					<button type="submit" class="generic-button" disabled={confirmPassword !== password}
						>{$_('signup.title')}</button
					>
				</form>
			</Accordion>
		{/if}
	</section>
</section>
