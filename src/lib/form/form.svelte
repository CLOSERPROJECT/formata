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
			// Nested JSON for restore; not reflected (attribute stringify is unsuitable).
			// Reactive before and after connect: CE prop setter queues until mount, then
			// recreates the form with initialValue. getValue/setValue work pre-mount via extend
			// (public `value` prop); after mount they use registerFormataBridge.
			value: {
				type: 'Object'
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
		},
		extend: extendFormataElement
	}}
/>

<script lang="ts" module>
	import { extendFormataElement } from './formata-element.js';
</script>

<script lang="ts">
	import { BasicForm, getErrors, getValueSnapshot, setValue as setFormValue } from '@sjsf/form';
	import { preventPageReload } from '@sjsf/form/prevent-page-reload.svelte';
	import { BitsConfig } from 'bits-ui';
	import { onMount } from 'svelte';

	import * as Form from './form.js';
	import { registerFormataBridge } from './formata-element.js';
	import { setShadcnThemeContext } from './sjsf/theme';
	import { attachStyleSheet } from './style';

	//

	type Options = {
		darkMode?: boolean;
		preventPageReload?: boolean;
		value?: Record<string, unknown>;
	};

	let {
		schema,
		uiSchema,
		value = $bindable(),
		darkMode,
		preventPageReload: preventReload
	}: Form.Props & Options = $props();

	//

	setShadcnThemeContext();

	const form = $derived(Form.make({ schema, uiSchema, initialValue: value }, () => $host()));

	$effect(() => {
		if (preventReload) preventPageReload(form);
	});

	function applyValue(next: Record<string, unknown> | null | undefined) {
		const payload = next && typeof next === 'object' && !Array.isArray(next) ? next : {};
		value = payload;
		setFormValue(form, payload);
	}

	onMount(() => {
		const host = $host();
		attachStyleSheet(host?.shadowRoot);
		return registerFormataBridge(host, {
			get: () => getValueSnapshot(form) ?? {},
			set: applyValue
		});
	});

	let container = $state<HTMLDivElement>();
</script>

<div bind:this={container} class={[darkMode && 'dark']}>
	<BitsConfig defaultPortalTo={container}>
		<BasicForm {form} />
	</BitsConfig>
</div>

{#if import.meta.env.DEV}
	<pre>{JSON.stringify(
			{ value: getValueSnapshot(form), errors: Array.from(getErrors(form)) },
			null,
			2
		)}</pre>
{/if}
