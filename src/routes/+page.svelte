<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { ChapterScope } from '$lib/ChapterScope';
	import type { PageProps } from './$types';
	import CourseCardSkeleton from '$lib/components/CourseCardSkeleton.svelte';
	import { UserRole } from '$lib/UserRole';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();

	let searchTimer: ReturnType<typeof setTimeout>;
	let searchForm: HTMLFormElement;

	function onSearchTermChange() {
		if (searchTimer) clearTimeout(searchTimer);
		searchTimer = setTimeout(() => searchForm.requestSubmit(), 500);
	}
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="big-logo font-bold" id="logo">Chi lo tiene...</h1>
		<h2 class="text-sm">Seleziona un corso per visualizzarne informazioni e recensioni.</h2>
	</div>
	<div class="flex gap-4">
		{#if data.user && data.user.role === UserRole.Admin}
			<button
				class="circular-button bg-orange-700 hover:bg-orange-600 active:bg-orange-800"
				aria-label="Admin functions"
				onclick={() => goto('/admin')}
			>
				<i class="ti ti-tools"></i>
			</button>
		{/if}
		{#if !data.user}
			<button class="circular-button" aria-label="Accedi" onclick={() => goto(`${base}/login`)}>
				<i class="ti ti-key"></i>
			</button>
		{:else}
			<div class="flex">
				<button
					class="circular-button flex items-center gap-2 rounded-r-none border-r border-r-zinc-900"
					aria-label="Profilo"
					onclick={() => goto(`${base}/profile`)}
				>
					<i class="ti ti-user"></i>
					<span class="text-xs">{data.user.fullName}</span>
				</button>
				<form method="POST" action="{base}/logout" use:enhance>
					<button class="circular-button rounded-l-none" aria-label="Logout">
						<i class="ti ti-door-exit"></i>
					</button>
				</form>
			</div>
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

<form data-sveltekit-keepfocus bind:this={searchForm}>
	<input
		name="q"
		type="text"
		class="text-input mt-4"
		placeholder="Cerca un corso per nome, codice o docente..."
		value={data.searchTerm}
		oninput={onSearchTermChange}
	/>
</form>

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
					code={course.librettoCode}
					name={course.name['it']}
					description={course.chapters[ChapterScope.TeachingObjectives].it}
					reviews={course.reviews}
					workload={course.workload}
					grades={course.grades}
					credits={course.credits}
					professors={course.professors.map((x) => x.fullName)}
					adminHeads={course.adminHeads.map((x) => x.fullName)}
				/>
			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
	<div class="mt-4 flex items-center justify-center gap-2">
		{#await data.pages then pages}
			<a
				class="generic-button zinc square"
				aria-label="First page"
				href="?page=1&q={data.searchTerm}"
				class:disabled={data.currentPage === 1}
				aria-disabled={data.currentPage === 1}
				data-sveltekit-noscroll><i class="ti ti-chevrons-left"></i></a
			>
			<a
				class="generic-button zinc square"
				aria-label="Previous page"
				href="?page={Math.max(1, data.currentPage - 1)}&q={data.searchTerm}"
				class:disabled={data.currentPage === 1}
				aria-disabled={data.currentPage === 1}
				data-sveltekit-noscroll><i class="ti ti-chevron-left"></i></a
			>
			{#each Array.from({ length: pages }, (_, i) => i + 1).filter((i) => i >= data.currentPage - 3 && i <= data.currentPage + 5) as i}
				<a
					class="generic-button zinc square"
					href="?page={i}&q={data.searchTerm}"
					data-sveltekit-noscroll
					class:disabled={i === data.currentPage}
					aria-disabled={i === data.currentPage}>{i}</a
				>
			{/each}
			<a
				class="generic-button zinc square"
				aria-label="Next page"
				href="?page={Math.min(pages, data.currentPage + 1)}&q={data.searchTerm}"
				class:disabled={data.currentPage === pages}
				aria-disabled={data.currentPage === pages}
				data-sveltekit-noscroll><i class="ti ti-chevron-right"></i></a
			>
			<a
				class="generic-button zinc square"
				aria-label="Last Page"
				href="?page={pages}&q={data.searchTerm}"
				class:disabled={data.currentPage === pages}
				aria-disabled={data.currentPage === pages}
				data-sveltekit-noscroll><i class="ti ti-chevrons-right"></i></a
			>
		{/await}
	</div>
</section>
