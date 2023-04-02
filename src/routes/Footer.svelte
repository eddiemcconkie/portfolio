<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import GitHub from '$lib/icons/GitHub.svelte';
	import Linkedin from '$lib/icons/Linkedin.svelte';
	import Spinner from '$lib/icons/Spinner.svelte';
	import { css } from '../styles/vars';

	let sendingEmail = false;
</script>

<footer>
	<div class="container">
		<h2 class="step-2 font-bold">let's chat!</h2>
		<div class="footer-main-content">
			<form
				method="POST"
				use:enhance={() => {
					sendingEmail = true;
					return async ({ update }) => {
						await update();
						sendingEmail = false;
					};
				}}
			>
				<label for="name">
					<span class="step--1 font-bold">name <span class="required">*</span></span>
					<input type="text" id="name" name="name" required value={$page.form?.name ?? ''} />
				</label>

				<label for="email">
					<span class="step--1 font-bold">
						email <span class="required">*</span>
						{#if $page.form?.invalidEmail}
							<em class="invalid">invalid email</em>
						{/if}
					</span>
					<input type="email" id="email" name="email" required value={$page.form?.email ?? ''} />
				</label>

				<label for="message">
					<span class="step--1 font-bold">write something, if you like</span>
					<textarea name="message" id="message" value={$page.form?.message ?? ''} />
				</label>

				<div class="submit-button">
					<Button type="submit" disabled={sendingEmail} size="full" --border-radius={css.space_2xs}>
						{#if sendingEmail}
							sending
							<Spinner />
						{:else}
							send it
						{/if}
					</Button>
				</div>
				<p class="submit-message">
					{#if $page.form?.success}
						<p>thanks! I'll get back to you soon</p>
					{:else if $page.form?.rejected}
						<p>sorry, something went wrong...</p>
					{/if}
				</p>
			</form>
			<div class="social-links">
				<a
					href="https://github.com/eddiemcconkie?tab=repositories"
					aria-label="GitHub repos"
					target="_blank"
					rel="noreferrer"
					class="font-white step-3"
				>
					<GitHub />
				</a>
				<a
					href="https://www.linkedin.com/in/edward-mcconkie/"
					aria-label="Linkedin profile"
					target="_blank"
					rel="noreferrer"
					class="font-white step-3"
				>
					<Linkedin />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--black);
		color: white;
		padding-block-start: 15vw;
		padding-block-end: 10vw;
		clip-path: polygon(0 2vw, 20% 0, 100% 10vw, 100% 100%, 0 100%);
	}
	footer > * > * {
		max-width: 25rem;
		margin-inline: auto;
	}
	h2 {
		margin-block-end: var(--space-m);
	}
	.footer-main-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-l);
	}
	form {
		flex: 1 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-s) var(--space-l);
	}
	.social-links {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: var(--space-xs);
		margin-block-start: var(--space-m);
	}
	.social-links > a {
		display: flex;
	}
	textarea {
		resize: none;
		height: 150px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);
	}
	.required {
		color: var(--yellow);
		font-weight: inherit;
	}
	.invalid {
		color: var(--yellow);
	}

	@media (min-width: 45rem) {
		footer > * > * {
			max-width: 100%;
		}
		form {
			display: grid;
			grid-template-columns: 2fr 3fr;
			grid-template-rows: 1fr 1fr 1fr;
		}
		.social-links {
			flex-direction: column;
			justify-content: flex-start;
		}
		.footer-main-content {
			flex-direction: row;
		}
		label[for='message'] {
			grid-row: 1 / -1;
			grid-column: 2;
		}
		textarea {
			height: 100%;
		}
		.submit-button {
			align-self: end;
		}
		.submit-message {
			grid-column: 1 / -1;
		}
	}
</style>
