import { flushSync } from 'svelte';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import './form.svelte';

const batchesSchema = {
	type: 'object',
	properties: {
		batches: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					loadId: { type: 'string', title: 'Load ID' },
					weightKg: { type: 'string', title: 'Weight (kg)' }
				}
			}
		}
	}
} as const;

const draftValue = {
	batches: [{ loadId: '23', weightKg: '23423' }]
};

type FormataFormElement = HTMLElement & {
	schema: unknown;
	uiSchema?: unknown;
	value: unknown;
	setValue: (value: unknown) => void;
	getValue: () => unknown;
};

function createFormataForm(): FormataFormElement {
	return document.createElement('formata-form') as FormataFormElement;
}

async function settle() {
	flushSync();
	await Promise.resolve();
	await Promise.resolve();
	flushSync();
}

describe('formata-form value API', () => {
	beforeEach(async () => {
		await customElements.whenDefined('formata-form');
	});

	afterEach(() => {
		document.body.replaceChildren();
	});

	test('getValue round-trips setValue before and after mount (Attesta restore path)', async () => {
		const el = createFormataForm();
		el.schema = batchesSchema;
		document.body.appendChild(el);

		// Attesta calls these synchronously after appendChild, before the next-tick mount.
		el.setValue(draftValue);
		expect(el.getValue()).toEqual(draftValue);

		await settle();

		expect(el.getValue()).toMatchObject(draftValue);

		const shadow = el.shadowRoot;
		expect(shadow).toBeTruthy();
		const loadInput = shadow!.querySelector<HTMLInputElement>('input[name*="loadId"]');
		const weightInput = shadow!.querySelector<HTMLInputElement>('input[name*="weightKg"]');
		expect(loadInput?.value).toBe('23');
		expect(weightInput?.value).toBe('23423');
	});

	test('assigning value property restores nested array rows', async () => {
		const el = createFormataForm();
		el.schema = batchesSchema;
		document.body.appendChild(el);
		el.value = draftValue;

		expect(el.getValue()).toEqual(draftValue);

		await settle();

		expect(el.getValue()).toMatchObject(draftValue);
		const loadInput = el.shadowRoot!.querySelector<HTMLInputElement>('input[name*="loadId"]');
		expect(loadInput?.value).toBe('23');
	});
});
