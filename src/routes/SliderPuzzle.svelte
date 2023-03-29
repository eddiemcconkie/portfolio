<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { backOut, linear } from 'svelte/easing';

	export let pic: string;

	type Piece = {
		readonly index: number;
		readonly empty: boolean;
	};

	const size = 3;
	const topRight = size - 1;

	let shuffling = true;
	let complete = false;
	const dispatch = createEventDispatcher();
	$: if (complete) dispatch('complete');

	let shuffleSpeed = 30; //ms
	$: swapSpeed = complete ? 1000 : 100; //ms

	const xyFromIndex = (index: number) => ({
		x: index % size,
		y: Math.floor(index / size),
	});
	const indexFromXy = (x: number, y: number) => y * size + x;

	let pieces: Piece[] = [];
	for (let index = 0; index < size * size; index++) {
		pieces.push({ index, empty: index === topRight });
	}

	/**
	 * Get the indices of the adjacent squares on the board
	 */
	const getAdjacent = (index: number) => {
		const { x: currentX, y: currentY } = xyFromIndex(index);
		const options = [
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		];
		const adjacent: number[] = [];
		for (const [dx, dy] of options) {
			const adjacentX = currentX + dx;
			const adjacentY = currentY + dy;
			if (adjacentX >= 0 && adjacentX < size && adjacentY >= 0 && adjacentY < size)
				adjacent.push(indexFromXy(adjacentX, adjacentY));
		}
		return adjacent;
	};

	/**
	 * Swap two pieces on the board
	 */
	const swap = (a: number, b: number) => {
		let temp = pieces[a];
		pieces[a] = pieces[b];
		pieces[b] = temp;
	};

	/**
	 * Shuffle dat board
	 */
	const shuffle = () => {
		let numSwaps = 50;
		let empty = pieces.findIndex((piece) => piece.empty);
		let previousSwap = -1;

		const interval = setInterval(() => {
			// Never unswap what you swapped
			const adjacent = getAdjacent(empty).filter((a) => a !== previousSwap);
			const currentSwap = adjacent[Math.floor(Math.random() * adjacent.length)];
			swap(empty, currentSwap);
			previousSwap = empty;
			empty = currentSwap;
			numSwaps--;
			if (numSwaps === 0) {
				shuffling = false;
				clearInterval(interval);
			}
		}, shuffleSpeed * 3);
	};
	setTimeout(shuffle, 1000);

	/**
	 * If possible, move the clicked piece into the empty space,
	 * and end the game when the puzzle is complete
	 */
	const handleClick = (index: number) => {
		if (shuffling || complete) return;

		for (const iAdj of getAdjacent(index)) if (pieces[iAdj].empty) swap(index, iAdj);

		let done = true;
		for (const [index, piece] of pieces.entries()) {
			if (piece.index !== index) done = false;
		}
		if (done) {
			complete = true;
		}
	};
</script>

<div class="backdrop">
	<div class="board" style="--size: {size};" data-complete={complete}>
		{#each pieces as piece, i (piece.index)}
			{@const { x: startX, y: startY } = xyFromIndex(piece.index)}
			{@const { x: currentX, y: currentY } = xyFromIndex(i)}
			<button
				class="piece | plain"
				class:empty={piece.empty}
				style="--x: {currentX}; --y: {currentY};"
				on:click={() => handleClick(i)}
				animate:flip={{
					duration: shuffling ? shuffleSpeed : swapSpeed,
					easing: shuffling || complete ? linear : backOut,
				}}
			>
				<img src={pic} alt="" style="--x: {startX}; --y: {startY};" />
			</button>
		{/each}
		{#if complete}
			{@const { x, y } = xyFromIndex(topRight)}
			<button class="piece last | plain" style="--x: {x}; --y: {y};">
				<img src={pic} alt="" />
			</button>
		{/if}
	</div>
</div>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.backdrop {
		--h: 20;
		--s: 0%;
		--l: 15%;
		--bg-color: var(--h) var(--s) var(--l);
		background-color: hsl(var(--bg-color));
		max-width: fit-content;
	}
	.board {
		display: grid;
		padding: 4px;
		max-width: 300px;
		width: 100%;
		aspect-ratio: 1 / 1;
		grid-template-rows: repeat(var(--size), 1fr);
		grid-template-columns: repeat(var(--size), 1fr);
		--l: 30%;
		--bg-color: var(--h) var(--s) var(--l);
	}

	.piece {
		padding: 0;
		display: block;
		border: none;
		background-color: transparent;
		overflow: hidden;
		transition: scale 100ms;
		grid-column: calc(var(--x) + 1);
		grid-row: calc(var(--y) + 1);
		outline: none;
	}
	.piece:not(.last) {
		z-index: 1;
	}
	.piece > img {
		max-width: 100%;
		display: block;
		transform-origin: center;
		translate: calc(calc(var(--x) - 1) * -100%) calc(calc(var(--y) - 1) * -100%);
		scale: 3.5;
	}
	.piece.empty > img {
		display: none;
	}
	.board[data-complete='false'] > .piece:not(.empty) > img {
		cursor: pointer;
	}
	@media (hover: hover) and (pointer: fine) {
		.board[data-complete='false'] > .piece:hover {
			filter: brightness(90%);
		}
	}
	button {
		will-change: auto;
	}
</style>
