import { CSS_PLACEHOLDER } from './constants';

export { CSS_PLACEHOLDER } from './constants';

export function attachStyleSheet(shadowRoot: ShadowRoot | null | undefined) {
	if (!shadowRoot) return;
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(CSS_PLACEHOLDER);
	shadowRoot.adoptedStyleSheets = [sheet];
}
