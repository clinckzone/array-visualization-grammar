//@ts-check
import { DiagramStyleSpec } from './diagram';
import { TransformStyleSpec } from './transform';

export class StyleSpec {
	/**
	 * Stores styling properties for an array diagram's theme and transforms
	 * @param {Object} rawSpec
	 */
	constructor(rawSpec) {
		rawSpec.diagram = rawSpec.diagram || {};
		this.diagram = new DiagramStyleSpec(rawSpec.diagram);

		rawSpec.transform = rawSpec.transform || {};
		this.transform = new TransformStyleSpec(rawSpec.transform, this.diagram);
	}
}
