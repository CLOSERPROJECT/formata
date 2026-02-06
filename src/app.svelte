<script lang="ts">
	import { Form } from '$lib';
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
				type: 'string',
				format: 'data-url'
			}
		},
		required: ['text']
	}}
/>
