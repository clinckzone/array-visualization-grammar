//@ts-check
/**
 * The function highlights the selection passed to it either
 * sequencially or everything together.
 * @param {d3.Selection} selection D3 selection that is to be highlighted
 * @param {number} duration Total duration of the highlight animation for each array item
 * @param {boolean} stagger Should there be delay between successive highlights?
 * @param {string} highColor Color to be used for highlighting
 */
export async function highlightArrayElement(
	selection,
	duration,
	stagger,
	highColor,
	selColor
) {
	const transPromises = [];

	//Check if the highlighting needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (stagger === true) {
		duration = duration / selection.size();
		delay = duration;
	}

	//How to highlight the rect within each array item
	transPromises.push(
		selection
			.select('.array-item-rect')
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.style('fill', highColor)
			.transition()
			.duration(duration / 2)
			.style('transform', 'scale(1.0)')
			.style('fill', selColor)
			.end()
	);

	//How to highlight the text within each array item
	transPromises.push(
		selection
			.select('.array-item-text')
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.transition()
			.duration(duration / 2)
			.style('transform', 'scale(1.0)')
			.end()
	);

	await Promise.all(transPromises);
}
