//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { highlightSelection } from '../transformations/highlight';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Wrapper function for select.
 * @param {number[]} index Indexes that are to be selected
 * @param {ArrayDiagram} arrayDiagram Array diagram whose items are to be selected
 * @param {Object} properties Transformation properties for select transformations
 */
export async function select(index, arrayDiagram, properties) {
	//Selection to be highlighted
	const selection = d3.selectAll(index.map((item) => arrayDiagram.items.nodes()[item]));

	properties.duration = calculateTotalDuration(properties, index.length);
	await highlightSelection(selection, properties);
}
