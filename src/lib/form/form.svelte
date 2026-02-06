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
			}
		}
	}}
/>

<script lang="ts">
	import type { Schema, UiSchema } from '@sjsf/form';

	import { BasicForm } from '@sjsf/form';
	import { onMount } from 'svelte';

	import * as Form from './form';
	import { attachStyleSheet } from './style';
	import { setShadcnThemeContext } from './theme';

	//

	type Props = {
		schema: Schema;
		uiSchema?: UiSchema;
	};

	let { schema, uiSchema }: Props = $props();

	//

	setShadcnThemeContext();

	onMount(() => {
		attachStyleSheet($host()?.shadowRoot);
	});

	const form = $derived(Form.make({ schema, uiSchema }));
</script>

<BasicForm {form} />
