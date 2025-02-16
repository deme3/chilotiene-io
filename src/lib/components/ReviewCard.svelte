<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';

	const {
		author,
		authorId,
		text,
		date,
		rating,
		workload,
		grade,
		sourced,
		anonymousVerified
	}: {
		author?: string;
		authorId?: string;
		text: string;
		date: Date;
		rating: number;
		workload: number;
		grade?: number;
		sourced?: boolean;
		anonymousVerified?: boolean;
	} = $props();
</script>

<div class="rounded-lg bg-zinc-900 p-4 shadow-lg">
	<div class="flex items-center justify-between gap-4">
		<div>
			<h3
				class="text-md font-bold"
				class:opacity-50={!author && !anonymousVerified}
				class:text-white={!!authorId || anonymousVerified}
			>
				{#if author}
					{#if authorId}
						<a href="{base}/profile/{authorId}">{author}</a>{' '}<i class="ti ti-circle-check"></i>
					{:else}
						{author}
					{/if}
				{:else if anonymousVerified}
					Anonimo verificato <i class="ti ti-circle-check"></i>
				{:else}
					Anonimo <i class="ti ti-user-question"></i>
				{/if}
			</h3>
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
				{#if grade}
					<span class="mx-1"> &bullet; </span>
					<i class="ti ti-medal text-green-500/75"></i>{' '}
					<span class="text-green-500/75">{grade == 31 ? '30L' : grade}</span>
				{/if}
				{#if sourced}
					<span class="mx-1"> &bullet; </span>
					<i class="ti ti-world text-blue-500/50"></i>
					<span class="text-blue-500/50">Importata dal web</span>
				{/if}
			</div>
		</div>
	</div>
</div>
