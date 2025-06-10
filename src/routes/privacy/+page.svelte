<script>
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">{$_('title')}</h1>
		<h2 class="text-xl font-bold"><strong>{$_('privacy.title')}</strong></h2>
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
	<Accordion title={$_('privacy.title')} noncollapsible>
		<article class="prose prose-base prose-invert !max-w-full px-2 prose-headings:mb-0">
			<p>{$_('privacy.p1')}</p>

			<p>{$_('privacy.p2')}</p>

			<h3>{$_('privacy.h1')}</h3>
			<p>{$_('privacy.p3')}</p>

			<h4>{$_('privacy.h2')}</h4>
			<p>
				<strong>{$_('privacy.h2_b1')}</strong><br />
				{$_('privacy.p4')}
			</p>
			<ul>
				<li>{$_('privacy.li1')}</li>
				<li>{$_('privacy.li2')}</li>
			</ul>

			<p>
				<strong>{$_('privacy.h2_b2')}</strong><br />
				{$_('privacy.p5')}
			</p>

			<h3>{$_('privacy.h3')}</h3>
			<p>{$_('privacy.p6')}</p>
			<ul>
				<li>{$_('privacy.li3')}</li>
				<li>{$_('privacy.li4')}</li>
				<li>{$_('privacy.li5')}</li>
				<li>{$_('privacy.li6')}</li>
				<li>{$_('privacy.li7')}</li>
			</ul>

			<h3>{$_('privacy.h4')}</h3>
			<p>{$_('privacy.p7')}</p>
			<ul>
				<li>
					{$_('privacy.li8_1')} <strong>{$_('privacy.li8_2')}</strong>
					{$_('privacy.li8_3')}
				</li>
				<li>{$_('privacy.li9')}</li>
			</ul>
			<p>{$_('privacy.p8')}</p>
			<h3>{$_('privacy.h5')}</h3>
			<p>{$_('privacy.p9')}</p>

			<h3>{$_('privacy.h6')}</h3>
			<p>{$_('privacy.p10')}</p>
			<ul>
				<li>
					<strong>{$_('privacy.h6_b1')}</strong>
					{$_('privacy.li10')}
				</li>
				<li>
					<strong>{$_('privacy.h6_b2')}</strong>
					{$_('privacy.li11')}
				</li>
				<li>
					<strong>{$_('privacy.h6_b3')}</strong>
					{$_('privacy.li12')}
				</li>
				<li>
					<strong>{$_('privacy.h6_b4')}</strong>
					{$_('privacy.li13')}
				</li>
				<li>
					<strong>{$_('privacy.h6_b5')}</strong>
					{$_('privacy.li14')}
				</li>
				<li>
					<strong>{$_('privacy.h6_b6')}</strong>
					{$_('privacy.li15')}
				</li>
			</ul>
			<p>{$_('privacy.p11')}</p>

			<h3>{$_('privacy.h7')}</h3>
			<p>{$_('privacy.p12')}</p>

			<h3>{$_('privacy.h8')}</h3>
			<p>{$_('privacy.p13')}</p>

			<h3>{$_('privacy.h9')}</h3>
			<p>
				{$_('privacy.p14')}
				<a href="mailto:hello@deme3.me">hello@deme3.me</a>
			</p>
		</article>
	</Accordion>
</section>
