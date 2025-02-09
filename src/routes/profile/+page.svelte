<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';

	const { data } = $props();
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Profilo di</h1>
		<h2 class="text-xl font-bold"><strong>{data.user?.fullName}</strong></h2>
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
	<Accordion title="" noncollapsible>
		<p></p>
	</Accordion>
</section>
