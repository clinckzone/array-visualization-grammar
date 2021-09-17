//@ts-check
import * as d3 from 'd3';
import { retrieveValues } from '../../../Helpers/Functions/RetrieveValues';
import { totalDuration } from '../../../Helpers/Functions/TotalDuration';
import { HighlightTransformProp } from '../../../Helpers/Specs/HighlightTransformProp';
import { highlightSelection } from '../HighlightSelection';
import { ArrayDiagram } from '../../../Diagrams/ArrayDiagram';

/**
 * Wrapper function for deselect. It mainly preprocesses the deselect
 * transformation properties before passing it to the highlightSelection function
 * @param {number[]} index Indexes that are to be deselected
 * @param {ArrayDiagram} arrayDiagram Array diagram whose items are to be deselected
 * @param {Object} properties Transformation properties for deselect transformations
 */
export async function deselect(index, arrayDiagram, properties) {
	//Selection to be highlighted
	const selection = d3.selectAll(
		index.map((item) => arrayDiagram.items.nodes()[item])
	);

	const deselectProp = Object.create(HighlightTransformProp);
	deselectProp.stagger = properties.stagger;
	deselectProp.easing = properties.easing;
	deselectProp.duration = totalDuration(properties, index.length);

	deselectProp.focus = retrieveValues(
		deselectProp.focus,
		arrayDiagram.properties.style.item
	);
	deselectProp.defocus = retrieveValues(
		deselectProp.defocus,
		arrayDiagram.properties.style.item
	);

	await highlightSelection(selection, deselectProp);
}
