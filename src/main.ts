import './app.css';

import Form from './lib/form/form.svelte';
export { Form };

//

import { mount } from 'svelte';

if (import.meta.env.DEV) {
	mount(Form, {
		target: document.getElementById('app')!
	});
}
