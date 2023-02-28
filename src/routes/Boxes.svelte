<script lang="ts">
	import {
		InteractiveObject,
		T,
		TransformableObject,
		useFrame,
		type ThreltePointerEvent,
	} from '@threlte/core';

	export let distanceFromCenter = 0;

	type BoxGroup = {
		rotation: number;
		speed: number;
		boxes: {
			y: number;
			width: number;
			height: number;
		}[];
	};

	const minSpeed = 0.003;
	const maxSpeed = 0.2;
	const randomAngle = () => Math.random() * Math.PI;
	const deltaToSpeedRatio = 1 / 600;

	let boxGroups: BoxGroup[] = [
		{
			rotation: randomAngle(),
			speed: minSpeed,
			boxes: [
				{
					y: 20,
					width: 7,
					height: 10,
				},
				{
					y: 12,
					width: 3,
					height: 3,
				},
			],
		},
		{
			rotation: randomAngle(),
			speed: -minSpeed,
			boxes: [
				{
					y: -2,
					width: 10,
					height: 15,
				},
			],
		},
		{
			rotation: randomAngle(),
			speed: minSpeed,
			boxes: [
				{
					y: -15,
					width: 8,
					height: 2,
				},
				{
					y: -20,
					width: 8,
					height: 6,
				},
			],
		},
	];

	useFrame(() => {
		boxGroups = boxGroups.map((group) => {
			group.rotation += group.speed;
			if (group.speed > minSpeed || group.speed < -minSpeed) {
				group.speed *= 0.995;
			}
			return group;
		});
	});

	let pointerX: number | undefined = undefined;

	const handleClick = (e: CustomEvent<ThreltePointerEvent>, groupIndex: number) => {
		if (!e.detail.event) return;

		const group = boxGroups[groupIndex];
		if (group.speed > 0) {
			group.speed = maxSpeed;
		} else {
			group.speed = -maxSpeed;
		}
	};

	const handlePointerMove = (e: CustomEvent<ThreltePointerEvent>, groupIndex: number) => {
		if (!e.detail.event) return;

		if (pointerX === undefined) {
			pointerX = e.detail.event.clientX;
			return;
		}

		const deltaX = (e.detail.event.clientX - pointerX) * deltaToSpeedRatio;
		const group = boxGroups[groupIndex];
		if (deltaX > Math.max(minSpeed, group.speed)) {
			group.speed = deltaX;
		} else if (deltaX < Math.min(-minSpeed, group.speed)) {
			group.speed = deltaX;
		}
	};

	const handlePointerLeave = () => {
		pointerX = undefined;
	};
</script>

<T.PerspectiveCamera makeDefault position={[0, distanceFromCenter * 75, 180]} fov={25} let:ref>
	<TransformableObject object={ref} lookAt={{ y: -distanceFromCenter * 25 }} />
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[-3, 10, 10]} color="#36bf9d" />
<T.DirectionalLight position={[3, 10, -10]} intensity={0.2} color="#36bf9d" />
<T.AmbientLight intensity={0.2} color="#36bf9d" />

<T.Group position.y={-distanceFromCenter * 25}>
	{#each boxGroups as group, i}
		<T.Group rotation.y={group.rotation}>
			{#each group.boxes as box}
				<T.Mesh let:ref position.y={box.y} castShadow receiveShadow>
					<T.BoxGeometry args={[box.width, box.height, box.width]} />
					<InteractiveObject
						object={ref}
						interactive
						on:click={(e) => handleClick(e, i)}
						on:pointermove={(e) => handlePointerMove(e, i)}
						on:pointerleave={handlePointerLeave}
					/>
					<T.MeshStandardMaterial color="#36bf9d" metalness={0.3} roughness={1} />
				</T.Mesh>
			{/each}
		</T.Group>
	{/each}

	<T.Mesh castShadow receiveShadow>
		<T.CylinderGeometry args={[0.6, 0.6, 150, 32]} />
		<T.MeshToonMaterial color="#ffffff" />
	</T.Mesh>
</T.Group>
