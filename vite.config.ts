import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path, { resolve } from 'path';
import fs from 'fs';
import { CSS_PLACEHOLDER } from './src/lib/form/utils';

//

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelte(),
		inlineBuiltCss({
			postProcess: postProcessCss
		}),
		copyPreviewTemplate()
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

			if (!jsContent.includes(CSS_PLACEHOLDER)) return;

			let escapedCss = escapeForJsString(cssContent);
			if (options.postProcess) escapedCss = options.postProcess(escapedCss);

			jsContent = jsContent.replace(CSS_PLACEHOLDER, escapedCss);
			fs.writeFileSync(jsPath, jsContent);
		}
	};
}

export function postProcessCss(css: string): string {
	console.log('@@@@@ HERE 1');
	const code = css.split('*,:before,:after,::backdrop').at(1)?.split('}}@layer theme{:root,:host');
	if (!code) return css;
	console.log('@@@@@ HERE 2');

	const addition = `@layer properties{:host{${code}}}`;
	return addition + css;
}

function copyPreviewTemplate() {
	return {
		name: 'copy-preview-template',
		writeBundle() {
			const previewTemplate = resolve(__dirname, 'index-preview.html');
			const distIndex = resolve(__dirname, 'dist/index.html');

			if (fs.existsSync(previewTemplate)) {
				fs.copyFileSync(previewTemplate, distIndex);
				console.log('✓ Copied index-preview.html to dist/index.html');
			}
		}
	};
}
