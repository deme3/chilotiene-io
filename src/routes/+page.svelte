<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { ChapterScope } from '$lib/ChapterScope';
	import type { PageProps } from './$types';
	import CourseCardSkeleton from '$lib/components/CourseCardSkeleton.svelte';

	let { data }: PageProps = $props();
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="big-logo font-bold" id="logo">Chi lo tiene...</h1>
		<h2 class="text-sm">Seleziona un corso per visualizzarne informazioni e recensioni.</h2>
	</div>
	<div class="flex gap-4">
		{#if true}
			<button
				class="circular-button bg-orange-700 hover:bg-orange-600 active:bg-orange-800"
				aria-label="Admin functions"
				onclick={() => goto('/admin')}
			>
				<i class="ti ti-tools"></i>
			</button>
		{/if}
		<button
			class="circular-button"
			aria-label="Information on the website"
			onclick={() => goto('/info')}
		>
			<i class="ti ti-info-circle"></i>
		</button>
	</div>
</div>

<input type="text" class="text-input mt-4" placeholder="Cerca un corso..." />

<section class="mt-4">
	<div class="grid gap-4 lg:grid-cols-2">
		{#await data.courses}
			{#each Array.from({ length: 6 }, (_, i) => i) as _}
				<CourseCardSkeleton />
			{/each}
		{:then courses}
			{#each courses as course}
				<CourseCard
					id={course.id}
					name={course.name['it']}
					description={course.chapters[ChapterScope.TeachingObjectives].it}
					reviews={course.reviews}
					workload={course.workload}
					credits={course.credits}
				/>
			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</section>
