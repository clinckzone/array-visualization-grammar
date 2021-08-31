//@ts-check
export class TransformDataSpec {
	/**
	 * TransformDataSpec stores a single transformation data inside itself
	 * @param {{type: string; value: any[], index: any[]; stroke: String; strokeWidth: String; fill: String; stagger: boolean; duration: number; easingFunction: String}} rawData
	 * @param {{stroke: String; strokeWidth: String; fill: String; stagger: boolean; durationEach: number; easingFunction: String;}} transformStyleSpec
	 */
	constructor(rawData, transformStyleSpec) {
		//Stored Data types
		this.dataType = {
			ARRAY: 'array',
			PRIMITIVE: 'primitive',
		};

		//Transformation type
		this.type = rawData.type;

		//Get the transformation arguments
		this.initializeArgs(rawData);

		//Stroke color
		this.stroke =
			rawData.stroke !== undefined
				? rawData.stroke
				: transformStyleSpec.stroke;

		//Stroke width
		this.strokeWidth =
			rawData.strokeWidth !== undefined
				? rawData.strokeWidth
				: transformStyleSpec.strokeWidth;

		//Fill color
		this.fill =
			rawData.fill !== undefined ? rawData.fill : transformStyleSpec.fill;

		//Should the transformation be staggered?
		this.stagger =
			rawData.stagger !== undefined
				? rawData.stagger
				: transformStyleSpec.stagger;

		//Specifiy duration property
		this.duration =
			rawData.duration !== undefined
				? rawData.duration
				: this.args.item.length * transformStyleSpec.durationEach;

		//Specify the easing function
		this.easingFunction =
			rawData.easingFunction !== undefined
				? rawData.easingFunction
				: transformStyleSpec.easingFunction;
	}

	//Wraps the transformation arguments in rawData into an object
	initializeArgs(rawData) {
		//If both index and value are specified, then wrap each corresponding pair into a single object
		if (rawData.value !== undefined && rawData.index !== undefined) {
			//If both value and index are specified as arrays
			if (Array.isArray(rawData.index) && Array.isArray(rawData.value)) {
				//Create an array of objects containing value and index
				this.args = {
					type: this.dataType.ARRAY,
					item: rawData.index.map((item, index) => ({
						index: rawData.index[index],
						value: rawData.value[index],
					})),
				};
			}

			//Else if both value and index are specified as primitives
			else if (
				!Array.isArray(rawData.index) &&
				!Array.isArray(rawData.value)
			) {
				this.args = {
					type: this.dataType.PRIMITIVE,
					item: [
						{
							index: rawData.index,
							value: rawData.value,
						},
					],
				};
			} else {
				throw 'Both index and value should either be of type array or a primitive.';
			}
		}

		//Else wrap whichever one is defined into a single object each
		else {
			//If only value exists
			if (rawData.value !== undefined) {
				//If value is an array
				if (Array.isArray(rawData.value)) {
					this.args = {
						type: this.dataType.ARRAY,
						item: rawData.value.map((item) => ({
							value: item,
						})),
					};
				}

				//If value is a primitive
				else {
					this.args = {
						type: this.dataType.PRIMITIVE,
						item: [
							{
								value: rawData.value,
							},
						],
					};
				}
			}

			//Else if only index exits
			else if (rawData.index !== undefined) {
				//If index is an array
				if (Array.isArray(rawData.index)) {
					this.args = {
						type: this.dataType.ARRAY,
						item: rawData.index.map((item) => ({
							index: item,
						})),
					};
				}

				//If index is a primitive
				else {
					this.args = {
						type: this.dataType.PRIMITIVE,
						item: [
							{
								index: rawData.index,
							},
						],
					};
				}
			}
		}
	}
}
