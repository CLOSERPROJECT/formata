<script lang="ts">
	import type { ComponentProps } from '@sjsf/form';

	import { TriangleAlert } from '@lucide/svelte';
	import StringField from '@sjsf/form/fields/string.svelte';
	import { getExceptionMessage } from '$lib/utils';
	import qrcode from 'qrcode-generator';

	//

	// eslint-disable-next-line svelte/no-unused-svelte-ignore
	// svelte-ignore custom_element_props_identifier
	let { value = $bindable(), ...rest }: ComponentProps['stringField'] = $props();

	function generateQrCode(text: string, cellSize = 20) {
		const qr = qrcode(0, 'L');
		qr.addData(text);
		qr.make();
		return qr.createDataURL(cellSize);
	}

	const result = $derived.by(() => {
		if (!value) return undefined;
		try {
			return generateQrCode(value);
		} catch (e) {
			return new Error(getExceptionMessage(e));
		}
	});
</script>

<div class="flex gap-4">
	<StringField bind:value {...rest} />
	<div
		class={[
			'aspect-square size-48 shrink-0 overflow-hidden rounded-md border bg-slate-50',
			'flex flex-col items-center justify-center gap-1',
			'text-center text-xs text-muted-foreground',
			(!result || result instanceof Error) && 'p-3'
		]}
	>
		{#if result instanceof Error}
			<TriangleAlert size={20} />
			<p>{result.message}</p>
		{:else if result}
			<img src={result} class="aspect-square h-full w-full object-contain" alt="QR Code" />
		{:else}
			<p>Type something to generate a QR Code</p>
		{/if}
	</div>
</div>
