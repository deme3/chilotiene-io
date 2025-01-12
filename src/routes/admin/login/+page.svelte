<script>
	import Accordion from '$lib/components/Accordion.svelte';
</script>

<section>
	<h1 class="text-center text-3xl font-bold">chilotiene.io</h1>
	<h2 class="mb-2 text-center text-sm text-zinc-700">Admin Functions</h2>
	<Accordion title="Login" noncollapsible>
		<form class="flex flex-col gap-4">
			<label>
				<span class="text-sm">Username</span>
				<input type="text" class="text-input bg-zinc-900" />
			</label>
			<label>
				<span class="text-sm">Password</span>
				<input type="password" class="text-input bg-zinc-900" />
			</label>
			<button type="submit" class="generic-button">Login</button>
		</form>
	</Accordion>
</section>

<style>
	:global(body, html) {
		@apply h-full;
	}

	:global(main) {
		@apply flex h-full w-96 items-center justify-center;
	}
</style>
