<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Footer from '../Footer.svelte';
	import ProjectLink from '../ProjectLink.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.project.title} | Eddie McConkie - Portfolio</title>
</svelte:head>

<header class="header-bar | font-white">
	<!-- <h1 class="step-1">EDDIE McCONKIE</h1> -->
	<a href="/" class="step-1 font-medium">EDDIE McCONKIE</a>
</header>
<section class="header-main | flow | font-white flex column align-center" aria-labelledby="intro">
	<h1 id="intro" class="container | step-3 font-bold">{data.project.title}</h1>
	<p class="container | step-1">
		{data.project.headerText}
	</p>
</section>

<!-- <Button>hey</Button> -->
<!-- <Button href="/urmom">hey</Button> -->

<div class="flow">
	{#if data.project.screenshot}
		<div class="screenshot | container stack">
			<img src={data.project.screenshot} alt="" />
			<!-- <button class="demo-button | step-1 font-bold" data-color="yellow">try it out!</button> -->
			<div class="demo-button">
				<Button
					border
					class="step-1 font-bold"
					href="https://code-journal.vercel.app"
					external
					--padding-inline="var(--space-l-xl)"
				>
					try it out!
				</Button>
			</div>
		</div>
	{/if}
	{#if data.project.githubLink}
		<p class="flex justify-center">
			<a href={data.project.githubLink} target="_blank" rel="noreferrer">
				check out the code on GitHub
			</a>
		</p>
	{/if}

	{#each data.project.bodyText as paragraph}
		<p class="container" data-width="thin">{paragraph}</p>
	{/each}

	{#if data.otherProjects.length > 0}
		<section aria-labelledby="projects" class="flow">
			<h2 id="projects" class="step-2 font-medium">check out my other projects!</h2>
			<div class="project-link-group">
				{#each data.otherProjects as link, i}
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
	{/if}
</div>

<Footer />

<style>
	:global(body) {
		background-image: linear-gradient(to bottom, white, var(--mint));
	}
	.header-bar {
		background-color: var(--green);
		padding: var(--space-3xs) var(--space-s-l);
		position: sticky;
		top: 0;
		z-index: 1;
		box-shadow: 0 0 3px var(--black);
	}
	header > a {
		text-decoration: none;
		color: white;
		text-shadow: 0 0.1em var(--black);
		line-height: 1;
	}
	.header-main {
		--clip-inset: 8vw;
		background-color: var(--black);
		padding-block-start: var(--space-l-xl);
		padding-block-end: var(--clip-inset);
		clip-path: polygon(
			0 0,
			100% 0,
			100% calc(100% - var(--clip-inset)),
			50% 100%,
			0 calc(100% - var(--clip-inset))
		);
	}
	.header-main > p {
		margin-block-end: var(--space-l);
	}

	.screenshot {
		margin-block-start: var(--space-xl);
		aspect-ratio: 5 / 3;
	}
	.screenshot > img {
		border: var(--space-3xs) solid var(--black);
		border-radius: var(--space-s);
		background: var(--black);
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}

	.demo-button {
		align-self: end;
		justify-self: end;
		margin-block-end: var(--space-s);
		margin-inline: var(--space-s);
		/* border: var(--space-3xs) solid var(--black); */
		/* font-weight: var(--font-bold); */
		/* padding-inline: var(--space-xl); */
		/* padding-block-start: var(--space-3xs); */
	}

	section[aria-labelledby='projects'] {
		margin-block: var(--space-2xl-3xl);
	}
	section[aria-labelledby='projects'] h2 {
		text-align: center;
	}
</style>
