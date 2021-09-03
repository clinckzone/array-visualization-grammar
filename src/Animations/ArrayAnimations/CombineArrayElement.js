//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';
import { morphArrayElement } from './MorphArrayElement';
import { removeArrayElement } from './RemoveArrayElement';
import { translateArrayElement } from './TranslateArrayElement';
import { updateArrayDiagram } from './UpdateArrayDiagram';

/**
 * Takes in a selection and combines the items in the selection sequentially.
 * @param {Array} indexesToCombine Indexes of the array items that are to be combined
 * @param {Array} valuesToReplace
 * @param {ArrayDiagram} arrayDiagram Array Diagram where the combination will happen
 * @param {number} duration Duration of the transformation
 * @param {boolean} stagger Is this even necessary?
 */
export async function combineArrayElement(
	indexesToCombine,
	valuesToReplace,
	arrayDiagram,
	duration,
	stagger
) {
	const startIndexes = indexesToCombine.map((item, index) => item[0]);
	const endIndexes = indexesToCombine.map((item, index) => item[1]);

	const startSel = d3.selectAll(
		startIndexes.map(
			(item, index, array) => arrayDiagram.items.nodes()[array[index]]
		)
	);

	const endSel = d3.selectAll(
		endIndexes.map(
			(item, index, array) => arrayDiagram.items.nodes()[array[index]]
		)
	);

	await translateArrayElement(
		startSel,
		arrayDiagram,
		arrayDiagram,
		startIndexes,
		endIndexes,
		duration,
		stagger
	);

	let data = arrayDiagram.data;
	data = data.filter((item, index) => !startIndexes.includes(index));
	arrayDiagram.data = data;

	await updateArrayDiagram(arrayDiagram, duration, stagger);
}
