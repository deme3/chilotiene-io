<div class="rounded-lg bg-zinc-800 p-4 shadow-lg hover:bg-zinc-700 hover:transition-colors">
	<div
		class="flex animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite] cursor-default select-none items-center justify-between gap-8"
	>
		<div class="flex-1">
			<h3 class="mb-1 text-xl font-bold">
				<span class="rounded-md bg-zinc-500 text-zinc-500">Course name here</span>
				<span class="rounded-md bg-zinc-600 text-xs text-zinc-600">0 CFU</span>
			</h3>
			<p class="mb-1 h-4 w-full rounded-md bg-zinc-500/75 text-sm"></p>
			<p class="h-4 w-3/4 rounded-md bg-zinc-500/75 text-sm"></p>
			<div class="mt-2 text-sm">
				<span class="rounded-md bg-yellow-300">
					{#each Array.from({ length: 5 }, (_, i) => i)}
						<i class="ti ti-star-filled text-yellow-300"></i>{' '}
					{/each}
					<span class="ml-1 text-yellow-300">0</span>
				</span>
				<span class="mx-1"> &bullet; </span>
				<span class="rounded-md bg-red-500">
					{#each Array.from({ length: 5 }, (_, i) => i)}
						<i class="ti ti-shield-filled text-red-500/75"></i>{' '}
					{/each}
					<span class="ml-1 text-red-500">5</span>
				</span>
			</div>
		</div>
		<div class="min-w-12 max-w-12 text-center">
			<div style:opacity="0">
				<i class="ti ti-arrow-right text-3xl"></i>
			</div>
		</div>
	</div>
</div>
