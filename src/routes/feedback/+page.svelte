<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Chi lo tiene...</h1>
		<h2 class="text-xl font-bold"><strong>Feedback Form</strong></h2>
	</div>
	<button class="circular-button" aria-label="Go Back" onclick={() => history.back()}>
		<i class="ti ti-arrow-left"></i>
	</button>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title="Dammi un feedback" noncollapsible>
		<div class="prose-base prose-invert mb-4 text-sm">
			<p>
				Se hai riscontrato un problema o hai un suggerimento per migliorare il sito, puoi inviarmi
				un feedback, sarò felice di riceverlo ed eventualmente, se lascerai un contatto, di
				risponderti. Puoi usare Markdown per formattare il testo, se necessario.
			</p>
		</div>
		<form class="flex flex-col gap-2" method="POST">
			<label>
				<span class="text-sm font-bold">Tipo di feedback</span>
				<Select name="type">
					<option value="bug">Segnala un bug</option>
					<option value="suggestion">Fai una proposta</option>
					<option value="other">Messaggio</option>
				</Select>
			</label>
			<label>
				<span class="text-sm font-bold">Contatto (opzionale)</span>
				<input
					type="email"
					placeholder="mario.rossi@mail.it"
					name="contact"
					class="text-input bg-zinc-900"
				/>
			</label>

			<label>
				<span class="text-sm font-bold">Feedback</span>
				<textarea
					id="feedback"
					name="feedback"
					class="text-input block w-full resize-none bg-zinc-900 !ring-0"
					rows="8"
					placeholder="Scrivi qui il tuo feedback..."
				></textarea>
			</label>
			<button type="submit" class="generic-button">Invia</button>
		</form>
	</Accordion>
</section>
