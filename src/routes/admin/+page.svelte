<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">{$_('title')}</h1>
		<h2 class="text-xl font-bold"><strong>{$_('admin.title')}</strong></h2>
	</div>
	<button class="circular-button" aria-label={$_('info.go_home')} onclick={() => goto('/')}>
		<i class="ti ti-home"></i>
	</button>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title={$_('admin.import_title')} noncollapsible>
		<h3 class="text-lg font-bold text-white">{$_('admin.import_from_unitn')}</h3>
		<form class="flex flex-col gap-4" action="?/importFromUniTN" method="POST" use:enhance>
			<label>
				<span class="text-sm">{$_('admin.offerta_year')}</span>
				<input name="offerta" type="number" value="2024" class="text-input bg-zinc-900" />
			</label>
			<button type="submit" class="generic-button">{$_('admin.add')}</button>

			{#if form?.success && form.action.includes('importFromUniTN')}
				<p class="text-sm text-green-500">{$_('admin.import_success')}</p>
			{:else if form?.error && form.action.includes('importFromUniTN')}
				<p class="text-sm text-red-500">
					{$_('admin.import_error')}
					{form.error}
				</p>
			{/if}
		</form>
	</Accordion>
	<Accordion title={$_('admin.donations_page')} noncollapsible>
		<h3 class="text-lg font-bold text-white">{$_('admin.add_donation')}</h3>
		<form class="flex flex-col gap-4" action="?/addDonation" method="POST" use:enhance>
			<label>
				<span class="text-sm">{$_('admin.name')}</span>
				<input name="name" type="text" class="text-input bg-zinc-900" />
			</label>
			<label>
				<span class="text-sm">{$_('admin.amount')} (€)</span>
				<input name="amount" type="number" step="0.01" class="text-input bg-zinc-900" />
			</label>
			<button type="submit" class="generic-button">{$_('admin.add_donation_button')}</button>
			{#if form?.success && form.action.includes('addDonation')}
				<p class="text-sm text-green-500">{$_('admin.donation_success')}</p>
			{:else if form?.error && form.action.includes('addDonation')}
				<p class="text-sm text-red-500">{$_('admin.error')} {form.error}</p>
			{/if}
		</form>

		<h3 class="mt-8 text-lg font-bold text-white">{$_('admin.recent_donations')}</h3>
		<div class="flex max-h-56 flex-col divide-y divide-zinc-700 overflow-y-auto">
			{#each data.donations as donation}
				<div class="flex items-center justify-between py-2">
					<div class="flex flex-col">
						<p class="text-sm">
							<strong>{donation.name}</strong>
							{$_('admin.has_donated')}
							<strong>{donation.amount}€</strong>
						</p>
						<p class="text-xs text-zinc-500">
							{$_('admin.added_on')}
							<strong>{new Date(donation.createdAt).toLocaleDateString()}</strong>
						</p>
					</div>
					<form action="?/removeDonation" method="POST" use:enhance>
						<input type="hidden" name="id" value={donation._id} />
						<button type="submit" class="generic-button">{$_('admin.remove')}</button>
					</form>
				</div>
			{/each}
		</div>

		<h3 class="mt-8 text-lg font-bold text-white">{$_('admin.fundraising_goal')}</h3>
		<p class="mb-2">
			{$_('admin.reached')}: {data.raised.toFixed(2)}€ / {data.goal.toFixed(2)}€
		</p>
		<form class="flex flex-col gap-4" action="?/updateGoal" method="POST" use:enhance>
			<label>
				<span class="text-sm">{$_('admin.new_goal')} (€)</span>
				<input name="goal" type="number" class="text-input bg-zinc-900" value={data.goal} />
			</label>
			<button type="submit" class="generic-button">{$_('admin.update_goal')}</button>
			{#if form?.success && form.action.includes('updateGoal')}
				<p class="text-sm text-green-500">{$_('admin.goal_updated_success')}</p>
			{:else if form?.error && form.action.includes('updateGoal')}
				<p class="text-sm text-red-500">{$_('admin.error')} {form.error}</p>
			{/if}
		</form></Accordion
	>
	<Accordion title={$_('admin.import_reviews_title')} noncollapsible>
		<h3 class="text-lg font-bold text-white">{$_('admin.import_reviews_from_json')}</h3>
		<form
			class="flex flex-col gap-4"
			action="?/importReviewBatch"
			method="POST"
			enctype="multipart/form-data"
			use:enhance
		>
			<label>
				<span class="text-sm">{$_('admin.json_file')}</span>
				<input
					name="reviewBatch"
					type="file"
					accept="application/json"
					class="text-input bg-zinc-900"
					required
				/>
			</label>
			<button type="submit" class="generic-button">{$_('admin.import')}</button>

			{#if form?.success && form.action.includes('importReviewBatch')}
				<p class="text-sm text-green-500">{$_('admin.import_reviews_success')}</p>
			{:else if form?.error && form.action.includes('importReviewBatch')}
				<p class="text-sm text-red-500">
					{$_('admin.import_reviews_error')}
					{form.error}
				</p>
			{/if}
		</form>
	</Accordion>
</section>
