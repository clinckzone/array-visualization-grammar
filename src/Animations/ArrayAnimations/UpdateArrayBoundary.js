//@ts-check
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';

/**
 * Update witdh of array's boundary
 * @param {ArrayDiagram} arrayDiagram Array diagram whose boundary needs to be updated
 * @param {number} duration Total duration of the transition
 */
export async function updateArrayBoundary(arrayDiagram, duration) {
	//Create a Promise that resolves when the transition ends
	const updateBoundaryPromise = arrayDiagram.boundary
		.transition()
		.duration(duration / 2)
		.style('opacity', 1.0)
		.attr(
			'width',
			(arrayDiagram.properties.ITEM_SIZE +
				arrayDiagram.properties.PADDING) *
				arrayDiagram.data.length +
				arrayDiagram.properties.PADDING
		)
		.end();

	return updateBoundaryPromise;
}
