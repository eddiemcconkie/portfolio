<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { css } from '../styles/vars';
	import pic from './pic-400x400.webp';
	import PuzzleDialog from './PuzzleDialog.svelte';

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	let showGame: () => void;

	let easing = quintOut;
</script>

<div class="layout">
	<header>
		<div
			class="header-content | container | flex wrap justify-center align-center"
			data-width="wide"
		>
			<div class="header-text | font-white">
				<h1 class="step-4">EDDIE McCONKIE</h1>
				<p class="font-bold step-1">software engineer</p>
			</div>
			<div class="img-container | stack">
				<img src={pic} alt="Eddie McConkie" width="300" draggable="false" />
				{#if mounted}
					<div class="button-container">
						<Button
							border
							class="step-1 font-bold"
							on:click={showGame}
							--border-radius={css.space_xs}
						>
							click!
						</Button>
					</div>
					<span class="prompt" in:fly={{ delay: 300, duration: 800, y: -50, easing }}>
						up for a challenge ?
					</span>
				{/if}
			</div>
		</div>
	</header>
	<div class="slide-out">
		<div class="container | flex justify-end align-end" data-width="wide">
			<div class="font-white font-normal step-0">
				<p class="font-medium step-1">Hey, I'm Eddie!</p>
				<p>
					I'm a full-stack software engineer. I love web development and building apps! Keep
					scrolling and check out some of the stuff I've worked on!
				</p>
			</div>
		</div>
	</div>
	<div class="slide-out-filler" />
</div>

<PuzzleDialog bind:showGame />

<style>
	.layout {
		position: relative;
		display: grid;
		grid-template-rows: repeat(2, auto);
	}
	.layout > * {
		grid-column: 1 / -1;
	}
	header {
		grid-row: 1 / 2;
		background-color: var(--green);
		padding-block-end: 10vw;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10vw), 0 100%);
		position: relative;
		overflow: hidden;
		z-index: 1;
	}
	/* Background texture */
	header::before {
		content: '';
		position: absolute;
		inset: 0;
		background-size: cover;
		background-blend-mode: multiply;
		background-color: var(--green);
		background-image: url('../assets/header-texture.webp');
		filter: blur(8px);
		scale: 1.1; /* So edges aren't blurry */
		z-index: -1;
	}
	.header-content {
		margin-block-end: var(--space-l-3xs);
		padding: var(--space-l-3xl);
		gap: var(--space-l-3xl) var(--space-3xl);
	}
	.header-text {
		flex: 1000 0 0;
	}
	h1 {
		text-shadow: 0 0.1em var(--black);
	}
	.img-container {
		--img-br: var(--space-m);
		--easing: cubic-bezier(0.175, 0.885, 0.32, 1.275);
		max-width: 100%;
		width: 300px;
		rotate: 5deg;
		border-radius: var(--img-br);
		outline-color: transparent;
		outline-width: var(--space-3xs);
		outline-style: solid;
		outline-offset: 0;
		transition: outline-offset 400ms var(--easing);
	}
	.img-container:hover {
		outline-color: var(--yellow);
		outline-offset: var(--space-xs);
	}
	img {
		background: var(--black);
		border: var(--space-2xs) solid var(--black);
		border-radius: var(--img-br);
		width: 100%;
		aspect-ratio: 1 / 1;
	}
	.img-container > .button-container {
		justify-self: center;
		align-self: end;
		margin-block-end: var(--space-s);
		font-weight: var(--font-bold);
	}
	.img-container > .prompt {
		justify-self: center;
		align-self: end;
		font-weight: var(--font-medium);
		translate: 0 var(--space-l);
		transition: translate 400ms var(--easing);
		pointer-events: none;
	}
	.img-container:hover > .prompt {
		translate: 0 var(--space-xl);
	}
	.slide-out {
		grid-row: 2 / 3;
		top: 0;
		background-color: var(--black);
		padding-inline: var(--space-s-3xl);
		padding-block-end: calc(10vw);
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 80% 100%, 0 calc(100% - 10vw));
	}
	.slide-out p {
		width: 100%;
		max-width: 40ch;
		margin-block: var(--space-l-3xs);
	}
	.slide-out-filler {
		grid-row: 1 / 2;
		background-color: var(--black);
	}
</style>
