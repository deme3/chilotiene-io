<script lang="ts">
	const {
		children,
		name
	}: {
		children: () => any;
		name: string;
	} = $props();
</script>

<div class="grid">
	<i
		class="ti ti-chevron-down pointer-events-none relative right-3 col-start-1 row-start-1 self-center justify-self-end text-xl text-zinc-400"
	></i>
	<select {name} class="text-input col-start-1 row-start-1 appearance-none bg-zinc-900">
		{@render children()}
	</select>
</div>
