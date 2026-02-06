import Ajv from 'ajv';

//

const ajv = new Ajv();

export function validateSchema(schema: object): Error | undefined {
	try {
		ajv.compile(schema);
	} catch (error) {
		return new Error(`Failed to validate schema: ${error}`);
	}
}
