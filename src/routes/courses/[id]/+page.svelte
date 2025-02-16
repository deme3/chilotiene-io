<script lang="ts">
	import { enhance } from '$app/forms';
	import Accordion from '$lib/components/Accordion.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import StarsSelect from '$lib/components/StarsSelect.svelte';
	import SwitchButton from '$lib/components/SwitchButton.svelte';
	import { UserRole } from '$lib/UserRole';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let bothProfessorAndHead = $derived(
		data.course.professors.filter((professor) =>
			data.course.adminHeads.map((adminHead) => adminHead.fullName).includes(professor.fullName)
		)
	);
	let uniqueProfessors = $derived(
		data.course.professors.filter(
			(professor, i) =>
				!data.course.adminHeads.map((adminHead) => adminHead.fullName).includes(professor.fullName)
		)
	);
	let uniqueAdminHeads = $derived(
		data.course.adminHeads.filter(
			(adminHead, i) =>
				!data.course.professors.map((professor) => professor.fullName).includes(adminHead.fullName)
		)
	);

	let reviewStars = $state(0);
	let reviewPreview = $state(0);

	let workloadShields = $state(0);
	let workloadPreview = $state(0);

	let authorNameInput: HTMLInputElement;
	let reviewImported = $state(false);
	let reviewAnonymous = $state(true);

	let allowSubmit = $derived(reviewStars >= 0.5 && workloadShields >= 0.5);

	let rating = $derived(
		data.course.reviews.length > 0
			? data.course.reviews.reduce((acc, review) => acc + review.quality, 0) /
					data.course.reviews.length
			: 0
	);
	let avgWorkload = $derived(
		data.course.workload.length > 0
			? data.course.workload.reduce((acc, w) => acc + w, 0) / data.course.workload.length
			: 0
	);
	let avgGrade = $derived(
		data.course.reviews.length > 0
			? data.course.reviews
					.filter((review) => !!review.grade)
					.reduce((acc, review) => acc + review.grade!, 0) /
					data.course.reviews.filter((review) => !!review.grade).length
			: 0
	);
</script>

<div id="page-header" class="flex min-h-16 flex-row items-center justify-between gap-4">
	<div>
		<h1 class="small-logo font-bold text-zinc-200/50" id="logo">Chi lo tiene...</h1>
		<h2 class="text-xl font-bold"><strong>{data.course.name['it']}</strong></h2>
		<h3 class="text-md text-zinc-500">
			{#each bothProfessorAndHead as professor, i}
				<i class="ti ti-user" title="Docente e titolare"
				></i>{' '}{professor.fullName}{#if i < bothProfessorAndHead.length - 1},{' '}
				{/if}
			{/each}{#if bothProfessorAndHead.length > 0 && (uniqueProfessors.length > 0 || uniqueAdminHeads.length > 0)}
				,{' '}
			{/if}
			{#each uniqueProfessors as professor, i}
				<i class="ti ti-school" title="Docente"
				></i>{' '}{professor.fullName}{#if i < uniqueProfessors.length - 1},{' '}
				{/if}
			{/each}{#if uniqueProfessors.length > 0 && uniqueAdminHeads.length > 0}
				,{' '}
			{/if}
			{#each uniqueAdminHeads as adminHead, i}
				<i class="ti ti-sitemap" title="Titolare"
				></i>{' '}{adminHead.fullName}{#if i < uniqueAdminHeads.length - 1},{' '}
				{/if}
			{/each}
			{#if bothProfessorAndHead.length == 0 && uniqueProfessors.length == 0 && uniqueAdminHeads.length == 0}
				<span
					class="cursor-help underline decoration-dotted"
					title="Non risulta un titolare per questo corso"
					><i class="ti ti-user-question"></i> Nessuno?</span
				>
			{/if}
			<!-- {data.course.professors[0]?.fullName ?? data.course.adminHeads[0]?.fullName} -->
		</h3>
	</div>
	<button class="circular-button" aria-label="Go Back" onclick={() => history.back()}>
		<i class="ti ti-arrow-left"></i>
	</button>
</div>

<section class="mt-4 flex flex-col gap-4">
	<Accordion title="Obiettivi formativi">
		<ol class="my-2 list-outside list-decimal pl-8 [&_li:not(:last-child)]:mb-4">
			<li>
				<strong>Conoscenza e capacità di comprensione</strong>
				<p>
					Conoscenza approfondita degli argomenti di base del calcolo di funzioni di una variabile
					come specificato dal programma del corso. Capacità di analizzare e di comprenderne le
					principali caratteristiche delle funzioni a valori reali differenziabili e integrabili.
					Capacità di applicare i metodi a problemi concreti e ad altri problemi scientifici o della
					industria.
				</p>
			</li>
			<li>
				<strong>Capacità di applicare conoscenza e comprensione</strong>
				<p>
					Capacità di ragionamento induttivo e deduttivo nell’affrontare problemi della natura
					dell'analisi delle funzioni. Capacità di impostare un problema e di risolverlo utilizzando
					opportuni strumenti dell'analisi.
				</p>
			</li>
			<li>
				<strong>Autonomia di giudizio</strong>
				<p>
					Capacità di sviluppare argomentazioni logiche e produrre dimostrazioni corrette. Capacità
					di individuare i metodi più appropriati per analizzare e interpretare problemi.
				</p>
			</li>
			<li>
				<strong>Abilità comunicative</strong>
				<p>Capacità di esporre argomenti dell'analisi matematica.</p>
			</li>
			<li>
				<strong>Capacità di apprendimento</strong>
				<p>
					Capacità di acquisire e gestire nuove informazioni a partire dagli enunciati e
					dimostrazioni sviluppate a lezioni.
				</p>
			</li>
		</ol>
	</Accordion>
	<Accordion title="Prerequisiti">
		Nozioni di base di calcolo con polinomi (divisione), basi di trigonometria etc. e tutto quanto
		viene compreso nelle nozioni di base necessarie per affrontare l'esame di ammissione al corso di
		laurea in informatica.
	</Accordion>
	<Accordion title="Contenuti del corso">
		1. Nozioni base di logica e insiemistica. 2. Numeri reali e complessi. 3. Funzioni e loro
		proprietà di base (iniettività, suriettività etc.) 4. Continuità 5. Limiti 6. Derivate 7.
		Integrazione di Riemann su intervalli chiusi e limitati 8. Integrazione di Riemann generalizzata
		(impropria). 9. Equazioni differenziali ordinarie
	</Accordion>
	<Accordion title="Recensioni ({data.course.reviews.length})" noncollapsible>
		{#snippet right()}
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
			<span class="mx-1"> &bullet; </span>
			<i class="ti ti-medal text-green-500/75"></i>{' '}
			{#if avgGrade > 0}
				<span class="ml-1 text-green-500/75">Media: {avgGrade.toFixed(1)}</span>
			{:else}
				<span class="text-green-500/75">ND</span>
			{/if}
		{/snippet}
		<form
			method="POST"
			class="flex flex-col"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();
					reviewStars = 0;
					workloadShields = 0;
				};
			}}
		>
			<div class="relative flex flex-col has-[input:focus]:z-30 lg:flex-row">
				<input
					bind:this={authorNameInput}
					name="author"
					type="text"
					class="text-input w-full rounded-b-none border-b-zinc-800 border-r-zinc-800 bg-zinc-900 focus:z-10 max-lg:border-b max-lg:border-r-0 lg:rounded-tr-none lg:border-r"
					oninput={(e) => {
						reviewAnonymous = !e.currentTarget.value;
					}}
					placeholder="Nome (opzionale)"
					disabled={!reviewAnonymous && !!data.user}
				/>

				<input
					name="grade"
					type="number"
					class="text-input w-full bg-zinc-900 focus:z-10 max-lg:rounded-none lg:w-1/4 lg:rounded-b-none lg:rounded-tl-none"
					placeholder="Voto (opz., lode: 31)"
					min="18"
					max="31"
				/>
			</div>
			<input name="quality" type="hidden" value={reviewStars} />
			<input name="workload" type="hidden" value={workloadShields} />

			<div class="relative z-20 rounded-b-md border-t border-zinc-800">
				<textarea
					name="review"
					class="text-input block w-full resize-none rounded-none bg-zinc-900 ring-unitn/55 focus:ring-2"
					placeholder="Scrivi una recensione..."
					rows="3"
					required
					onkeydown={(e) => {
						if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
							e.currentTarget?.form?.requestSubmit();
						}
					}}
				></textarea>
				<div
					class="relative -z-10 flex flex-col items-center justify-between rounded-b-md border-t border-zinc-800 bg-zinc-900 p-2 md:flex-row"
				>
					<div class="flex cursor-default items-center gap-2 px-2">
						<div class="flex flex-col">
							<div class="text-sm font-semibold text-yellow-400">Qualità</div>
							<div class="flex items-center gap-2">
								<StarsSelect bind:fixedValue={reviewStars} bind:safeValue={reviewPreview} />
								<div class="mr-8 font-semibold text-yellow-400">{reviewPreview}</div>
							</div>
						</div>
						<div class="flex flex-col">
							<div class="text-sm font-semibold text-red-500">Difficoltà</div>
							<div class="flex items-center gap-2">
								<StarsSelect
									bind:fixedValue={workloadShields}
									bind:safeValue={workloadPreview}
									iconZero="ti-shield"
									iconHalf="component:HalfShieldIcon"
									iconFull="ti-shield-filled"
									color="red"
								/>
								<div class="font-semibold text-red-500/75">{workloadPreview}</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col items-stretch gap-4 self-stretch lg:flex-row lg:items-center">
						{#if data.user && data.user.role === UserRole.Admin}
							<label
								class="flex items-center gap-2 self-center text-sm text-orange-600 md:self-auto"
							>
								<input type="hidden" name="imported" value={reviewImported ? 'on' : 'off'} />
								<SwitchButton
									variant="orange"
									label="Importata dal web"
									bind:checked={reviewImported}
								/>
								<span>Importata dal web</span>
							</label>
						{/if}
						<label class="flex items-center gap-2 self-center text-sm text-unitn md:self-auto">
							<input type="hidden" name="anonymous" value={reviewAnonymous ? 'on' : 'off'} />
							<SwitchButton
								label="Anonimo"
								bind:checked={reviewAnonymous}
								onchange={() => {
									if (reviewAnonymous && authorNameInput) authorNameInput.value = '';
									else if (data.user?.fullName && !reviewAnonymous)
										authorNameInput.value = data.user.fullName;
								}}
							/>
							<span>Anonimo</span>
						</label>
						<button
							class="pointer-events-auto rounded-md bg-unitn px-6 py-2 text-white disabled:opacity-50"
							type="submit"
							disabled={!allowSubmit}>Invia</button
						>
					</div>
				</div>
			</div>
		</form>
		<div class="mt-3 grid gap-3">
			{#each data.course.reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as review}
				<ReviewCard
					author={review.authorName}
					authorId={review.authorId?.toString()}
					text={review.text}
					date={review.createdAt}
					rating={review.quality}
					workload={review.workload}
					grade={review.grade}
					sourced={review.imported}
					anonymousVerified={review.anonymousVerified}
				/>
			{/each}
		</div>
	</Accordion>
</section>
