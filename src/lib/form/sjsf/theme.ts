import { extendByRecord } from '@sjsf/form/lib/resolver';
import { theme as shadcnTheme } from '@sjsf/shadcn4-theme';
import QrWidget from '$lib/form/components/qr-widget.svelte';

//

export { icons } from '@sjsf/lucide-icons';
export { setShadcnThemeContext } from './theme-context';

//

declare module '@sjsf/form' {
	interface ComponentProps {
		formataQrWidget: ComponentProps['textWidget'];
	}
	interface ComponentBindings {
		formataQrWidget: 'value';
	}
}

export const theme = extendByRecord(shadcnTheme, {
	formataQrWidget: QrWidget
});
