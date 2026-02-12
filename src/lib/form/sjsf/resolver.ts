import {
	isFilesArray,
	isMultiSelect,
	isSelect,
	retrieveUiOption,
	type FormState,
	type ResolveFieldType
} from '@sjsf/form';
import { getSimpleSchemaType, isFileSchema, isFixedItems } from '@sjsf/form/core';
import '@sjsf/form/fields/extra/array-native-files-include';
import '@sjsf/form/fields/extra/enum-include';
import '@sjsf/form/fields/extra/file-include';
import '@sjsf/form/fields/extra/files-include';
import '@sjsf/form/fields/extra/multi-enum-include';
import '@sjsf/form/fields/extra/native-file-include';
import '@sjsf/form/fields/extra/native-files-include';
import '@sjsf/form/fields/extra/unknown-native-file-include';

//

// export { resolver } from '@sjsf/form/resolvers/basic';

export function resolver<T>(ctx: FormState<T>): ResolveFieldType {
	return (config) => {
		const { schema } = config;
		if (isSelect(ctx, schema)) {
			return 'enumField';
		}
		if (schema.oneOf !== undefined) {
			return 'oneOfField';
		}
		if (schema.anyOf !== undefined) {
			return 'anyOfField';
		}
		const type = getSimpleSchemaType(schema);
		if (type === 'array') {
			if (isMultiSelect(ctx, schema)) {
				return 'multiEnumField';
			}
			if (isFixedItems(schema)) {
				return 'tupleField';
			}
			if (isFilesArray(ctx, schema) && retrieveUiOption(ctx, config, 'orderable') !== true) {
				return 'filesField';
			}
			return 'arrayField';
		}
		if (isFileSchema(schema)) {
			return 'fileField';
		}
		return `${type}Field`;
	};
}
