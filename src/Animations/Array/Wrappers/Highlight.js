//@ts-check
import * as d3 from 'd3';
import { retrieveValues } from '../../../Helpers/Functions/RetrieveValues';
import { totalDuration } from '../../../Helpers/Functions/TotalDuration';
import { HighlightTransformProp } from '../../../Helpers/Specs/HighlightTransformProp';
import { highlightSelection } from '../HighlightSelection';
import { ArrayDiagram } from '../../../Diagrams/ArrayDiagram';

/**
 * Wrapper function for highlight. It mainly preprocesses the highlight
 * transformation properties before passing it to the highlightSelection function
 * @param {number[]} index Indexes that are to be highlighted
 * @param {ArrayDiagram} arrayDiagram Array diagram whose items are to be highlighted
 * @param {Object} properties Transformation properties for highlight transformations
 */
export async function highlight(index, arrayDiagram, properties) {
	//Selection to be highlighted
	const selection = d3.selectAll(
		index.map((item) => arrayDiagram.items.nodes()[item])
	);

	const highlightProp = Object.create(HighlightTransformProp);
	highlightProp.stagger = properties.stagger;
	highlightProp.easing = properties.easing;
	highlightProp.duration = totalDuration(properties, index.length);

	console.log(highlightProp);

	highlightProp.focus = retrieveValues(highlightProp.focus, properties);
	highlightProp.defocus = retrieveValues(
		highlightProp.defocus,
		arrayDiagram.properties.style.item
	);

	await highlightSelection(selection, highlightProp);
}
