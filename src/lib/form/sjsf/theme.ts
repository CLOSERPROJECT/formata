import { extendByRecord } from '@sjsf/form/lib/resolver';
import '@sjsf/form/fields/extra/aggregated-include';
import '@sjsf/form/fields/extra/array-files-include';
import '@sjsf/form/fields/extra/array-native-files-include';
import '@sjsf/form/fields/extra/array-tags-include';
import '@sjsf/form/fields/extra/boolean-select-include';
import '@sjsf/form/fields/extra/enum-include';
import '@sjsf/form/fields/extra/file-include';
import '@sjsf/form/fields/extra/files-include';
import '@sjsf/form/fields/extra/multi-enum-include';
import '@sjsf/form/fields/extra/native-file-include';
import '@sjsf/form/fields/extra/native-files-include';
import '@sjsf/form/fields/extra/tags-include';
import '@sjsf/form/fields/extra/unknown-native-file-include';
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
