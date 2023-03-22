<script lang="ts">
	export let slug: string;
	export let green = false;
</script>

<div class="layout | shadow mint high" data-state={green ? 'green' : ''}>
	<p class="step-1 font-bold">
		<slot name="title" />
	</p>
	<p class="step-0 font-normal">
		<slot name="description" />
	</p>
	<a href="/{slug}" class="step-0">more &rarr;</a>
</div>

<style>
	.layout {
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: var(--space-xs);
		color: var(--black);
		background-color: white;
		padding: var(--space-m-l);
		border-radius: var(--space-m-l);
	}
	.layout[data-state='green'] {
		background-color: var(--green);
	}
	a {
		justify-self: end;
	}
</style>
