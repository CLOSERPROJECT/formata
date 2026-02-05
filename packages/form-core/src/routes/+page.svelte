<script lang="ts">
	import { mountForm } from '$lib/form';
	import { onMount } from 'svelte';

	onMount(() => {
		mountForm(document.body);
	});
</script>
