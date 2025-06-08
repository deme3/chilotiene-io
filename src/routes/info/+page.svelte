<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Chi lo tiene...</h1>
		<h2 class="text-xl font-bold"><strong>Informazioni sul sito</strong></h2>
	</div>
	<div class="flex items-center justify-end gap-4">
		<button class="circular-button" aria-label="Go Home" onclick={() => goto(`${base}/`)}>
			<i class="ti ti-home"></i>
		</button>
		<button class="circular-button" aria-label="Go Back" onclick={() => history.back()}>
			<i class="ti ti-arrow-left"></i>
		</button>
	</div>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title="Informazioni generali" noncollapsible>
		<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
			<h4>Chi lo tiene...</h4>
			<p>
				Questo sito è chiaramente ispirato a <a href="https://traquantopassa.in" target="_blank"
					>Tra quanto passa in...</a
				>
				nel suo stile e nella scelta del nome inquisitivo. I dati sui corsi sono bi-annualmente raccolti
				dai sistemi dell'<strong>Università di Trento</strong>, ma le recensioni sono state
				manualmente raccolte sul web ove applicabile oppure inviate direttamente dagli studenti
				all'interno di questo sito.
			</p>
			<p>
				Nel sito troverai valutazioni in <i class="ti ti-star-filled text-yellow-400"></i>, che si
				riferiscono alla qualità dell'insegnamento accompagnate da valutazioni in
				<i class="ti ti-shield-filled text-red-500/75"></i>, che si riferiscono invece al carico di
				lavoro. Trovi <a href="/info/key">a questa pagina</a> la chiave di lettura
				<strong>consigliata</strong> delle valutazioni.
			</p>
			<h4>Perché?</h4>
			<p>
				Il sito è stato creato per permettere agli studenti di condividere le proprie opinioni sui
				corsi sia in termini di qualità che di carico di lavoro in modo chiaro e intuitivo. L'idea
				proviene da siti simili come
				<a href="https://www.coursefinder.ch" target="_blank">EPFL CourseFinder</a> che permettono anche
				a studenti non ancora iscritti di iniziare a raccogliere informazioni sul loro futuro percorso
				di studi.
			</p>
			<h4>Chi sono io?</h4>
			<p>
				Mi chiamo Demetrio Battaglia, sono attualmente uno studente di Informatica all'Università di
				Trento e lavoro part-time come sviluppatore alla Fondazione Bruno Kessler. Puoi visitare il
				mio sito web personale a <a href="https://deme3.me" target="_blank">deme3.me</a>.
			</p>
		</article>
	</Accordion>
	{#if data.donors && false}
		<Accordion title="Donazioni" noncollapsible>
			<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
				<p>
					Per mantenere online questo sito, ovvero coprire i costi del server e del dominio, metto
					personalmente a disposizione una piccola somma di denaro su base annua. Se vuoi aiutarmi a
					coprire questi costi, o vuoi esprimere apprezzamento per questo lavoro, puoi fare una
					donazione tramite Ko-fi. Qualsiasi cifra è immensamente apprezzata.
				</p>

				<p class="-mt-2">
					<a href="https://ko-fi.com/T6T6O6P8Z" class="no-external-link" target="_blank"
						><img
							height="36"
							style="height:36px;margin:0;"
							src="https://storage.ko-fi.com/cdn/kofi5.png?v=6"
							alt="Buy Me a Coffee at ko-fi.com"
						/></a
					>
				</p>

				<h4>Quanto?</h4>
				<p>
					Quanto vuoi. Qui sotto puoi vedere quanti dei costi del <strong
						>{new Date().getFullYear()}</strong
					> sono stati coperti dalle donazioni. Aggiorno periodicamente questa pagina manualmente, quindi
					potresti non vedere la tua donazione immediatamente.
				</p>
			</article>
			<div class="mt-4 flex flex-col gap-2 px-2">
				<p>
					<strong>{Math.round((data.raised / data.goal) * 100)}%</strong>
					({data.raised} su {data.goal}€).
				</p>
				<div class="h-4 w-full rounded-md bg-zinc-900">
					<div
						class="h-full rounded-l-md bg-white"
						style="width: {Math.min((data.raised / data.goal) * 100, 100)}%"
					></div>
				</div>
				<p class="text-xs">
					{data.donors.length > 0
						? `Si ringraziano per le donazioni: ${data.donors.join(', ')}.`
						: 'Per adesso nessuna donazione. :('}
				</p>
			</div>
		</Accordion>
	{/if}
	{#if false}
		<Accordion title="Roadmap" noncollapsible>
			<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
				<h4>Adesso</h4>
				<p class="my-0 text-xs [color:var(--tw-prose-captions)]">12 gennaio 2025</p>
				<p class="mt-2">
					Il sito viene rilasciato unicamente con la sua funzione primaria di aggregatore di
					recensioni sui corsi dell'Università.
				</p>

				<h4>In futuro</h4>
				<p class="my-0 text-xs [color:var(--tw-prose-captions)]">entro l'anno?</p>
				<p class="mb-0 mt-2">Le seguenti funzionalità sono in programma per il futuro:</p>
				<ul class="mt-0 pt-0">
					<li>Aggiungere vista tabellare compatta</li>
					<li>Funzione "carrello corsi": salvare corsi per consultarli più tardi</li>
				</ul>
			</article>
		</Accordion>
	{/if}
</section>
