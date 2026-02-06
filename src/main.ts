import { mount } from 'svelte';

import './app.css';
import App from './app.svelte';

mount(App, {
	target: document.getElementById('app')!
});
