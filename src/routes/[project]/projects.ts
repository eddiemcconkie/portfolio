type Project = {
	title: string;
	headerText: string;
	screenshot: string;
	githubLink: string;
	demoLink: string;
	bodyText: string[];
};

export const projects: Record<string, Project> = {
	'code-journal': {
		title: 'Code Journal',
		headerText: 'Header text',
		screenshot: '/',
		githubLink: 'https://github.com',
		demoLink: 'https://code-journal.vercel.app',
		bodyText: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'],
	},
};
