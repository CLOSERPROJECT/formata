import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		svelte(),
		inlineBuiltCss({
			postProcess: postProcessCss
		})
	],
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

const PLACEHOLDER = '/*_PLACEHOLDER_*/';

function escapeForJsString(css: string): string {
	return css
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r')
		.replace(/'/g, "\\'")
		.replace(/"/g, '\\"')
		.replace(/`/g, '\\`')
		.replace(/\$/g, '\\$');
}

export function inlineBuiltCss(options: { postProcess?: (css: string) => string } = {}): Plugin {
	return {
		name: 'inline-built-css',
		enforce: 'post',
		apply: 'build',
		writeBundle(outputOptions, bundle) {
			const outDir = outputOptions.dir ?? 'dist';

			const jsEntry = Object.entries(bundle).find(([, chunk]) => {
				return (
					chunk.type === 'chunk' &&
					'isEntry' in chunk &&
					!!chunk.isEntry &&
					chunk.fileName.endsWith('.js')
				);
			});
			const cssAsset = Object.entries(bundle).find(
				([, asset]) => asset.type === 'asset' && asset.fileName.endsWith('.css')
			);

			if (!jsEntry || !cssAsset) return;

			const jsChunk = jsEntry[1] as { type: 'chunk'; fileName: string };
			const cssOutput = cssAsset[1] as { type: 'asset'; fileName: string };
			const jsPath = path.join(outDir, jsChunk.fileName);
			const cssPath = path.join(outDir, cssOutput.fileName);

			if (!fs.existsSync(jsPath) || !fs.existsSync(cssPath)) return;

			const cssContent = fs.readFileSync(cssPath, 'utf-8');
			let jsContent = fs.readFileSync(jsPath, 'utf-8');

			if (!jsContent.includes(PLACEHOLDER)) return;

			let escapedCss = escapeForJsString(cssContent);
			if (options.postProcess) escapedCss = options.postProcess(escapedCss);

			jsContent = jsContent.replace(PLACEHOLDER, escapedCss);
			fs.writeFileSync(jsPath, jsContent);
		}
	};
}

export function postProcessCss(css: string): string {
	const code = css.split('*,:before,:after,::backdrop').at(1)?.split('}}@layer theme{:root,:host');
	if (!code) return css;

	const addition = `@layer properties{:host{${code}}}`;
	return css + addition;
}
