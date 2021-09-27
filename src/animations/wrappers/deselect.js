//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { highlightSelection } from '../transformations/highlight';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Wrapper function for deselect.
 * @param {number[]} index Indexes that are to be deselected
 * @param {ArrayDiagram} arrayDiagram Array diagram whose items are to be deselected
 * @param {Object} properties Transformation properties for deselect transformations
 */
export async function deselect(index, arrayDiagram, properties) {
	//Selection to be highlighted
	const selection = d3.selectAll(index.map((item) => arrayDiagram.items.nodes()[item]));

	properties.duration = calculateTotalDuration(properties, index.length);
	await highlightSelection(selection, properties);
}
