<script lang="ts">
	import { Form } from '$lib';
	import { onMount } from 'svelte';

	onMount(() => {
		// Listen for all "submit" events at the document level and log them
		if (typeof window !== 'undefined') {
			document.addEventListener(
				'submit',
				(event: Event) => {
					console.log('Global submit event caught:', event);

					// // Example: Prevent default form behavior
					// // event.preventDefault();

					// Example: Get form data if event.formData is present (like FormData polyfill in your form)
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const formData = (event as any).formData;
					if (formData instanceof FormData) {
						// Convert FormData to object for demonstration
						const entries = Object.fromEntries(formData.entries());
						console.log('FormData:', entries);
					}
				},
				true
			); // use capture phase to catch shadow DOM bubbling
		}
	});
</script>

<Form
	schema={{
		type: 'object',
		title: 'Form title',
		properties: {
			text: {
				type: 'string',
				title: 'Text input'
			},
			file: {
				title: 'File input'
			}
		},
		required: ['text']
	}}
	uiSchema={{
		text: {
			'ui:components': {
				textWidget: 'formataQrWidget'
			}
		},
		file: {
			'ui:components': {
				unknownField: 'unknownNativeFileField'
			}
		}
	}}
/>
