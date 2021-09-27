//@ts-check
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { rearrangeSelection } from '../transformations/rearrange';

/**
 * Wrapper for rearrnging the items of an array diagram
 * @param {Array} data
 * @param {ArrayDiagram} arrayDiagram
 * @param {Object} properties
 */
export async function rearrange(data, arrayDiagram, properties) {
	//Update array diagrams' data
	arrayDiagram.data = data;

	//Bind array items to array data
	const updateSel = arrayDiagram.items.data(arrayDiagram.data, (data) => data.key);

	//Move the existing items to their new places
	await rearrangeSelection(updateSel, arrayDiagram, properties);
}
