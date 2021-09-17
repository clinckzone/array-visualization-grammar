//@ts-check
/**
 * The function highlights the selection passed to it either
 * sequencially or everything together.
 * @param {d3.Selection} selection D3 selection that is to be highlighted
 * @param {Object} properties Contains various transformation properties
 */
export async function highlightSelection(selection, properties) {
	const transPromises = [];

	//Check if the highlighting needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (properties.stagger === true) {
		properties.duration = properties.duration / selection.size();
		delay = properties.duration;
	}

	//How to highlight the rect within each array item
	transPromises.push(
		selection
			.select('.array-item-rect')
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.style('fill', properties.focus.fill)
			.style('stroke', properties.focus.stroke)
			.style('stroke-width', properties.focus['stroke-width'])
			.transition()
			.duration(properties.duration / 2)
			.style('transform', 'scale(1.0)')
			.style('fill', properties.defocus.fill)
			.style('stroke', properties.defocus.stroke)
			.style('stroke-width', properties.defocus['stroke-width'])
			.end()
	);

	//How to highlight the text within each array item
	transPromises.push(
		selection
			.select('.array-item-text')
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.style('transform', 'scale(1.1)')
			.style('fill', properties.focus.color)
			.transition()
			.duration(properties.duration / 2)
			.style('transform', 'scale(1.0)')
			.style('fill', properties.defocus.color)
			.end()
	);

	await Promise.all(transPromises);
}
