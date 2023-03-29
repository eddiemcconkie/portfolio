<!-- 
  @component
  Custom props \
  **--border-radius** *(default 0.75em)* \
  **--padding-inline** *(default 2.5em)* \
  **--font-weight** *(default --font-medium)*
 -->
<script lang="ts">
	import ExternalLink from '$lib/icons/ExternalLink.svelte';

	type Color = 'yellow';
	export let color: Color = 'yellow';

	type Size = 'full' | 'compact' | 'normal';
	export let size: Size = 'normal';

	export let border = false;
	export let href = '';
	export let external = false;
	let linkAttributes =
		href && external
			? {
					target: '_blank',
					rel: 'noreferrer',
			  }
			: {};
</script>

{#if href}
	<a
		data-color={color}
		data-size={size}
		class:border
		on:click
		{href}
		{...linkAttributes}
		{...$$restProps}
	>
		<slot />
		{#if external}<ExternalLink />{/if}
	</a>
{:else}
	<button data-color={color} data-size={size} class:border on:click {...$$restProps}>
		<slot />
	</button>
{/if}

<style>
	@layer block {
		:is(button, a) {
			border: 0;
			border-radius: var(--border-radius, 0.75em);
			padding-block: 0.2em;
			padding-inline: var(--padding-inline, 2.5em);
			line-height: 1.5;
			cursor: pointer;
			text-decoration: none;
			font-weight: var(--font-weight, var(--font-medium));
			display: inline-flex;
			align-items: center;
			gap: 0.3em;
			transition: scale 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.border {
			border: 0.15em solid currentColor;
		}

		:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		:is(:hover, :focus-visible):not(:disabled) {
			scale: 1.05;
		}
		:active:not(:disabled) {
			scale: 0.95;
			transition: scale 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
		}

		/* Icons shouldn't shrink */
		:global(:is(button, a) svg) {
			flex: 0 0 auto;
		}

		/* SIZE */
		[data-size='compact'] {
			padding-inline: 0.2em;
		}

		[data-size='full'] {
			width: 100%;
			justify-content: center;
		}

		/* COLOR */
		[data-color='yellow'] {
			background-color: var(--yellow);
			color: var(--black);
		}
	}
</style>
