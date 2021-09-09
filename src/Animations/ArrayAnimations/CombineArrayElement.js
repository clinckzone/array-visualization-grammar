//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';
import { morphArrayElement } from './MorphArrayElement';
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
	if (stagger) {
		const startIndexes = indexesToCombine.map((item, index) => item[0]);

		for (let i = 0; i < indexesToCombine.length; i++) {
			const startIndex = [indexesToCombine[i][0]];
			const endIndex = [indexesToCombine[i][1]];
			const value = [valuesToReplace[i]];

			const startSel = d3.selectAll(
				startIndex.map(
					(item, index, array) =>
						arrayDiagram.items.nodes()[array[index]]
				)
			);

			startSel.select('.array-item-index').remove();

			const endSel = d3.selectAll(
				endIndex.map(
					(item, index, array) =>
						arrayDiagram.items.nodes()[array[index]]
				)
			);

			await translateArrayElement(
				startSel,
				arrayDiagram,
				arrayDiagram,
				startIndex,
				endIndex,
				duration,
				false
			);

			await morphArrayElement(endSel, value, duration, stagger);
		}

		let tempData = [...arrayDiagram.data];
		startIndexes.forEach((item, index) => {
			tempData[item].value = valuesToReplace[index];
		});
		tempData = tempData.filter(
			(item, index) => !startIndexes.includes(index)
		);

		arrayDiagram.data = tempData;
		await updateArrayDiagram(arrayDiagram, duration, stagger);
	} else {
		const startIndexes = indexesToCombine.map((item, index) => item[0]);
		const endIndexes = indexesToCombine.map((item, index) => item[1]);

		const startSel = d3.selectAll(
			startIndexes.map(
				(item, index, array) => arrayDiagram.items.nodes()[array[index]]
			)
		);

		startSel.select('.array-item-index').remove();

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
			false
		);

		let tempData = [...arrayDiagram.data];
		startIndexes.forEach((item, index) => {
			tempData[item].value = valuesToReplace[index];
		});
		tempData = tempData.filter(
			(item, index) => !startIndexes.includes(index)
		);

		arrayDiagram.data = tempData;
		const morphPromise = morphArrayElement(
			endSel,
			valuesToReplace,
			duration,
			stagger
		);
		const updatePromise = updateArrayDiagram(
			arrayDiagram,
			duration,
			stagger
		);

		await Promise.all([morphPromise, updatePromise]);
	}
}
