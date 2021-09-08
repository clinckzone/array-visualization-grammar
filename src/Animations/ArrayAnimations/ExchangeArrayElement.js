//@ts-check
import * as d3 from 'd3';
import { translateArrayElement } from './TranslateArrayElement';
import { updateArrayDiagram } from './UpdateArrayDiagram';

/**
 *
 * @param {Array} indexesToExchange
 * @param {*} arrayDiagram
 * @param {*} duration
 * @param {*} stagger
 */
export async function exchangeArrayElement(
	indexesToExchange,
	arrayDiagram,
	duration,
	stagger
) {
	if (stagger) {
		for (let i = 0; i < indexesToExchange.length; i++) {
			const startIndexes = indexesToExchange[i];
			const endIndexes = [...startIndexes].reverse();

			const tempArrayData = [...arrayDiagram.data];
			[
				tempArrayData[indexesToExchange[i][0]],
				tempArrayData[indexesToExchange[i][1]],
			] = [
				tempArrayData[indexesToExchange[i][1]],
				tempArrayData[indexesToExchange[i][0]],
			];

			const selection = d3.selectAll(
				startIndexes.map(
					(item, index, array) =>
						arrayDiagram.items.nodes()[array[index]]
				)
			);

			await translateArrayElement(
				selection,
				arrayDiagram,
				arrayDiagram,
				startIndexes,
				endIndexes,
				duration,
				false
			);

			arrayDiagram.data = tempArrayData;
			await updateArrayDiagram(arrayDiagram, 0, false);
		}
	} else {
		let startIndexes = [];
		let endIndexes = [];
		const tempArrayData = [...arrayDiagram.data];

		for (let i = 0; i < indexesToExchange.length; i++) {
			startIndexes = startIndexes.concat(indexesToExchange[i]);
			endIndexes = endIndexes.concat([...indexesToExchange[i]].reverse());

			[
				tempArrayData[indexesToExchange[i][0]],
				tempArrayData[indexesToExchange[i][1]],
			] = [
				tempArrayData[indexesToExchange[i][1]],
				tempArrayData[indexesToExchange[i][0]],
			];
		}

		const selection = d3.selectAll(
			startIndexes.map(
				(item, index, array) => arrayDiagram.items.nodes()[array[index]]
			)
		);

		await translateArrayElement(
			selection,
			arrayDiagram,
			arrayDiagram,
			startIndexes,
			endIndexes,
			duration,
			false
		);

		arrayDiagram.data = tempArrayData;
		await updateArrayDiagram(arrayDiagram, 0, false);
	}
}
