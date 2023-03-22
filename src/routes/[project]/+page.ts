import { error } from '@sveltejs/kit';
import { links } from '../project-links';
import { projects } from './projects';

export const load = async ({ params }) => {
	const project = projects[params.project];
	if (!project) throw error(404, 'Page not found');

	const otherProjects = links.filter((link) => link.slug !== params.project);

	return { project, otherProjects };
};
