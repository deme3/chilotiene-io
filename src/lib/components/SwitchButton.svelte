<script lang="ts">
	let {
		checked = $bindable(false),
		variant = undefined,
		disabled = false,
		label,
		width = undefined,
		height = 24,
		onchange = (checked: boolean) => {}
	}: {
		checked: boolean;
		variant?: 'danger' | 'orange';
		disabled?: boolean;
		label: string;
		width?: number;
		height?: number;
		onchange?: (checked: boolean) => void;
	} = $props();

	let autoWidth = $derived(width ?? height * 2 - 8);
	let danger = $derived(variant === 'danger');
	let orange = $derived(variant === 'orange');

	function toggleSwitch() {
		checked = !checked;
		onchange(checked);
	}
</script>

<span
	class="switch"
	class:checked
	class:disabled
	style:--var-width={autoWidth + 'px'}
	style:--var-height={height + 'px'}
>
	<button
		aria-label={label}
		type="button"
		class="slider"
		class:danger
		class:orange
		onclick={toggleSwitch}
		{disabled}
	></button>
</span>

<style lang="postcss">
	.switch {
		position: relative;
		display: inline-block;
		width: var(--var-width);
		height: var(--var-height);
		user-select: none;
		-webkit-user-select: none;
	}

	.switch.disabled {
		pointer-events: none;
		opacity: 0.6;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		@apply bg-zinc-600;
		-webkit-transition: 0.3s;
		transition: 0.3s;
		border-radius: var(--var-height);
	}

	.slider::before {
		position: absolute;
		content: 'NO';
		font-size: 7px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(var(--var-height) - 8px);
		width: calc(var(--var-height) - 8px);
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.3s;
		transition: 0.3s;
		border-radius: 50%;
	}

	.checked .slider::before {
		content: 'SI';
	}

	.checked .slider {
		@apply bg-unitn;
	}

	.checked .slider.orange {
		@apply bg-orange-700;
	}

	.checked .slider.danger {
		@apply bg-red-600;
	}

	.checked .slider:before {
		--var-bullet-size: calc(var(--var-height) - 8px);
		--var-absolute-x: calc(var(--var-width) - var(--var-bullet-size));

		-webkit-transform: translateX(calc(var(--var-absolute-x) - 8px));
		-ms-transform: translateX(calc(var(--var-absolute-x) - 8px));
		transform: translateX(calc(var(--var-absolute-x) - 8px));
	}
</style>
