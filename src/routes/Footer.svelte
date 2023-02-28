<script lang="ts">
</script>

<footer>
	<div class="container">
		<h2 class="step-2 font-bold">let's chat!</h2>
		<form method="post">
			<label for="name" class="step--1 font-bold">
				name
				<input type="text" id="name" name="name" required />
			</label>
			<label for="email" class="step--1 font-bold">
				email
				<input type="text" id="email" name="email" required />
			</label>
			<label for="message" class="step--1 font-bold">
				write something, if you like
				<textarea name="message" id="message" />
			</label>
			<button type="submit" data-color="yellow">send it</button>
		</form>
		<div class="social-links" />
	</div>
</footer>

<style>
	footer {
		background-color: var(--black);
		color: white;
		padding-block-start: 15vw;
		padding-block-end: 10vw;
		/* padding-block-end: var(--space-3xl); */
		/* clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 80% 100%, 0 calc(100% - 10vw)); */
		clip-path: polygon(0 2vw, 20% 0, 100% 10vw, 100% 100%, 0 100%);
	}
	footer > .container {
		display: grid;
		grid-template-columns: 1fr auto;
	}
	h2 {
		grid-column: 1 / -1;
		margin-block-end: var(--space-m);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-s) var(--space-l);
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

	@media (min-width: 40rem) {
		form {
			display: grid;
			grid-template-columns: 2fr 3fr;
			grid-template-rows: 1fr 1fr 1fr;
		}
		label[for='message'] {
			grid-row: 1 / -1;
			grid-column: 2;
		}
		textarea {
			height: 100%;
		}
		button[type='submit'] {
			align-self: end;
		}
	}
</style>
