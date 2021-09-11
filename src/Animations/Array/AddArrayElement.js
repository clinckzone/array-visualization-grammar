//@ts-check
import * as d3 from 'd3';
import { color } from '../../Auxillary/Color';
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';

/**
 * The function adds the elements given in the index. With the leftmost item being added first.
 * @param {d3.Selection} selection Array items that are to be created in the array diagram
 * @param {ArrayDiagram} arrayDiagram Size of the array items that need to be created
 * @param {number} duration Total duration of the add animation
 * @param {boolean} stagger Should there be delay between successive additions?
 */
export async function addArrayElement(
	selection,
	arrayDiagram,
	duration,
	stagger
) {
	const transPromises = [];

	//Check if the addition needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (stagger === true) {
		duration = duration / selection.size();
		delay = duration;
	}

	//Add the array items to the svg that are entering.
	//Position them in the array diagram
	const elemEnter = selection
		.append('g')
		.attr('class', `array-item-${arrayDiagram.properties.id}`)
		.attr(
			'transform',
			(data, index) =>
				`translate(${arrayDiagram.calculateItemPosition(index).x}, ${
					arrayDiagram.calculateItemPosition(index).y
				})`
		);

	//Re-arrange the indexes of the selection.
	//The delay will then be calculated correctly.
	const _elemEnter = elemEnter.filter(() => true);

	transPromises.push(
		_elemEnter
			.append('rect')
			.attr('class', 'array-item-rect')
			.style('opacity', 0.0)
			.style('fill', color.ADD)
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('opacity', 1.0)
			.attr('width', arrayDiagram.properties.item.itemSize)
			.attr('height', arrayDiagram.properties.item.itemSize)
			.attr('x', -arrayDiagram.properties.item.itemSize / 2)
			.attr('y', -arrayDiagram.properties.item.itemSize / 2)
			.attr('rx', arrayDiagram.properties.item.itemSize / 6)
			.transition()
			.duration(duration / 2)
			.style('fill', color.ITEM)
			.end()
	);

	transPromises.push(
		_elemEnter
			.append('text')
			.attr('class', 'array-item-text')
			.text((data) => data.value)
			.style('opacity', 0.0)
			.style('font-size', '0px')
			.style('font-family', 'Fira Code, sans-serif')
			.style('text-anchor', 'middle')
			.style('dominant-baseline', 'middle')
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('opacity', 1.0)
			.style('font-size', '14px')
			.end()
	);

	transPromises.push(
		_elemEnter
			.append('text')
			.attr('class', 'array-item-index')
			.attr('y', arrayDiagram.properties.item.itemSize / 2)
			.style('opacity', 0.0)
			.style('font-size', '0px')
			.style('text-anchor', 'middle')
			.style('font-family', 'Fira Code, sans-serif')
			.style('dominant-baseline', 'text-before-edge')
			.style('fill', 'rgb(100, 100, 100)')
			.transition()
			.duration(duration / 2)
			.delay((data, index) => index * delay)
			.style('opacity', 1.0)
			.style('font-size', '10px')
			.end()
	);

	//Updates item index using elemEnter as it
	//has correct index references in it
	elemEnter.select('.array-item-index').text((data, index) => index);

	//Wait for all elements to enter
	await Promise.all(transPromises);
}
