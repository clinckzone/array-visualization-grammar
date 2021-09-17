//@ts-check
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';

/**
 * Update witdh of array's boundary
 * @param {ArrayDiagram} arrayDiagram Array diagram whose boundary needs to be updated
 * @param {number} duration Total duration of the transition
 */
export async function updateBoundary(arrayDiagram, duration) {
	return arrayDiagram.container
		.transition()
		.duration(duration)
		.attr(
			'width',
			(arrayDiagram.properties.style.item['item-size'] +
				arrayDiagram.properties.style.item.padding) *
				arrayDiagram.data.length +
				arrayDiagram.properties.style.item.padding
		)
		.end();
}
