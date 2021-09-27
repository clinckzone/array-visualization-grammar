//@ts-check
/**
 * Morphs the specified selection to the values mentioned in the value argument
 * @param {d3.Selection} selection Items in the array that are to be morphed
 * @param {any} value Values to which the selected items will be morphed to
 * @param {number} duration Total duration of the animation
 * @param {boolean} stagger Do you want the animation to be stagggered?
 */
export async function morphSelection(selection, value, duration, stagger) {
	const transPromises = [];

	//Check if the addition needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (stagger === true) {
		duration = duration / selection.size();
		delay = duration;
	}

	transPromises.push(
		selection
			.select('rect')
			.transition()
			.duration(duration / 4)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.2)')
			.transition()
			.duration((3 * duration) / 8)
			.style('transform', 'scale(0.5) rotate(0.5turn)')
			.transition()
			.duration((3 * duration) / 8)
			.style('transform', 'scale(1.0) rotate(2.0turn)')
			.end()
	);

	transPromises.push(
		selection
			.select('text')
			.transition()
			.duration(duration / 4)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.25)')
			.transition()
			.duration((3 * duration) / 8)
			.style('transform', 'scale(0.5) rotate(0.5turn)')
			.transition()
			.duration((3 * duration) / 8)
			.text((data, index) => value[index])
			.style('transform', 'scale(1.0) rotate(2.0turn)')
			.end()
	);

	await Promise.all(transPromises);
}
