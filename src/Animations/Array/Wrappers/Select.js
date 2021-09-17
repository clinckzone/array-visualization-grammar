//@ts-check
import * as d3 from 'd3';
import { retrieveValues } from '../../../Helpers/Functions/RetrieveValues';
import { totalDuration } from '../../../Helpers/Functions/TotalDuration';
import { HighlightTransformProp } from '../../../Helpers/Specs/HighlightTransformProp';
import { highlightSelection } from '../HighlightSelection';
import { ArrayDiagram } from '../../../Diagrams/ArrayDiagram';

/**
 * Wrapper function for select. It mainly preprocesses the select transformation
 * properties before passing it to the highlightSelection function
 * @param {number[]} index Indexes that are to be selected
 * @param {ArrayDiagram} arrayDiagram Array diagram whose items are to be selected
 * @param {Object} properties Transformation properties for select transformations
 */
export async function select(index, arrayDiagram, properties) {
	//Selection to be highlighted
	const selection = d3.selectAll(
		index.map((item) => arrayDiagram.items.nodes()[item])
	);

	const selectProp = Object.create(HighlightTransformProp);
	selectProp.stagger = properties.stagger;
	selectProp.easing = properties.easing;
	selectProp.duration = totalDuration(properties, index.length);

	selectProp.focus = retrieveValues(selectProp.focus, properties);
	selectProp.defocus = retrieveValues(selectProp.defocus, properties);

	await highlightSelection(selection, selectProp);
}
