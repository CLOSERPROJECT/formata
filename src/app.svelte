<script lang="ts">
	import { Form } from '$lib';
	import { schema, uiSchema } from '$lib/samples';
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener(
			'submit',
			(event) => {
				console.log('Global submit event caught:', event);
				if (!(event instanceof CustomEvent)) return;
				if (!(event.detail instanceof FormData)) return;
				const entries = Object.fromEntries(event.detail.entries());
				console.log('FormData:', entries);
			},
			{ capture: true }
		);
	});
</script>

<Form {schema} {uiSchema} />
