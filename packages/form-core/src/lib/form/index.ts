import { mount } from 'svelte';
import Form from './form.svelte';

//

export function mountForm(target: Element | Document) {
	mount(Form, {
		target
	});
}
