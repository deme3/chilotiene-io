<script lang="ts">
	import { slide } from 'svelte/transition';

	const {
		children,
		title,
		noncollapsible,
		right
	}: {
		children: () => any;
		title: string;
		noncollapsible?: boolean;
		right?: () => any;
	} = $props();
	let open = $state(false);
</script>

<div class="text-md rounded-lg bg-zinc-800 shadow-lg">
	<div
		class="flex cursor-pointer items-center justify-between gap-8 border-b border-zinc-700 px-4 py-3"
		class:border-b-0={!open && !noncollapsible}
		class:!cursor-auto={noncollapsible}
		onclick={(e) => {
			if (noncollapsible) return;
			open = !open;
		}}
		onselectstart={(e) => {
			if (noncollapsible) return;
			e.preventDefault(); // prevent clicking selects surrounding page
		}}
		onkeydown={(e) => {
			if (noncollapsible) return;
			if (e.key === 'Enter') {
				open = !open;
			}
		}}
		role="button"
		tabindex="0"
	>
		<p
			class="select-none font-bold"
			class:select-text={noncollapsible}
			class:cursor-text={noncollapsible}
		>
			{title}
		</p>
		<div>
			{#if right}
				{@render right()}
			{/if}
			{#if !noncollapsible}
				<div class="transition-transform" class:rotate-180={open}>
					<i class="ti ti-chevron-down text-xl"></i>
				</div>
			{/if}
		</div>
	</div>
	<div class="text-zinc-300/75">
		{#if open || noncollapsible}
			<div transition:slide={{ duration: noncollapsible ? 0 : 100 }} class="p-4">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
