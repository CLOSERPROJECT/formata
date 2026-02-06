export const CSS_PLACEHOLDER = '/*_CSS_PLACEHOLDER_*/';

export function attachStyleSheet(shadowRoot: ShadowRoot | null | undefined) {
	if (!shadowRoot) return;
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(CSS_PLACEHOLDER);
	shadowRoot.adoptedStyleSheets = [sheet];
}
