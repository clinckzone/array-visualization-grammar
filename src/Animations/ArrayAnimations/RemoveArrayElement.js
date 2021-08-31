//@ts-check
import * as d3 from 'd3';
import { color } from '../../Auxillary/Color';

/**
 * The function removes the items in the selection from the svg.
 * Items at the rightmost index are removed first.
 * @param {d3.Selection} exitSelection Selection that is to be removed from the array diagram
 * @param {number} duration Total duration of the remove animation
 * @param {boolean} stagger Should there be delay between successive removals?
 * @returns {Promise<d3.Selection>} Returns a d3 selection of items that are to be removed from the array diagram
 */
export async function removeArrayElement(exitSelection, duration, stagger) {
	//Reference to elements that are being removed
	let exitElem = exitSelection;

	//An array to store all promises
	const transformationPromises = [];

	//Check if the removal needs to be staggered
	let delay = 0;

	//If that is the case, calculate duration and delay for each item
	if (stagger === true) {
		duration = duration / exitSelection.size();
		delay = duration;
	}

	//Re-arrange the indexes of the selection. Without rearranging the indexes, their
	//indexes will remain same as the one that they have in the original array diagram.
	//Hence, the delay will then not be calculated correctly.
	exitElem = exitElem.filter(() => true);

	transformationPromises.push(
		exitElem
			.select('.array-item-rect')
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.style('fill', color.REMOVE_DEFAULT)
			.transition()
			.duration(duration / 2)
			.style('transform', 'scale(0.0)')
			.style('opacity', 0.0)
			.end()
	);

	transformationPromises.push(
		exitElem
			.select('.array-item-text')
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.transition()
			.duration(duration / 2)
			.style('transform', 'scale(0.0)')
			.style('opacity', 0.0)
			.end()
	);

	transformationPromises.push(
		exitElem
			.select('.array-item-index')
			.transition()
			.delay((data, index) => duration / 2 + index * delay)
			.style('font-size', '0px')
			.style('opacity', 0.0)
			.end()
	);

	//Wait for all elements to exit
	await Promise.all(transformationPromises);

	//Remove the exiting elements
	exitElem.remove();

	return exitElem;
}
