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
	import { BasicForm, getErrors, getValueSnapshot } from '@sjsf/form';
	import { preventPageReload } from '@sjsf/form/prevent-page-reload.svelte';
	import { onMount } from 'svelte';

	import * as Form from './form';
	import { setShadcnThemeContext } from './sjsf/theme';
	import { attachStyleSheet } from './style';

	//

	let props: Form.Props = $props();

	//

	setShadcnThemeContext();

	onMount(() => {
		attachStyleSheet($host()?.shadowRoot);
	});

	const form = Form.make(props);
	preventPageReload(form);
</script>

<BasicForm {form} />

<pre>{JSON.stringify(
		{ value: getValueSnapshot(form), errors: Array.from(getErrors(form)) },
		null,
		2
	)}</pre>
