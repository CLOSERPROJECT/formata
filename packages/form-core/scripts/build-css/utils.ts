import { build, type UserConfig } from 'vite';
import { writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { tmpdir } from 'os';

//

export async function buildCss(
	inputCssPath: string,
	outputCssPath: string,
	viteConfig: UserConfig = {}
) {
	const tempJsPath = join(
		tmpdir(),
		`build-css-${Date.now()}-${Math.random().toString(36).slice(2)}.js`
	);

	const resolvedOutput = resolve(outputCssPath);
	const outputDir = dirname(resolvedOutput);
	mkdirSync(outputDir, { recursive: true });

	try {
		const resolvedInput = resolve(inputCssPath);
		writeFileSync(tempJsPath, `import '${resolvedInput.replace(/\\/g, '\\\\')}';`, 'utf-8');

		const result = await build({
			...viteConfig,
			configFile: false,
			build: {
				...viteConfig.build,
				write: false,
				rollupOptions: {
					...viteConfig.build?.rollupOptions,
					input: tempJsPath
				},
				cssCodeSplit: false,
				cssMinify: true
			}
		});

		if (Array.isArray(result)) {
			throw new Error('Build result is an array');
		}

		if (!('output' in result)) {
			throw new Error('Build result is missing output');
		}

		const cssOutput = result.output.find(
			(file) => file.type === 'asset' && file.fileName.endsWith('.css')
		);

		if (cssOutput && cssOutput.type === 'asset' && cssOutput.source) {
			writeFileSync(resolvedOutput, String(cssOutput.source), 'utf-8');
			console.log(`✓ Built CSS: ${resolvedOutput}`);
			return { path: resolvedOutput };
		}

		throw new Error('CSS output not found in build result');
	} catch (error) {
		console.error('Error building CSS:', error);
		throw error;
	} finally {
		try {
			unlinkSync(tempJsPath);
		} catch (error) {
			console.error('Error cleaning up temporary file:', error);
		}
	}
}
