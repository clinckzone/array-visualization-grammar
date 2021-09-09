//@ts-check
import { calcArrayItemPos } from '../../Auxillary/ArrayHelper/CalcArrayItemPos';
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';

/**
 * Updates the position of array elements and their indexes
 * @param {d3.Selection} selection
 * @param {ArrayDiagram} arrayDiagram
 * @param {number} duration
 */
export async function updateArrayElement(selection, arrayDiagram, duration) {
	return selection
		.transition()
		.duration(duration)
		.attr(
			'transform',
			(data, index) =>
				`translate(${
					calcArrayItemPos(index, arrayDiagram.properties).x
				}, ${calcArrayItemPos(index, arrayDiagram.properties).y})`
		)
		.select('.array-item-index')
		.text((data, index) => index)
		.end();
}
