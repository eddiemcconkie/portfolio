<script lang="ts">
	import MediaQuery from '$lib/MediaQuery.svelte';
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

	onMount(() => {
		calculateBoxesDistanceFromCenter();
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
				When I was a kid, my brother and I had this program on our computer called GameMaker. You
				built games by combining different action and logic blocks. We built so many games with it!
				I remember creating my own "Legend of Zelda" since that was my favorite video game (still
				is, btw). I didn't even think of it as programming at the time, I just loved being able to
				build something cool and share it with people!
			</p>
			<p>
				It wasn't long before I got into real coding. In middle school I discovered the Codea app
				for iPad that lets you program games and simulations with Lua. I fell in love with
				programming all over again! I would build games and play them at lunch with my friends, and
				I was always looking for ways to use my coding skills to help me out with my homework.
			</p>
			<p>
				By the time I got to college I had learned some basic Python and Java. Then I took my first
				web development class, and after building several websites I was hooked! Later I heard about
				React, and there wasn't a class for it at my university, so I started teaching myself, and
				it opened this huge door to all the possibilities for developing web apps! Later I picked up
				Svelte, which instantly became my favorite framework, and I took several backend classes so
				that I could build full-stack apps. Learning software engineering and web development has
				been an awesome journey, and I'm always looking for new tools and technology to build
				projects with!
			</p>
		</div>

		<MediaQuery breakpoint="45rem">
			<div slot="gt" class="boxes" bind:this={boxes}>
				<Canvas>
					<Boxes {distanceFromCenter} />
				</Canvas>
			</div>
		</MediaQuery>
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
		display: flex;
		grid-gap: var(--space-m-l);
		padding: var(--space-xs-s);
		margin-block: var(--space-2xl-3xl);
	}
	section[aria-labelledby='about'] > :nth-child(1) {
		flex: 1;
	}
	section[aria-labelledby='about'] > :nth-child(2) {
		flex: 0;
		width: 200px;
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
		position: relative;
		-webkit-mask-image: var(--mask-gradient);
		mask-image: var(--mask-gradient);
		mask-mode: alpha;
	}
</style>
