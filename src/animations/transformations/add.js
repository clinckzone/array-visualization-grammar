//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../diagrams/array-diagram';

/**
 * The function adds the elements given in the index. With the leftmost item being added first.
 * @param {d3.Selection} selection Array items that are to be created in the array diagram
 * @param {ArrayDiagram} arrayDiagram Size of the array items that need to be created
 * @param {Object} properties Contains various transformation properties
 */
export async function addSelection(selection, arrayDiagram, properties) {
	const transPromises = [];

	//Check if the addition needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (properties.stagger === true) {
		properties.duration = properties.duration / selection.size();
		delay = properties.duration;
	}

	//Add the array items to the svg that are entering.
	//Position them in the array diagram
	const elemEnter = selection
		.append('g')
		.attr('class', `array-item-${arrayDiagram.properties.id}`)
		.attr(
			'transform',
			(data, index) =>
				`translate(
					${arrayDiagram.calculateItemPosition(index).x}, 
					${arrayDiagram.calculateItemPosition(index).y}
				)`
		);

	//Re-arrange the indexes of the selection.
	//The delay will then be calculated correctly.
	const _elemEnter = elemEnter.filter(() => true);

	transPromises.push(
		_elemEnter
			.append('rect')
			.attr('class', 'array-item-rect')
			.style('opacity', 0.0)
			.style('fill', properties.fill)
			.style('stroke', properties.stroke)
			.style('stroke-width', properties.strokeWidth)
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.attr('width', arrayDiagram.properties.style.item.itemSize)
			.attr('height', arrayDiagram.properties.style.item.itemSize)
			.attr('x', -arrayDiagram.properties.style.item.itemSize / 2)
			.attr('y', -arrayDiagram.properties.style.item.itemSize / 2)
			.attr('rx', arrayDiagram.properties.style.item.itemSize / 6)
			.style('opacity', arrayDiagram.properties.style.item.opacity)
			.transition()
			.duration(properties.duration / 2)
			.style('fill', arrayDiagram.properties.style.item.fill)
			.style('stroke', arrayDiagram.properties.style.item.stroke)
			.style('stroke-width', arrayDiagram.properties.style.item.strokeWidth)
			.end()
	);

	transPromises.push(
		_elemEnter
			.append('text')
			.attr('class', 'array-item-text')
			.text((data) => data.value)
			.style('opacity', 0.0)
			.style('font-size', '0px')
			.style('text-anchor', 'middle')
			.style('dominant-baseline', 'middle')
			.style('fill', properties.color)
			.style('font-family', arrayDiagram.properties.style.item.fontFamily)
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.style('opacity', arrayDiagram.properties.style.item.opacity)
			.style('font-size', arrayDiagram.properties.style.item.fontSize)
			.style('font-weight', arrayDiagram.properties.style.item.fontWeight)
			.transition()
			.duration(properties.duration / 2)
			.style('fill', arrayDiagram.properties.style.item.color)
			.end()
	);

	transPromises.push(
		_elemEnter
			.append('text')
			.attr('class', 'array-item-index')
			.attr('y', arrayDiagram.properties.style.item.itemSize / 2)
			.style('opacity', 0.0)
			.style('font-size', '0px')
			.style('text-anchor', 'middle')
			.style('dominant-baseline', 'text-before-edge')
			.style('fill', arrayDiagram.properties.style.index.color)
			.style('font-family', arrayDiagram.properties.style.index.fontFamily)
			.transition()
			.duration(properties.duration / 2)
			.delay((data, index) => index * delay)
			.style('opacity', arrayDiagram.properties.style.index.opacity)
			.style('font-size', arrayDiagram.properties.style.index.fontSize)
			.style('font-weight', arrayDiagram.properties.style.index.fontWeight)
			.end()
	);

	//Updates item index using elemEnter as it
	//has correct index references in it
	elemEnter.select('.array-item-index').text((data, index) => index);

	//Wait for all elements to enter
	await Promise.all(transPromises);
}
