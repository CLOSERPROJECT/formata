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
			}
		},
		required: ['text']
	}}
	uiSchema={{
		text: {
			'ui:options': {
				title: 'Text input'
			}
		}
	}}
/>
