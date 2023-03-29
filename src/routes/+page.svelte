<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { onMount } from 'svelte';
	import Boxes from './Boxes.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import { links } from './project-links';
	import ProjectLink from './ProjectLink.svelte';

	let innerHeight: number;
	let boxes: HTMLDivElement;
	let distanceFromCenter = 0;

	const calculateBoxesDistanceFromCenter = () => {
		const { top, bottom, height } = boxes.getBoundingClientRect();
		distanceFromCenter = ((top + bottom) / 2 - innerHeight / 2) / height;
	};

	let mounted = false;

	onMount(async () => {
		setTimeout(() => {
			calculateBoxesDistanceFromCenter();
			mounted = true;
		}, 1);
	});
</script>

<svelte:head>
	<title>Eddie McConkie - Portfolio</title>
</svelte:head>
<svelte:window bind:innerHeight on:scroll={calculateBoxesDistanceFromCenter} />

<Header />

<main>
	<section aria-labelledby="projects" class="flow">
		<h2 id="projects" class="step-3 font-medium">projects</h2>
		<div class="project-link-group">
			{#each links as link, i}
				<ProjectLink slug={link.slug} green={i % 2 == 1}>
					<svelte:fragment slot="title">
						{link.title}
					</svelte:fragment>
					<svelte:fragment slot="description">
						{link.description}
					</svelte:fragment>
				</ProjectLink>
			{/each}
		</div>
	</section>

	<section aria-labelledby="about" class="container">
		<div class="flow">
			<h2 id="about" class="step-3 font-medium">a little about me</h2>
			<p>
				When I was a kid, my brother and I had this program on our computer called GameMaker. It was
				kind of like Scratch, but for big kids, that let you use different building blocks to create
				the logic for your game. And we built so many games! I remember creating my own "Legend of
				Zelda" since that was my favorite video game (still is, btw). I didn't even think of it as
				programming at the time, I just loved being able to build something cool and share it with
				people!
			</p>
			<p>
				It wasn't long before I got into real coding. In middle school I discovered an iPad app
				called Codea that allowed you to program games and simulations with Lua. I fell in love with
				programming all over again! I would build games and play them at lunch with my friends, and
				I was able to use my coding skills to help with other projects in school.
			</p>
			<!-- <p>Though reluctant at first, I grew to love web development!</p> -->
		</div>

		<div class="boxes" bind:this={boxes}>
			{#if mounted}
				<Canvas>
					<Boxes {distanceFromCenter} />
				</Canvas>
			{/if}
		</div>
	</section>
</main>

<Footer />

<style>
	:global(body) {
		background-color: var(--mint);
	}
	section[aria-labelledby='projects'] {
		margin-block-start: var(--space-2xl-3xl);
	}
	section[aria-labelledby='projects'] h2 {
		text-align: center;
	}

	section[aria-labelledby='about'] {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: var(--space-m-l);
		padding: var(--space-xs-s);
		margin-block: var(--space-2xl-3xl);
	}

	.boxes {
		--fade: 100px;
		--mask-gradient: linear-gradient(
			0deg,
			transparent 0,
			black var(--fade),
			black calc(100% - var(--fade)),
			transparent 100%
		);
		display: none;
		position: relative;
		-webkit-mask-image: var(--mask-gradient);
		mask-image: var(--mask-gradient);
		mask-mode: alpha;
	}

	@media (min-width: 45rem) {
		section[aria-labelledby='about'] {
			grid-template-columns: 1fr 25%;
		}
		.boxes {
			display: block;
		}
	}
</style>
