//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { highlightSelection } from '../transformations/highlight';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Wrapper function for highlight.
 * @param {number[]} index Indexes that are to be highlighted
 * @param {ArrayDiagram} arrayDiagram Array diagram whose items are to be highlighted
 * @param {Object} properties Transformation properties for highlight transformations
 */
export async function highlight(index, arrayDiagram, properties) {
	//Selection to be highlighted
	const selection = d3.selectAll(index.map((item) => arrayDiagram.items.nodes()[item]));

	properties.duration = calculateTotalDuration(properties, index.length);
	await highlightSelection(selection, properties);
}
