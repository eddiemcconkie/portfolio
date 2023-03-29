<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import SliderPuzzle from './SliderPuzzle.svelte';

	import pic from './pic-500x500.jpg';
	import Close from '$lib/icons/Close.svelte';
	import Button from '$lib/Button.svelte';

	let dialog: HTMLDialogElement;

	export const showGame = () => {
		dialog.showModal();
		open = true;
	};

	// Binding to the "open" attribute on dialogs isn't currently supported
	let open = false;
</script>

<dialog
	bind:this={dialog}
	class="container | font-white"
	data-width="thin"
	on:close={() => {
		open = false;
	}}
>
	{#if open}
		<div transition:fly={{ duration: 400, y: 200, easing: quintOut, opacity: 0.5 }}>
			<div class="flex justify-end">
				<Button size="compact" class="step-0 font-bold" on:click={() => dialog.close()}>
					<Close />
				</Button>
			</div>
			<div class="puzzle-wrapper | flex justify-center">
				<SliderPuzzle {pic} />
			</div>
		</div>
	{/if}
</dialog>

<style>
	dialog {
		border: 0;
		background-color: transparent;
		margin-block-start: var(--space-l-3xl);
		margin-block-end: calc(var(--space-3xl) * 1);
		padding: 0;
		width: 100%;
		height: 100%;
		overflow-y: hidden;
	}
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0.5);
	}
	dialog > * {
		--br: var(--space-l);
		background-color: var(--black);
		border-radius: var(--br) var(--br) 0 0;
		width: 100%;
		height: 100%;
		padding: var(--space-l);
	}
	.puzzle-wrapper {
		margin-block-start: var(--space-xl);
	}
</style>
