import type { Plugin } from 'vite';

import fs from 'fs';
import path from 'path';

//

export function copyPreviewTemplate(options: { src: string }) {
	return {
		name: 'copy-preview-template',
		writeBundle() {
			const previewTemplate = path.resolve(import.meta.dirname, options.src);
			const distIndex = path.resolve(import.meta.dirname, 'dist/index.html');

			if (fs.existsSync(previewTemplate)) {
				fs.copyFileSync(previewTemplate, distIndex);
				console.log('✓ Copied index-preview.html to dist/index.html');
			}
		}
	};
}

export function inlineBuiltCss(options: {
	placeholder: string;
	transform?: (css: string) => string;
}): Plugin {
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

			if (!jsContent.includes(options.placeholder)) return;

			let cssToInline = cssContent;
			if (options.transform) cssToInline = options.transform(cssToInline);
			const escapedCss = escapeForJsString(cssToInline);

			jsContent = jsContent.replace(options.placeholder, escapedCss);
			fs.writeFileSync(jsPath, jsContent);
			fs.unlinkSync(cssPath);
		}
	};
}

export function includeCoreTailwindVariablesInHost(css: string): string {
	// Match Tailwind's preflight selector (order varies: :before,:after vs :after,:before)
	const preflightMatch = css.match(/\*,:(?:before,:after|after,:before),::backdrop\s*\{/);
	if (!preflightMatch) return css;

	const afterPreflight = css.indexOf(preflightMatch[0]) + preflightMatch[0].length;
	const themeMarker = '}}@layer theme{:root,:host';
	const themeIdx = css.indexOf(themeMarker, afterPreflight);
	if (themeIdx === -1) return css;

	const code = css.slice(afterPreflight, themeIdx);
	if (!code.trim()) return css;

	const addition = `@layer properties{:host{${code}}}`;
	return addition + css;
}

function escapeForJsString(css: string): string {
	return css
		.replace(/\\/g, '\\\\') // must be first
		.replace(/\0/g, '\\0') // null character
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r')
		.replace(/\u2028/g, '\\u2028') // LINE SEPARATOR
		.replace(/\u2029/g, '\\u2029') // PARAGRAPH SEPARATOR
		.replace(/'/g, "\\'")
		.replace(/"/g, '\\"')
		.replace(/`/g, '\\`')
		.replace(/\$/g, '\\$');
}
