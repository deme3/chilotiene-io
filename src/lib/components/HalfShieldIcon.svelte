<script lang="ts">
	let {
		size = 24,
		class: class_,
		onmouseenter,
		onmousemove,
		onclick
	}: {
		size?: number;
		class?: string;
		onmouseenter?: (e: MouseEvent) => void;
		onmousemove?: (e: MouseEvent) => void;
		onclick?: (e: MouseEvent) => void;
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="currentColor"
	class="icon icon-tabler icons-tabler-filled icon-tabler-shield-half {class_}"
	{onmouseenter}
	{onmousemove}
	{onclick}
	><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
		d="M 12.001 2 L 11.969 2.002 L 11.883 2.007 A 1 1 90 0 0 11.541 2.111 L 11.436 2.173 L 11.339 2.249 L 11.323 2.264 L 11.076 2.474 A 11 11 90 0 1 3.887 5.011 L 3.545 5.001 A 1 1 90 0 0 2.54 5.718 A 13 13 90 0 0 11.748 21.968 A 1 1 90 0 0 12.25 21.968 A 13 13 90 0 0 21.459 5.718 A 1 1 90 0 0 20.454 5.001 A 11 11 90 0 1 12.663 2.251 L 12.617 2.215 L 12.564 2.174 A 1 1 90 0 0 12.347 2.062 L 12.272 2.039 L 12.236 2.029 A 1 1 90 0 0 12.116 2.007 L 12.03 2.002 Z M 11.999 4.296 L 12.175 4.431 A 13 13 90 0 0 19.463 7.003 L 19.727 7.009 L 19.791 7.319 A 11 11 90 0 1 18.727 14.494 L 18.557 14.808 A 11 11 90 0 1 12.067 19.944 L 11.999 19.963 Z"
	/></svg
>
