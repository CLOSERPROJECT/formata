import { createFormValidator as validator } from '@sjsf/ajv8-validator';
import { createForm, type Schema, type UiSchema } from '@sjsf/form';
import { createFocusOnFirstError } from '@sjsf/form/focus-on-first-error';
import { createFormIdBuilder as idBuilder } from '@sjsf/form/id-builders/modern';
import { createFormMerger as merger } from '@sjsf/form/mergers/modern';
import { translation } from '@sjsf/form/translations/en';
import { serialize } from 'object-to-formdata';

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
		onSubmitError: createFocusOnFirstError(),
		onSubmit: (data, ev) => {
			const formData = serialize(data);

			const form = ev.target as HTMLFormElement;
			const root = form.getRootNode();
			const host = root instanceof ShadowRoot ? root.host : form;
			const composed = new SubmitEvent('submit', {
				bubbles: true,
				composed: true,
				cancelable: true,
				submitter: ev.submitter ?? undefined
			});
			Object.defineProperty(composed, 'formData', {
				value: formData,
				writable: false,
				configurable: true
			});
			host.dispatchEvent(composed);
		}
	});
}
