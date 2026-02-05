<svelte:options customElement="formata-form" />

<script lang="ts">
	import css from './style.css?raw';

	import { SimpleForm } from '@sjsf/form';
	import { resolver } from '@sjsf/form/resolvers/basic';
	import { translation } from '@sjsf/form/translations/en';
	import { createFormMerger } from '@sjsf/form/mergers/modern';
	import { createFormIdBuilder } from '@sjsf/form/id-builders/modern';
	import { createFormValidator } from '@sjsf/form/validators/noop';
	import { theme } from '@sjsf/shadcn4-theme';
	import { setShadcnThemeContext } from './theme';
	import { onMount } from 'svelte';

	setShadcnThemeContext();

	onMount(() => {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(css);
		const host = $host();
		if (host && host.shadowRoot) {
			console.log(sheet);
			host.shadowRoot.adoptedStyleSheets = [sheet];
		}
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
