<script lang="ts">
	import { onMount } from 'svelte';

	export let breakpoint: `${number}rem`;
	$: breakpointValue = Number.parseInt(breakpoint.replace('rem', ''));
	let rootFontSize: number = 16;

	let innerWidth: number;

	onMount(() => {
		rootFontSize = Number.parseInt(
			getComputedStyle(document.documentElement).fontSize.replace('px', ''),
		);
	});
</script>

<svelte:window bind:innerWidth />

{#if innerWidth >= breakpointValue * rootFontSize}
	<slot name="gt" />
{:else}
	<slot name="lt" />
{/if}
