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
	for (let i = 0; i < indexesToExchange.length; i++) {
		const indexes = indexesToExchange[i];
		const selection = d3.selectAll(
			indexes.map(
				(item, index) => arrayDiagram.items.nodes()[indexes[index]]
			)
		);
		const revArr = [...indexes].reverse();
		await translateArrayElement(
			selection,
			arrayDiagram,
			arrayDiagram,
			indexes,
			revArr,
			duration,
			false
		);
		const arrData = arrayDiagram.data;
		const tempData = arrData[indexesToExchange[i][0]];
		arrData[indexesToExchange[i][0]] = arrData[indexesToExchange[i][1]];
		arrData[indexesToExchange[i][1]] = tempData;
		arrayDiagram.data = arrData;

		await updateArrayDiagram(arrayDiagram, 0, false);
	}
}
