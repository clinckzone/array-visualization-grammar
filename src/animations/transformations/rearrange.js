//@ts-check
import { ArrayDiagram } from '../../diagrams/array-diagram';

/**
 * Rearranges the position of array elements and their indexes
 * @param {d3.Selection} selection
 * @param {ArrayDiagram} arrayDiagram
 * @param {Object} properties
 */
export async function rearrangeSelection(selection, arrayDiagram, properties) {
	//Check if the removal needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (properties.stagger === true) {
		properties.duration = properties.duration / selection.size();
		delay = properties.duration;
	}

	return selection
		.transition()
		.duration(properties.duration)
		.delay((data, index) => index * delay)
		.attr(
			'transform',
			(data, index) =>
				`translate(
					${arrayDiagram.calculateItemPosition(index).x}, 
					${arrayDiagram.calculateItemPosition(index).y}
				)`
		)
		.select('.array-item-index')
		.text((data, index) => index)
		.end();
}
