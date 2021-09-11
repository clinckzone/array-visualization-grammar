//@ts-check
import { DataSpec } from './DataSpec';
import { StyleSpec } from './StyleSpec';
import { TransformSpec } from './TransformSpec';
import { ArrayDiagram } from '../Diagrams/ArrayDiagram';
import { ArrayProp } from '../Auxillary/ArrayProp';

export class InterpreterSpec {
	/**
	 * InterpreterSpec takes in the parsed JSON from the JSON editor
	 * and interpretes it to create and drive the array animations
	 * @param {any} rawSpec Raw specifications obtained by directlty parsing the text from the JSON editor
	 */
	constructor(rawSpec) {
		//Gets the data structure that we are animating
		this.data = new DataSpec(rawSpec.data);

		//Get the style settings
		rawSpec.style = rawSpec.style !== undefined ? rawSpec.style : {};
		this.style = new StyleSpec(rawSpec.style);

		//Get the transformations on the data structure
		rawSpec.transform =
			rawSpec.transform !== undefined ? rawSpec.transform : [];
		this.transform = rawSpec.transform.map(
			(item) => new TransformSpec(item, this.style)
		);
	}

	async interpret() {
		const arrayProp = Object.create(ArrayProp);
		arrayProp.name = this.data.name;
		arrayProp.label = this.style.theme.label;
		arrayProp.container = this.style.theme.container;
		arrayProp.index = this.style.theme.index;
		arrayProp.item = this.style.theme.item;

		let arrayDiagram = new ArrayDiagram(arrayProp);

		//Applies the transformation on the array in order
		for (let i = 0; i < this.transform.length; i++) {
			const returnArray = await this.transform[i].applyTransformation(
				arrayDiagram
			);
			try {
				arrayDiagram = returnArray;
			} catch {
				throw 'Nothing after this';
			}
		}
	}
}
