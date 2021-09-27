//@ts-check
import * as d3 from 'd3';
import { rearrange } from './rearrange';
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { translateSelection } from '../transformations/translate';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Wrapper function for exchange transformation
 * @param {Array} indexArray
 * @param {ArrayDiagram} arrayDiagram
 * @param {Object} properties
 */
export async function exchange(indexArray, arrayDiagram, properties) {
	for (let i = 0; i < indexArray.length; i++) {
		const indexes = indexArray[i];

		if (properties.stagger) {
			for (let i = 0; i < indexes.length; i++) {
				const startIndex = indexes[i];
				const endIndex = [...startIndex].reverse();

				const temp = [...arrayDiagram.data];
				[temp[indexes[i][0]], temp[indexes[i][1]]] = [
					temp[indexes[i][1]],
					temp[indexes[i][0]],
				];

				const selection = d3.selectAll(
					startIndex.map((item, index, array) => arrayDiagram.items.nodes()[array[index]])
				);

				properties.translate.duration = calculateTotalDuration(properties, indexes.length);
				await translateSelection(
					selection,
					arrayDiagram,
					arrayDiagram,
					startIndex,
					endIndex,
					properties.translate
				);

				properties.rearrange.duration = 0;
				await rearrange(temp, arrayDiagram, properties.rearrange);
			}
		} else {
			let startIndexes = [];
			let endIndexes = [];
			const temp = [...arrayDiagram.data];

			for (let i = 0; i < indexes.length; i++) {
				startIndexes = startIndexes.concat(indexes[i]);
				endIndexes = endIndexes.concat([...indexes[i]].reverse());
				[temp[indexes[i][0]], temp[indexes[i][1]]] = [
					temp[indexes[i][1]],
					temp[indexes[i][0]],
				];
			}

			const selection = d3.selectAll(
				startIndexes.map((item, index, array) => arrayDiagram.items.nodes()[array[index]])
			);

			properties.translate.duration = calculateTotalDuration(properties, indexes.length);
			await translateSelection(
				selection,
				arrayDiagram,
				arrayDiagram,
				startIndexes,
				endIndexes,
				properties.translate
			);

			properties.rearrange.duration = 0;
			await rearrange(temp, arrayDiagram, properties.rearrange);
		}
	}
}
