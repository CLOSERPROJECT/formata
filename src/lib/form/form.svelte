<svelte:options
	customElement={{
		tag: 'formata-form',
		props: {
			schema: {
				type: 'Object',
				reflect: true,
				attribute: 'schema'
			},
			uiSchema: {
				type: 'Object',
				reflect: true,
				attribute: 'ui-schema'
			},
			preventPageReload: {
				type: 'Boolean',
				reflect: true,
				attribute: 'prevent-page-reload'
			},
			darkMode: {
				type: 'Boolean',
				reflect: true,
				attribute: 'dark-mode'
			}
		}
	}}
/>

<script lang="ts">
	import { BasicForm, getErrors, getValueSnapshot } from '@sjsf/form';
	import { preventPageReload } from '@sjsf/form/prevent-page-reload.svelte';
	import { onMount } from 'svelte';

	import * as Form from './form.js';
	import { setShadcnThemeContext } from './sjsf/theme';
	import { attachStyleSheet } from './style';

	//

	type Options = {
		darkMode?: boolean;
		preventPageReload?: boolean;
	};

	let {
		schema,
		uiSchema,
		darkMode,
		preventPageReload: preventReload
	}: Form.Props & Options = $props();

	//

	setShadcnThemeContext();

	onMount(() => {
		attachStyleSheet($host()?.shadowRoot);
	});

	const form = $derived(Form.make({ schema, uiSchema }, () => $host()));

	$effect(() => {
		if (preventReload) preventPageReload(form);
	});
</script>

<div class={[darkMode && 'dark']}>
	<BasicForm {form} />
</div>

{#if import.meta.env.DEV}
	<pre>{JSON.stringify(
			{ value: getValueSnapshot(form), errors: Array.from(getErrors(form)) },
			null,
			2
		)}</pre>
{/if}
