import { createFormValidator as validator } from '@sjsf/ajv8-validator';
import { createForm, type Schema, type UiSchema } from '@sjsf/form';
import { createFocusOnFirstError } from '@sjsf/form/focus-on-first-error';
import { createFormIdBuilder as idBuilder } from '@sjsf/form/id-builders/modern';
import { createFormMerger as merger } from '@sjsf/form/mergers/modern';
import { translation } from '@sjsf/form/translations/en';

import { resolver } from './sjsf/resolver';
import { icons, theme } from './sjsf/theme';

//

export type Props = {
	schema: Schema;
	uiSchema?: UiSchema;
};

export function make(props: Props) {
	return createForm({
		resolver,
		theme,
		icons,
		idBuilder,
		validator,
		merger,
		translation,
		schema: props.schema,
		uiSchema: props.uiSchema,
		onSubmitError: createFocusOnFirstError()
	});
}
