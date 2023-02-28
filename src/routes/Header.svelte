<script>
	import pic from './pic-500x500.jpg';
</script>

<div class="layout">
	<header>
		<!-- <div class="header-main | flex wrap space-between gap-3xl"> -->
		<div class="header-main | container | flex wrap space-between gap-3xl" data-width="wide">
			<div class="font-white">
				<h1 class="step-4">EDDIE McCONKIE</h1>
				<p class="font-bold step-1">software engineer</p>
			</div>
			<div>
				<img src={pic} alt="Eddie McConkie" width="300" height="300" />
			</div>
		</div>
	</header>
	<div class="slide-out | flex justify-end align-end">
		<p class="font-white font-normal step-0">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque consectetur, itaque autem
			pariatur libero provident laboriosam nobis quia aliquam earum doloremque neque ad inventore
			nemo iste! Inventore aut sed nemo provident illo, rem ducimus blanditiis voluptas, temporibus
			asperiores, ex esse error quae ad alias facilis repellat labore earum assumenda incidunt!
		</p>
	</div>
</div>

<style>
	.layout {
		position: relative;
		display: grid;
		grid-template-rows: repeat(2, auto) 60vh;
	}
	header {
		grid-area: 1 / 1 / 2 / 2;
		background-color: var(--green);
		padding-block-end: 10vw;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10vw), 0 100%);
	}
	.header-main {
		/* padding: var(--space-3xl); */
		padding: var(--space-l-3xl);
	}
	h1 {
		max-width: min-content;
		text-shadow: 0 var(--space-3xs-2xs) var(--black);
	}
	img {
		border: var(--space-2xs) solid var(--black);
		border-radius: var(--space-m);
		rotate: 5deg;
	}
	.slide-out {
		grid-area: 1 / 1 / 2 / 2;
		position: sticky;
		z-index: -1;
		top: 0;
		background-color: var(--black);
		/* padding: var(--space-3xl); */
		padding: var(--space-l-3xl);
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 80% 100%, 0 calc(100% - 10vw));
	}
	.slide-out > p {
		width: 100%;
		max-width: 40ch;
		margin-block-end: var(--space-l);
	}
</style>
