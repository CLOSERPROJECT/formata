<svelte:options customElement="formata-form" />

<script lang="ts">
	import { SimpleForm } from '@sjsf/form';
	import { createFormIdBuilder } from '@sjsf/form/id-builders/modern';
	import { createFormMerger } from '@sjsf/form/mergers/modern';
	import { resolver } from '@sjsf/form/resolvers/basic';
	import { translation } from '@sjsf/form/translations/en';
	import { createFormValidator } from '@sjsf/form/validators/noop';
	import { theme } from '@sjsf/shadcn4-theme';
	import { onMount } from 'svelte';

	import { setShadcnThemeContext } from './theme';
	import { CSS_PLACEHOLDER } from './utils';

	setShadcnThemeContext();

	onMount(() => {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(CSS_PLACEHOLDER);
		const host = $host();
		if (!host.shadowRoot) return;
		host.shadowRoot.adoptedStyleSheets = [sheet];
	});
</script>

<SimpleForm
	{theme}
	{translation}
	{resolver}
	schema={{
		type: 'object',
		title: 'Form title',
		properties: {
			text: {
				type: 'string',
				title: 'Text input'
			}
		},
		required: ['text']
	}}
	merger={createFormMerger}
	idBuilder={createFormIdBuilder}
	validator={createFormValidator<{ text: string }>}
	onSubmit={(v) => window.alert(v.text)}
/>
