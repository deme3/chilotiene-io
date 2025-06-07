<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
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

			{#if form?.success}
				<p class="text-sm text-green-500">Importazione completata con successo!</p>
			{:else if form?.error}
				<p class="text-sm text-red-500">Errore durante l'importazione: {form.error}</p>
			{/if}
		</form>
	</Accordion>
	<Accordion title="Pagina donazioni" noncollapsible>
		<!-- Qui posso aggiungere nuovi nomi al listone, rimuovere quelli esistenti e aggiornare l'importo raggiunto e l'importo massimo-->
		<h3 class="text-lg font-bold text-white">Aggiungi donatore</h3>
		<form class="flex flex-col gap-4">
			<label>
				<span class="text-sm">Nome</span>
				<input type="text" class="text-input bg-zinc-900" />
			</label>
			<button type="submit" class="generic-button">Aggiungi</button>
		</form>

		<h3 class="mt-8 text-lg font-bold text-white">Rimuovi donatore</h3>
		<div class="flex max-h-56 flex-col divide-y divide-zinc-700 overflow-y-auto">
			{#each ['Mario Rossi', 'Mia Nonna', 'Tua Nonna', 'Mio Padre', 'Tuo Padre'] as donor}
				<div class="flex items-center justify-between py-2">
					<div class="flex flex-col">
						<p class="text-sm">{donor}</p>
						<p class="text-xs text-zinc-500">Aggiunto il <strong>12 gennaio 2025</strong></p>
					</div>
					<button class="generic-button">Rimuovi</button>
				</div>
			{/each}
		</div>

		<h3 class="mt-8 text-lg font-bold text-white">Aggiorna importi</h3>
		<form class="flex flex-col gap-4">
			<label>
				<span class="text-sm">Importo raggiunto</span>
				<input type="number" class="text-input bg-zinc-900" value="0" />
			</label>
			<label>
				<span class="text-sm">Importo richiesto</span>
				<input type="number" class="text-input bg-zinc-900" value="50" />
			</label>
			<button type="submit" class="generic-button">Aggiorna</button>
		</form></Accordion
	>
</section>
