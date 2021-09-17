//@ts-check
import * as d3 from 'd3';
import { TransformProp } from '../../Helpers/Specs/TransformProp';

/**
 * The function removes the items in the selection from the svg.
 * Items at the rightmost index are removed first.
 * @param {d3.Selection} selection Selection that is to be removed from the array diagram
 * @param {TransformProp} properties Contains various transformation properties
 */
export async function removeSelection(selection, properties) {
	const transPromises = [];

	//Check if the removal needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (properties.stagger === true) {
		properties.duration = properties.duration / selection.size();
		delay = properties.duration;
	}

	//Re-arrange the indexes of the selection.
	//The delay will then not be calculated correctly otherwise.
	selection = selection.filter(() => true);

	transPromises.push(
		selection
			.select('.array-item-rect')
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.style('fill', properties.fill)
			.style('stroke', properties.stroke)
			.style('stroke-width', properties['stroke-width'])
			.transition()
			.duration(properties.duration / 2)
			.style('opacity', 0.0)
			.style('transform', 'scale(0.0)')
			.end()
	);

	transPromises.push(
		selection
			.select('.array-item-text')
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.style('fill', properties.color)
			.style('transform', 'scale(1.1)')
			.transition()
			.duration(properties.duration / 2)
			.style('opacity', 0.0)
			.style('transform', 'scale(0.0)')
			.end()
	);

	transPromises.push(
		selection
			.select('.array-item-index')
			.transition()
			.delay((data, index) => properties.duration / 2 + index * delay)
			.style('opacity', 0.0)
			.style('font-size', '0px')
			.end()
	);

	//Wait for all elements to exit
	await Promise.all(transPromises);

	//Remove the exiting elements
	selection.remove();
}
