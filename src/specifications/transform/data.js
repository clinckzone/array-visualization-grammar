//@ts-check
export class TransformDataSpec {
	/**
	 * Stores a single transformation data inside itself
	 * @param {Object} rawData
	 * @param {Object} transformStyleSpec
	 */
	constructor(rawData, transformStyleSpec) {
		this.type = rawData.type;
		this.args = this.init_args(rawData);
		this.properties = transformStyleSpec;
	}

	//Wraps the transformation arguments in rawData into an object
	init_args(rawData) {
		const dataType = {
			array: 'array',
			primitive: 'primitive',
		};

		let args;
		//If both index and value are specified, then wrap each corresponding pair into a single object
		if (rawData.value !== undefined && rawData.index !== undefined) {
			//Both value and index are specified as arrays
			if (Array.isArray(rawData.index) && Array.isArray(rawData.value)) {
				args = {
					type: dataType.array,
					items: rawData.index.map((item, index) => ({
						index: rawData.index[index],
						value: rawData.value[index],
					})),
				};
			}
			//Both value and index are specified as primitives
			else if (!Array.isArray(rawData.index) && !Array.isArray(rawData.value)) {
				args = {
					type: dataType.primitive,
					items: [{ index: rawData.index, value: rawData.value }],
				};
			} else {
				throw 'Both index and value should either be of type array or a primitive.';
			}
		}

		//Else wrap whichever one is defined into a single object each
		else {
			if (rawData.value !== undefined) {
				if (Array.isArray(rawData.value)) {
					args = {
						type: dataType.array,
						items: rawData.value.map((item) => ({ value: item })),
					};
				} else {
					args = {
						type: dataType.primitive,
						items: [{ value: rawData.value }],
					};
				}
			} else if (rawData.index !== undefined) {
				if (Array.isArray(rawData.index)) {
					args = {
						type: dataType.array,
						items: rawData.index.map((item) => ({ index: item })),
					};
				} else {
					args = {
						type: dataType.primitive,
						items: [{ index: rawData.index }],
					};
				}
			}
		}
		return args;
	}
}
