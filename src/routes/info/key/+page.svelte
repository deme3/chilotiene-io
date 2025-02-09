<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Chi lo tiene...</h1>
		<h2 class="text-xl font-bold"><strong>Chiave di lettura consigliata valutazioni</strong></h2>
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
	<Accordion title="Chiave di lettura valutazioni" noncollapsible>
		<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
			<p>
				Nota che la seguente tabella è una chiave di lettura suggerita agli utenti del sito web, ma
				non tutti potrebbero averla rispettata.
			</p>
			<p>
				Lo standard nel sistema universitario europeo per la valutazione del carico di lavoro dei
				corsi universitari è di assegnare dalle <strong>25 alle 30 ore per ogni ECTS</strong> (1
				ECTS equivale a 1 CFU): un corso da 6 CFU dovrebbe richiedere dalle 150 alle 180 ore di
				lavoro, comprese le ore di <strong>lezione, studio e preparazione</strong> per l'esame.
				Trovi questa informazione a pagina 10 della
				<a
					href="https://op.europa.eu/publication-detail/-/publication/da7467e6-8450-11e5-b8b7-01aa75ed71a1"
					target="_blank">ETCS users' guide</a
				> (EU Publications Office).
			</p>
			<table>
				<thead>
					<tr>
						<th rowspan="2"></th>
						<th rowspan="2">Significato</th>
						<th colspan="2" class="pl-0">Scala di riferimento</th>
					</tr>
					<tr>
						<th class="pl-0">Valutazione</th>
						<th class="pl-2">Significato</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td rowspan="5" class="text-right"><i class="ti ti-star-filled text-yellow-400"></i></td
						>
						<td rowspan="5">Qualità dell'insegnamento</td>
						<td class="pl-0"
							><i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i> <i class="ti ti-star text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i></td
						>
						<td>Pessimo: avrei preferito studiare autonomamente da non frequentante</td>
					</tr>
					<tr>
						<td
							><i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i></td
						>
						<td>Scadente: ho imparato qualcosa ma non mi è piaciuto</td>
					</tr>
					<tr>
						<td
							><i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i></td
						>
						<td>Nella media: niente di speciale, non male</td>
					</tr>
					<tr>
						<td
							><i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star text-yellow-400"></i></td
						>
						<td>Buono: mi è piaciuto, ma c'è spazio di miglioramento</td>
					</tr>
					<tr>
						<td
							><i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i>
							<i class="ti ti-star-filled text-yellow-400"></i></td
						>
						<td>Ottimo: nulla da ridire, perfetto</td>
					</tr>
					<tr>
						<td rowspan="5" class="text-right"
							><i class="ti ti-shield-filled text-red-500/75"></i></td
						>
						<td rowspan="5">Carico di lavoro</td>
						<td class="pl-0"
							><i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i></td
						>
						<td>Facilissimo: liscio come l'olio, al di sotto del carico previsto dai CFU</td>
					</tr>
					<tr>
						<td class="pl-0"
							><i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i></td
						>
						<td>Facile: vicino al carico previsto dai CFU, senza stress</td>
					</tr>
					<tr>
						<td class="pl-0"
							><i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i></td
						>
						<td>Normale: il carico previsto è accurato</td>
					</tr>
					<tr>
						<td class="pl-0"
							><i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield text-red-500/75"></i></td
						>
						<td>Difficile: il carico di lavoro è più alto delle aspettative</td>
					</tr>
					<tr class="border-b">
						<td class="pl-0"
							><i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i>
							<i class="ti ti-shield-filled text-red-500/75"></i></td
						>
						<td>Assurdo: il carico di lavoro è troppo alto, altamente inappropriato</td>
					</tr>
				</tbody>
			</table>
		</article>
	</Accordion>
</section>
