//@ts-check
import { DataSpec } from './DataSpec';
import { StyleSpec } from './StyleSpec';
import { TransformSpec } from './TransformSpec';
import { ArrayDiagram } from '../Diagrams/ArrayDiagram';
import { ArrayProp } from '../Helpers/Specs/ArrayProp';

export class InterpreterSpec {
	/**
	 * InterpreterSpec takes in the parsed JSON from the JSON editor
	 * and interpretes it to create and drive the array animations
	 * @param {Object} rawSpec Raw specifications obtained by directlty parsing the text from the JSON editor
	 */
	constructor(rawSpec) {
		//Data that we are animating
		this.data = new DataSpec(rawSpec.data);

		//Style settings
		if (rawSpec.style === undefined) rawSpec.style = {};
		this.style = new StyleSpec(rawSpec.style);

		//Get the transformations on the data structure
		if (rawSpec.transform === undefined) rawSpec.transform = [];
		this.transform = rawSpec.transform.map(
			(item) => new TransformSpec(item, this.style)
		);
	}

	async interpret() {
		const arrayProp = Object.create(ArrayProp);
		arrayProp.name = this.data.name;
		arrayProp.style = this.style.diagram;

		let arrayDiagram = new ArrayDiagram(arrayProp);

		//Applies the transformation on the array in order
		for (let i = 0; i < this.transform.length; i++) {
			await this.transform[i].applyTransformation(arrayDiagram);
		}
	}
}
