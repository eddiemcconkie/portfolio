<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { onMount } from 'svelte';
	import Boxes from './Boxes.svelte';
	import Footer from './Footer.svelte';

	import Header from './Header.svelte';
	import { links } from './project-links';
	import ProjectLink from './ProjectLink.svelte';

	let scrollY: number;
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

<svelte:window bind:scrollY bind:innerHeight on:scroll={calculateBoxesDistanceFromCenter} />

<Header />

<main>
	<section aria-labelledby="projects">
		<h2 id="projects" class="step-2 font-medium">Projects</h2>
		<div class="project-links">
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
		<div>
			<h2 id="about" class="step-2 font-medium">A meaningful subtitle</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quod fuga non nisi delectus
				praesentium numquam exercitationem reiciendis perferendis nostrum atque eligendi
				necessitatibus odio eum possimus, ipsa dolor veniam. Dolor autem sequi corrupti distinctio
				voluptatum consequatur dolorem, maiores quibusdam consequuntur, quos eos vero quis facilis
				iusto repellendus error itaque esse veritatis aut rem exercitationem qui, beatae nesciunt?
				Sequi, atque sint.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis obcaecati eveniet recusandae
				animi perferendis odit aut ad adipisci fugiat quaerat. Maxime, mollitia deleniti? Provident
				minus doloribus quibusdam quisquam dolore, earum recusandae reiciendis delectus odit vitae
				rerum, quasi ab distinctio, adipisci autem perspiciatis eum. Sint a quas autem, maxime
				facere delectus magnam voluptatem aliquam accusamus pariatur dignissimos excepturi iste non
				incidunt nemo, cumque voluptatum quasi odit ea illo assumenda sed? Repudiandae unde illo
				iste inventore non quas voluptate vel necessitatibus animi.
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa amet iure nam, ex id
				recusandae voluptatem repellendus nemo, ratione ad sint veniam repudiandae! Debitis earum
				totam labore doloremque culpa, perferendis natus laboriosam repellat ea laborum, enim neque
				nobis eveniet fuga. Tenetur iste, ratione incidunt eaque cum unde eum delectus fugiat
				maiores tempore nihil ab vero praesentium ut maxime cumque minus sint beatae itaque amet
				molestiae nisi voluptates. Nihil, quia sint!
			</p>
		</div>

		<div class="boxes" bind:this={boxes}>
			<Canvas>
				<Boxes {distanceFromCenter} />
			</Canvas>
		</div>
	</section>
</main>

<Footer />

<style>
	:global(body) {
		background-color: var(--mint);
	}
	.project-links {
		display: grid;
		justify-content: center;
		/* grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); */
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 320px));
		grid-gap: var(--space-m-l);
		padding: var(--space-xs-s);
	}

	section[aria-labelledby='about'] {
		display: grid;
		grid-template-columns: 1fr 200px;
		grid-gap: var(--space-m-l);
		padding: var(--space-xs-s);
	}

	.boxes {
		position: relative;
	}
	.boxes::after {
		content: '';
		position: absolute;
		pointer-events: none;
		inset: 0;
		--fade: 100px;
		background: linear-gradient(
			0deg,
			var(--mint) 0,
			transparent var(--fade),
			transparent calc(100% - var(--fade)),
			var(--mint) 100%
		);
	}
</style>
