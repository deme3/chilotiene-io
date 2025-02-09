<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let {
		id,
		code,
		name,
		description,
		reviews,
		workload,
		credits,
		adminHeads,
		professors
	}: {
		id?: string;
		code: string;
		name: string;
		description: string;
		reviews: number[];
		workload: number[];
		credits: number;
		adminHeads: string[];
		professors: string[];
	} = $props();
	let rating = $derived(
		reviews.length > 0 ? reviews.reduce((acc, review) => acc + review, 0) / reviews.length : 0
	);
	let avgWorkload = $derived(
		workload.length > 0 ? workload.reduce((acc, w) => acc + w, 0) / workload.length : 0
	);
	let hovering = $state(false);

	let bothProfessorAndHead = $derived(
		professors.filter((professor) => adminHeads.includes(professor))
	);
	let uniqueProfessors = $derived(
		professors.filter((professor) => !adminHeads.includes(professor))
	);
	let uniqueAdminHeads = $derived(
		adminHeads.filter((adminHead) => !professors.includes(adminHead))
	);
</script>

<div
	class="rounded-lg bg-zinc-800 p-4 shadow-lg hover:bg-zinc-700 hover:transition-colors"
	onmouseenter={() => (hovering = true)}
	onmouseleave={() => (hovering = false)}
	onclick={() => {
		if (id) {
			goto(`/courses/${id}`);
		}
	}}
	onkeydown={(e) => {
		if (e.key === 'Enter' && id) {
			goto(`/courses/${id}`);
		}
	}}
	role="button"
	tabindex="0"
>
	<div class="flex h-full cursor-pointer items-center justify-between gap-8">
		<div class="grid h-full grid-rows-[auto,auto,1fr,auto,auto]">
			<div class="font-mono text-xs text-zinc-300/75">{code}</div>
			<h3 class="text-xl font-bold">
				{name}
				<span class="text-xs text-zinc-300/75">{credits} CFU</span>
			</h3>
			<p class="mb-2 text-sm text-zinc-300/75">
				{description}
			</p>
			{#if bothProfessorAndHead.length + uniqueProfessors.length + uniqueAdminHeads.length > 0}
				<div class="text-sm">
					{#each bothProfessorAndHead as professor, i}
						<i class="ti ti-user" title="Docente e titolare"></i>{' '}
						{professor}{#if i < bothProfessorAndHead.length - 1},{' '}{/if}
					{/each}{#if bothProfessorAndHead.length > 0 && (uniqueProfessors.length > 0 || uniqueAdminHeads.length > 0)},{' '}
					{/if}
					{#each uniqueProfessors as professor, i}
						<i class="ti ti-school" title="Docente"></i>{' '}
						{professor}{#if i < uniqueProfessors.length - 1},{' '}{/if}
					{/each}
					{#each uniqueAdminHeads as adminHead, i}
						<i class="ti ti-crown" title="Titolare"></i>{' '}
						{adminHead}{#if i < uniqueAdminHeads.length - 1},{' '}{/if}
					{/each}
				</div>
			{/if}
			<div class="text-sm">
				{#each Array.from({ length: Math.floor(rating) }, (_, i) => i)}
					<i class="ti ti-star-filled text-yellow-400"></i>{' '}
				{/each}
				{#if rating - Math.floor(rating) >= 0.5}
					<i class="ti ti-star-half-filled text-yellow-400"></i>{' '}
				{/if}
				{#each Array.from({ length: 5 - Math.floor(rating) - (rating - Math.floor(rating) >= 0.5 ? 1 : 0) }, (_, i) => i)}
					<i class="ti ti-star text-yellow-400"></i>{' '}
				{/each}
				<span class="ml-1 text-yellow-300/75">{rating == 0 ? 'ND' : rating.toFixed(1)}</span>
				<span class="mx-1"> &bullet; </span>
				{#each Array.from({ length: Math.floor(avgWorkload) }, (_, i) => i)}
					<i class="ti ti-shield-filled text-red-500/75"></i>{' '}
				{/each}
				{#if avgWorkload - Math.floor(avgWorkload) >= 0.5}
					<i class="ti ti-shield-half-filled inline-block -scale-x-100 scale-y-100 text-red-500/75"
					></i>{' '}
				{/if}
				{#each Array.from({ length: 5 - Math.floor(avgWorkload) - (avgWorkload - Math.floor(avgWorkload) >= 0.5 ? 1 : 0) }, (_, i) => i)}
					<i class="ti ti-shield text-red-500/75"></i>{' '}
				{/each}
				<span class="ml-1 text-red-500/75">{avgWorkload == 0 ? 'ND' : avgWorkload.toFixed(1)}</span>
			</div>
		</div>
		<div class="min-w-12 max-w-12 text-center">
			{#if hovering}
				<div
					in:fly={{ x: -10, duration: 100, opacity: 1 }}
					out:fly={{ x: -10, duration: 100, opacity: 0 }}
				>
					<i class="ti ti-arrow-right text-3xl"></i>
				</div>
			{/if}
		</div>
	</div>
</div>
