<script lang="ts">
	import { browser } from '$app/environment';

	const {
		author,
		text,
		date,
		rating,
		workload,
		sourced
	}: {
		author?: string;
		text: string;
		date: Date;
		rating: number;
		workload: number;
		sourced?: boolean;
	} = $props();
</script>

<div class="rounded-lg bg-zinc-900 p-4 shadow-lg">
	<div class="flex items-center justify-between gap-4">
		<div>
			{#if author}
				<h3 class="text-md font-bold">{author}</h3>
			{/if}
			<p class="text-xs text-zinc-300/50">
				{date.toLocaleDateString(browser ? navigator.language : 'it-IT', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: '2-digit'
				})}
			</p>
			<p class="text-sm text-zinc-300/75">
				{text}
			</p>
			<div class="mt-2 text-sm">
				{#each Array.from({ length: Math.floor(rating) }, (_, i) => i)}
					<i class="ti ti-star-filled text-yellow-400"></i>{' '}
				{/each}
				{#if rating - Math.floor(rating) >= 0.5}
					<i class="ti ti-star-half-filled text-yellow-400"></i>{' '}
				{/if}
				{#each Array.from({ length: 5 - Math.floor(rating) - (rating - Math.floor(rating) >= 0.5 ? 1 : 0) }, (_, i) => i)}
					<i class="ti ti-star text-yellow-400"></i>{' '}
				{/each}
				<span class="ml-1 text-yellow-300/75">{rating}</span>
				<span class="mx-1"> &bullet; </span>
				{#each Array.from({ length: Math.floor(workload) }, (_, i) => i)}
					<i class="ti ti-shield-filled text-red-500/75"></i>{' '}
				{/each}
				{#if workload - Math.floor(workload) >= 0.5}
					<i class="ti ti-shield-half-filled inline-block -scale-x-100 scale-y-100 text-red-500/75"
					></i>{' '}
				{/if}
				{#each Array.from({ length: 5 - Math.floor(workload) - (workload - Math.floor(workload) >= 0.5 ? 1 : 0) }, (_, i) => i)}
					<i class="ti ti-shield text-red-500/75"></i>{' '}
				{/each}
				<span class="ml-1 text-red-500/75">{workload}</span>
				{#if sourced}
					<span class="mx-1"> &bullet; </span>
					<i class="ti ti-world text-blue-500/50"></i>
					<span class="text-blue-500/50">Importata dal web</span>
				{/if}
			</div>
		</div>
	</div>
</div>
