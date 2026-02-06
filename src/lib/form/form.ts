import { createFormValidator as validator } from '@sjsf/ajv8-validator';
import { createForm, type Schema, type UiSchema } from '@sjsf/form';
import '@sjsf/form/fields/extra/enum-include';
import '@sjsf/form/fields/extra/file-include';
import '@sjsf/form/fields/extra/multi-enum-include';
import '@sjsf/form/fields/extra/unknown-native-file-include';
import { createFormIdBuilder as idBuilder } from '@sjsf/form/id-builders/modern';
import { createFormMerger as merger } from '@sjsf/form/mergers/modern';
import { resolver } from '@sjsf/form/resolvers/basic';
import { translation } from '@sjsf/form/translations/en';
import { theme } from '@sjsf/shadcn4-theme';

//

export type Props = {
	schema: Schema;
	uiSchema?: UiSchema;
};

export function make(props: Props) {
	return createForm({
		resolver,
		theme,
		idBuilder,
		validator,
		merger,
		translation,
		schema: props.schema,
		uiSchema: props.uiSchema
	});
}
