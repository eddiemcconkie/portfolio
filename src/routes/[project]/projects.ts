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
		headerText: "because I couldn't find a note-taking app that I liked",
		screenshot: '/screenshot-code-journal.webp',
		githubLink: 'https://github.com/eddiemcconkie/code-journal',
		demoLink: 'https://code-journal.vercel.app',
		bodyText: [
			"I wanted a no-hassle place to keep all of my random coding notes. I had tried a few other apps, but they had a lot of features I didn't need and they took too long to start up or used up too much memory on my laptop.",
			'While I was working as a coding tutor for K-12 kids, I shared the app with one of my students and he used it to take coding notes during our lessons!',
			'Paragraph 1',
			'Paragraph 2',
			'Paragraph 3',
			'Paragraph 4',
			'Paragraph 5',
		],
	},
	'snip-swap': {
		title: 'Snip Swap',
		headerText: 'An app for finding and sharing your favorite code snippets',
		screenshot: '',
		githubLink: '',
		demoLink: '',
		bodyText: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'],
	},
};
