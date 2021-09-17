//@ts-check
import { ArrayDiagram } from '../../../Diagrams/ArrayDiagram';
import { add } from './Add';

/**
 * Wrapper for array diagram initialization
 * @param {any[]} value Sequence of values that are to be initialized as an array diagram
 * @param {ArrayDiagram} arrayDiagram Array diagram where the values will be initialized
 * @param {Object} properties Contains styling properties for initialization
 */
export async function initialize(value, arrayDiagram, properties) {
	const item = value.map((item, index) => ({ value: item, index: index }));
	await add(item, arrayDiagram, properties);
}
