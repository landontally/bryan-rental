import adapter from '@sveltejs/adapter-netlify'; // Change this line
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter() // And this one remains the same
	}
};

export default config;