import { TransformProp } from '../Auxillary/TransformProp';

//@ts-check
export class TransformDataSpec {
	/**
	 * TransformDataSpec stores a single transformation data inside itself
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

		//Transform properties
		this.properties = Object.create(TransformProp);

		//Fill color
		this.properties.fill =
			rawData.fill !== undefined
				? rawData.fill
				: transformStyleSpec.fill !== undefined
				? transformStyleSpec.fill
				: null;

		//Stroke color
		this.properties.stroke =
			rawData.stroke !== undefined
				? rawData.stroke
				: transformStyleSpec.stroke !== undefined
				? transformStyleSpec.stroke
				: null;

		//Stroke width
		this.properties.strokeWidth =
			rawData.strokeWidth !== undefined
				? rawData.strokeWidth
				: transformStyleSpec.strokeWidth !== undefined
				? transformStyleSpec.strokeWidth
				: null;

		//Should the transformation be staggered?
		this.properties.stagger =
			rawData.stagger !== undefined
				? rawData.stagger
				: transformStyleSpec.stagger;

		//Specifiy duration property
		this.properties.duration =
			rawData.duration !== undefined
				? rawData.duration
				: this.stagger
				? this.args.item.length * transformStyleSpec.durationEach
				: transformStyleSpec.durationEach;

		//Specify the easing function
		this.properties.easingFunction =
			rawData.easingFunction !== undefined
				? `d3.${rawData.easingFunction}`
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
