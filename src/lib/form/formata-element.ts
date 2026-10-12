/**
 * CE class extensions for `<formata-form>`.
 *
 * Attesta calls getValue/setValue synchronously after appendChild, before the
 * inner Svelte component mounts (next tick). Until the component registers a
 * bridge via {@link registerFormataBridge}, these methods use the public
 * `value` prop only — no Svelte CE internals.
 */

export type FormataValueBridge = {
	get: () => unknown;
	set: (value: Record<string, unknown>) => void;
};

/** Host shape after Svelte wires the `value` CE prop onto the element. */
type FormataFormHost = HTMLElement & {
	value?: unknown;
};

type CustomElementConstructor = new (...args: unknown[]) => HTMLElement;

const bridges = new WeakMap<HTMLElement, FormataValueBridge>();

function asObjectValue(next: unknown): Record<string, unknown> {
	return next && typeof next === 'object' && !Array.isArray(next)
		? (next as Record<string, unknown>)
		: {};
}

export function registerFormataBridge(host: HTMLElement, bridge: FormataValueBridge) {
	bridges.set(host, bridge);
	return () => {
		bridges.delete(host);
	};
}

export function extendFormataElement(customElementConstructor: CustomElementConstructor) {
	return class extends customElementConstructor {
		getValue() {
			const bridge = bridges.get(this);
			if (bridge) {
				return bridge.get();
			}
			return asObjectValue((this as FormataFormHost).value);
		}

		setValue(next: unknown) {
			const payload = asObjectValue(next);
			(this as FormataFormHost).value = payload;
			bridges.get(this)?.set(payload);
		}
	};
}
