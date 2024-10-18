import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			name: 'FindPartialAnagrams',
			entry: [
				resolve(__dirname, 'src/main.ts'),
				resolve(__dirname, 'src/word-list.ts'),
			],
		},
	},
});
