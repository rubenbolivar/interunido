import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	}
});