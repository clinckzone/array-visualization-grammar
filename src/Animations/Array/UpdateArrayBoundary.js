//@ts-check
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';

/**
 * Update witdh of array's boundary
 * @param {ArrayDiagram} arrayDiagram Array diagram whose boundary needs to be updated
 * @param {number} duration Total duration of the transition
 */
export async function updateArrayBoundary(arrayDiagram, duration) {
	return arrayDiagram.boundary
		.transition()
		.duration(duration)
		.attr(
			'width',
			(arrayDiagram.properties.itemSize +
				arrayDiagram.properties.padding) *
				arrayDiagram.data.length +
				arrayDiagram.properties.padding
		)
		.end();
}
