import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';

const config: UserConfig = {
	plugins: [{ ...threeMinifier(), enforce: 'pre' }, sveltekit()],
	ssr: {
		noExternal: ['three'],
	},
};

export default config;
