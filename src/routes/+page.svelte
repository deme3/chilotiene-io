<script>
	import { goto } from '$app/navigation';
	import CourseCard from '$lib/components/CourseCard.svelte';
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
		<CourseCard
			id="1"
			name="Analisi matematica I"
			description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, eos id. Sint placeat culpa velit laboriosam..."
			reviews={[1, 2, 3, 2, 1]}
			workload={[5, 5, 5, 5, 4]}
			credits={12}
		/>
		<CourseCard
			name="Algoritmi e Strutture Dati"
			description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, eos id. Sint placeat culpa velit laboriosam..."
			reviews={[5, 5, 5, 5, 4]}
			workload={[5, 3, 3, 2, 4]}
			credits={12}
		/>
		<CourseCard
			name="Fisica I"
			description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, eos id. Sint placeat culpa velit laboriosam..."
			reviews={[3, 4, 3, 4, 3]}
			workload={[5, 5, 5, 5, 5]}
			credits={6}
		/>
		<CourseCard
			name="Inglese B1"
			description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, eos id. Sint placeat culpa velit laboriosam..."
			reviews={[5, 5, 5, 5, 5]}
			workload={[0, 1, 1, 0, 0]}
			credits={3}
		/>
		<CourseCard
			name="Programmazione I"
			description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, eos id. Sint placeat culpa velit laboriosam..."
			reviews={[4, 4, 2, 4, 4]}
			workload={[5, 4, 2, 3, 5]}
			credits={12}
		/>
	</div>
</section>
