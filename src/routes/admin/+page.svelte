<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Chi lo tiene...</h1>
		<h2 class="text-xl font-bold"><strong>Admin functions</strong></h2>
	</div>
	<button class="circular-button" aria-label="Go Home" onclick={() => goto('/')}>
		<i class="ti ti-home"></i>
	</button>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title="Importa" noncollapsible>
		<h3 class="text-lg font-bold text-white">Importa dati da UniTN</h3>
		<form class="flex flex-col gap-4" action="?/importFromUniTN" method="POST" use:enhance>
			<label>
				<span class="text-sm">Anno di offerta</span>
				<input name="offerta" type="number" value="2024" class="text-input bg-zinc-900" />
			</label>
			<button type="submit" class="generic-button">Aggiungi</button>

			{#if form?.success && form.action.includes('importFromUniTN')}
				<p class="text-sm text-green-500">Importazione completata con successo!</p>
			{:else if form?.error && form.action.includes('importFromUniTN')}
				<p class="text-sm text-red-500">Errore durante l'importazione: {form.error}</p>
			{/if}
		</form>
	</Accordion>
	<Accordion title="Pagina donazioni" noncollapsible>
		<h3 class="text-lg font-bold text-white">Aggiungi donazione</h3>
		<form class="flex flex-col gap-4" action="?/addDonation" method="POST" use:enhance>
			<label>
				<span class="text-sm">Nome</span>
				<input name="name" type="text" class="text-input bg-zinc-900" />
			</label>
			<label>
				<span class="text-sm">Importo (€)</span>
				<input name="amount" type="number" step="0.01" class="text-input bg-zinc-900" />
			</label>
			<button type="submit" class="generic-button">Aggiungi donazione</button>
			{#if form?.success && form.action.includes('addDonation')}
				<p class="text-sm text-green-500">Donazione aggiunta con successo!</p>
			{:else if form?.error && form.action.includes('addDonation')}
				<p class="text-sm text-red-500">Errore: {form.error}</p>
			{/if}
		</form>

		<h3 class="mt-8 text-lg font-bold text-white">Donazioni recenti</h3>
		<div class="flex max-h-56 flex-col divide-y divide-zinc-700 overflow-y-auto">
			{#each data.donations as donation}
				<div class="flex items-center justify-between py-2">
					<div class="flex flex-col">
						<p class="text-sm">
							<strong>{donation.name}</strong>
							ha donato
							<strong>{donation.amount}€</strong>
						</p>
						<p class="text-xs text-zinc-500">
							Aggiunto il <strong>{new Date(donation.createdAt).toLocaleDateString()}</strong>
						</p>
					</div>
					<form action="?/removeDonation" method="POST" use:enhance>
						<input type="hidden" name="id" value={donation._id} />
						<button type="submit" class="generic-button">Rimuovi</button>
					</form>
				</div>
			{/each}
		</div>

		<h3 class="mt-8 text-lg font-bold text-white">Obiettivo raccolta fondi</h3>
		<p class="mb-2">Raggiunto: {data.raised.toFixed(2)}€ / {data.goal.toFixed(2)}€</p>
		<form class="flex flex-col gap-4" action="?/updateGoal" method="POST" use:enhance>
			<label>
				<span class="text-sm">Nuovo obiettivo (€)</span>
				<input name="goal" type="number" class="text-input bg-zinc-900" value={data.goal} />
			</label>
			<button type="submit" class="generic-button">Aggiorna obiettivo</button>
			{#if form?.success && form.action.includes('updateGoal')}
				<p class="text-sm text-green-500">Obiettivo aggiornato con successo!</p>
			{:else if form?.error && form.action.includes('updateGoal')}
				<p class="text-sm text-red-500">Errore: {form.error}</p>
			{/if}
		</form></Accordion
	>
</section>
