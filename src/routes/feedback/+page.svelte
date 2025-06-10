<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">{$_('title')}</h1>
		<h2 class="text-xl font-bold"><strong>{$_('feedback.title')}</strong></h2>
	</div>
	<div class="flex items-center justify-end gap-4">
		<button
			class="circular-button"
			aria-label={$_('info.go_home')}
			onclick={() => goto(`${base}/`)}
		>
			<i class="ti ti-home"></i>
		</button>
		<button class="circular-button" aria-label={$_('info.go_back')} onclick={() => history.back()}>
			<i class="ti ti-arrow-left"></i>
		</button>
	</div>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title={$_('feedback.accordion_title')} noncollapsible>
		<div class="prose-base prose-invert mb-4 text-sm">
			<p>{$_('feedback.description')}</p>
		</div>
		<form class="flex flex-col gap-2" method="POST">
			<label>
				<span class="text-sm font-bold">{$_('feedback.type_label')}</span>
				<Select name="type">
					<option value="bug">{$_('feedback.type_bug')}</option>
					<option value="suggestion">{$_('feedback.type_suggestion')}</option>
					<option value="other">{$_('feedback.type_other')}</option>
				</Select>
			</label>
			<label>
				<span class="text-sm font-bold">{$_('feedback.contact_label')}</span>
				<input
					type="email"
					placeholder="mario.rossi@mail.it"
					name="contact"
					class="text-input bg-zinc-900"
				/>
			</label>

			<label>
				<span class="text-sm font-bold">{$_('feedback.feedback_label')}</span>
				<textarea
					id="feedback"
					name="feedback"
					class="text-input block w-full resize-none bg-zinc-900 !ring-0"
					rows="8"
					placeholder={$_('feedback.feedback_placeholder')}
				></textarea>
			</label>
			<button type="submit" class="generic-button">{$_('feedback.submit_button')}</button>
		</form>
	</Accordion>
</section>
