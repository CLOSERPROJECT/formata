import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path, { resolve } from 'path';
import {
	inlineBuiltCss,
	copyPreviewTemplate,
	includeCoreTailwindVariablesInHost
} from './vite.plugins';

//

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelte(),
		inlineBuiltCss({
			transform: includeCoreTailwindVariablesInHost
		}),
		copyPreviewTemplate({ src: 'index-preview.html' })
	],
	build: {
		lib: {
			entry: resolve(import.meta.dirname, 'src/lib/index.ts'),
			name: 'FormataWebComponent',
			fileName: (format) => `formata-web-component.${format}.js`,
			formats: ['es', 'umd']
		},
		sourcemap: false
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
