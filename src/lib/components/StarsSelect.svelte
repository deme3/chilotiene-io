<script lang="ts">
	import HalfShieldIcon from './HalfShieldIcon.svelte';

	let {
		fixedValue = $bindable(),
		hoverValue = $bindable(),
		safeValue = $bindable(),
		iconZero = 'ti-star',
		iconHalf = 'ti-star-half-filled',
		iconFull = 'ti-star-filled',
		color = 'yellow',
		rotateHalf = false
	}: {
		fixedValue?: number;
		hoverValue?: number;
		safeValue?: number;
		iconZero?: string;
		iconHalf?: string | 'component:HalfShieldIcon';
		iconFull?: string;
		color?: 'red' | 'yellow';
		rotateHalf?: boolean;
	} = $props();

	const starSize = 28;
	let useHoverValue = $state(false);
	let safeHoverValue = $derived(hoverValue ?? 0);
	let safeFixedValue = $derived(fixedValue ?? 0);
	let valueInUse = $derived(useHoverValue ? safeHoverValue : safeFixedValue);

	let tailwindColorClass = $derived(
		color === 'red' ? 'text-red-500/75' : color === 'yellow' ? 'text-yellow-400' : 'text-yellow-400'
	);
	let rotationClass = $derived(rotateHalf ? '-scale-x-100 scale-y-100' : '');

	let componentIconHalfName = $derived(
		iconHalf.startsWith('component:') ? iconHalf.split(':')[1] : ''
	);
	let ActualComponent = $derived(
		componentIconHalfName === 'HalfShieldIcon' ? HalfShieldIcon : null
	);

	function starMouseEnter(i: number, e: MouseEvent) {
		// check if mouse is >= half of star or not to assign the correct value
		if (!e.currentTarget) return;
		hoverValue = i + (e.offsetX / starSize <= 0.25 ? 0 : e.offsetX / starSize <= 0.5 ? 0.5 : 1);
	}

	function starMouseMove(i: number, e: MouseEvent) {
		// check if mouse is >= half of star or not to assign the correct value
		if (!e.currentTarget) return;
		if (rotateHalf) console.log(e.offsetX);
		hoverValue = i + (e.offsetX / starSize <= 0.25 ? 0 : e.offsetX / starSize <= 0.5 ? 0.5 : 1);
	}

	function starClick(i: number, e: MouseEvent) {
		fixedValue = i + (e.offsetX / starSize <= 0.25 ? 0 : e.offsetX / starSize <= 0.5 ? 0.5 : 1);
	}

	$effect(() => {
		safeValue = valueInUse;
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmouseenter={() => (useHoverValue = true)}
	onmouseleave={() => (useHoverValue = false)}
	class="flex gap-1"
>
	{#each Array.from({ length: 5 }, (_, i) => i) as i}
		{#if iconHalf.startsWith('component:') && i + 1 - 0.5 == valueInUse}
			<ActualComponent
				size={28}
				class="text-red-500/75"
				onmouseenter={starMouseEnter.bind(null, i)}
				onmousemove={starMouseMove.bind(null, i)}
				onclick={starClick.bind(null, i)}
			/>
		{:else}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<i
				class="ti {tailwindColorClass} {valueInUse < i + 1 ? iconZero : ''} {i + 1 - 0.5 ==
					valueInUse && !iconHalf.startsWith('component:')
					? iconHalf
					: ''} {valueInUse >= i + 1 ? iconFull : ''} {i + 1 - 0.5 == valueInUse && rotateHalf
					? rotationClass
					: ''}"
				style:font-size={`${starSize}px`}
				onmouseenter={starMouseEnter.bind(null, i)}
				onmousemove={starMouseMove.bind(null, i)}
				onclick={starClick.bind(null, i)}
			></i>{' '}
		{/if}
	{/each}
</div>
