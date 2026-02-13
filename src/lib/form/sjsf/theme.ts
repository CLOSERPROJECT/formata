import { extendByRecord } from '@sjsf/form/lib/resolver';
import { theme as shadcnTheme } from '@sjsf/shadcn4-theme';
import QrField from '$lib/form/components/qr-field.svelte';

//

export { icons } from '@sjsf/lucide-icons';
export { setShadcnThemeContext } from './theme-context';

//

declare module '@sjsf/form' {
	interface ComponentProps {
		formataQrField: ComponentProps['stringField'];
	}
	interface ComponentBindings {
		formataQrField: 'value';
	}
}

export const theme = extendByRecord(shadcnTheme, {
	formataQrField: QrField
});
