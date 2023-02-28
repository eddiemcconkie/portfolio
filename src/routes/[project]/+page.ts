import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projects } from './projects';

export const load = (async ({ params }) => {
	const project = projects[params.project];
	if (!project) throw error(404, 'Page not found');
	return { project };
}) satisfies PageLoad;
