//@ts-check
import { ArrayDiagramStyle } from '../Helpers/Specs/ArrayProp';
import { TransformProp } from '../Helpers/Specs/TransformProp';
import { initializeDefaults } from '../Helpers/Functions/InitializeDefaults';

export class StyleSpec {
	/**
	 * StyleSpec stores all the properties related to the styling and animation properties of the array diagram that will be drawn
	 * @param {Object} rawSpec
	 */
	constructor(rawSpec) {
		//Diagram - Initialize properties for diagram styling
		const diagramStyle = ArrayDiagramStyle;
		if (rawSpec.diagram !== undefined) {
			this.diagram = initializeDefaults(rawSpec.diagram, diagramStyle);
		} else {
			this.diagram = diagramStyle;
		}

		//Transform - Initialize properties for transform styling
		const transformStyle = TransformProp;
		if (rawSpec.transform !== undefined) {
			this.transform = initializeDefaults(
				rawSpec.transform,
				transformStyle
			);
		} else {
			this.transform = transformStyle;
		}

		//Initialize global properties for transform stlying
		const keys = Object.keys(this.transform);
		keys.forEach((item, index) => {
			this.transform[item] = initializeDefaults(
				this.transform[item],
				this.transform['global']
			);
		});
	}
}
