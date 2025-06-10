<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">{$_('title')}</h1>
		<h2 class="text-xl font-bold"><strong>{$_('info.title')}</strong></h2>
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
	<Accordion title={$_('info.general_information')} noncollapsible>
		<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
			<h4>{$_('title')}</h4>
			<p>
				{$_('info.p1_1')}
				<a href="https://traquantopassa.in" target="_blank">{$_('info.p1_2')}</a>
				{$_('info.p1_3')}
				<strong>{$_('info.p1_4')}</strong>, {$_('info.p1_5')}
			</p>
			<p>
				{$_('info.p2_1')} <i class="ti ti-star-filled text-yellow-400"></i>, {$_('info.p2_2')}
				<i class="ti ti-shield-filled text-red-500/75"></i>, {$_('info.p2_3')}
				<a href="/info/key">{$_('info.p2_4')}</a>
				<strong>{$_('info.p2_5')}</strong>
				{$_('info.p2_6')}
			</p>
			<h4>{$_('info.why_title')}</h4>
			<p>
				{$_('info.p3_1')}
				<a href="https://www.coursefinder.ch" target="_blank">{$_('info.p3_2')}</a>
				{$_('info.p3_3')}
			</p>
			<h4>{$_('info.who_am_i_title')}</h4>
			<p>
				{$_('info.p4_1')}
				<a href="https://deme3.me" target="_blank">deme3.me</a>.
			</p>
		</article>
	</Accordion>
	{#if data.donors && false}
		<Accordion title={$_('info.donations_title')} noncollapsible>
			<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
				<p>
					{$_('info.p5_1')}
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

				<h4>{$_('info.how_much_title')}</h4>
				<p>
					{$_('info.p6_1')} <strong>{new Date().getFullYear()}</strong>
					{$_('info.p6_2')}
				</p>
			</article>
			<div class="mt-4 flex flex-col gap-2 px-2">
				<p>
					<strong>{Math.round((data.raised / data.goal) * 100)}%</strong>
					({data.raised}
					{$_('info.on')}
					{data.goal}€).
				</p>
				<div class="h-4 w-full rounded-md bg-zinc-900">
					<div
						class="h-full rounded-l-md bg-white"
						style="width: {Math.min((data.raised / data.goal) * 100, 100)}%"
					></div>
				</div>
				<p class="text-xs">
					{data.donors.length > 0
						? $_('info.thanks_to') + ' ' + data.donors.join(', ') + '.'
						: 'For now no donation. :('}
				</p>
			</div>
		</Accordion>
	{/if}
</section>
