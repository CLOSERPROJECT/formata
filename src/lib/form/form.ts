import { createForm, type Schema, type UiSchema } from '@sjsf/form';

import * as defaults from './form.defaults';

//

type Props = {
	schema: Schema;
	uiSchema?: UiSchema;
};

export function make(props: Props) {
	return createForm({
		...defaults,
		schema: props.schema,
		uiSchema: props.uiSchema
	});
}
