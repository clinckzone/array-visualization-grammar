//@ts-check
import { StyleSpec } from './styling/style';
import { TransformSpec } from './transform/transform';
import { arrayPropSpec } from './array';
import { ArrayDiagram } from '../diagrams/array-diagram';

export class InterpreterSpec {
	/**
	 * InterpreterSpec takes in the parsed JSON from the JSON editor
	 * and interpretes it to create and drive the array animations
	 * @param {Object} rawSpec Raw specifications obtained by directlty by parsing the text from the JSON editor
	 */
	constructor(rawSpec) {
		//Array of the variable names present
		this.data = rawSpec.data;

		//Style settings
		rawSpec.style = rawSpec.style || {};
		this.style = new StyleSpec(rawSpec.style);

		//Get the transformations on the data structure
		rawSpec.transform = rawSpec.transform || [];
		this.transform = rawSpec.transform.map((item) => new TransformSpec(item, this.style));
	}

	async interpret() {
		const arrayProp = Object.create(arrayPropSpec);
		arrayProp.name = this.data[0];
		arrayProp.style = this.style.diagram;

		let arrayDiagram = new ArrayDiagram(arrayProp);

		//Applies the transformation on the array in order
		for (let i = 0; i < this.transform.length; i++) {
			await this.transform[i].applyTransformation(arrayDiagram);
		}
	}
}
