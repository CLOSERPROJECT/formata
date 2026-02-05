import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { buildCss } from './utils';
import tailwindcss from '@tailwindcss/vite';
import postcssOnlyVarsPlugin from 'postcss-only-vars';

//

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..', '..');

const source = join(rootDir, 'src/routes/layout.css');
const output = join(rootDir, 'dist/form/form.css');
const variables = join(rootDir, 'dist/form/variables.css');

// 1) Form CSS with Tailwind
await buildCss(source, output, {
	plugins: [tailwindcss()]
});

// 2) CSS with PostCSS (postcss-only-vars only) — adjust paths to your vars file
await buildCss(output, variables, {
	css: {
		postcss: {
			plugins: [postcssOnlyVarsPlugin()]
		}
	}
});
