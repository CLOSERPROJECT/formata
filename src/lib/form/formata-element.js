/**
 * CE class extensions for `<formata-form>`.
 *
 * Attesta calls getValue/setValue synchronously after appendChild, before the
 * inner Svelte component mounts (next tick). Until the component registers a
 * bridge via {@link registerFormataBridge}, these methods use the public
 * `value` prop only — no Svelte CE internals.
 *
 * @typedef {{ get: () => unknown, set: (value: Record<string, unknown>) => void }} FormataValueBridge
 */

/** @type {WeakMap<HTMLElement, FormataValueBridge>} */
const bridges = new WeakMap();

/**
 * @param {unknown} next
 * @returns {Record<string, unknown>}
 */
function asObjectValue(next) {
	return next && typeof next === 'object' && !Array.isArray(next) ? next : {};
}

/**
 * @param {HTMLElement} host
 * @param {FormataValueBridge} bridge
 */
export function registerFormataBridge(host, bridge) {
	bridges.set(host, bridge);
	return () => {
		bridges.delete(host);
	};
}

/**
 * @param {new (...args: any[]) => HTMLElement} customElementConstructor
 */
export function extendFormataElement(customElementConstructor) {
	return class extends customElementConstructor {
		getValue() {
			const bridge = bridges.get(this);
			if (bridge) {
				return bridge.get();
			}
			return asObjectValue(/** @type {any} */ (this).value);
		}

		/**
		 * @param {unknown} next
		 */
		setValue(next) {
			const payload = asObjectValue(next);
			/** @type {any} */ (this).value = payload;
			bridges.get(this)?.set(payload);
		}
	};
}
