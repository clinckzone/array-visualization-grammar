import * as d3 from 'd3';
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';
import { translateArrayElement } from './TranslateArrayElement';
import { updateArrayDiagram } from './UpdateArrayDiagram';

/**
 * Creates a copy of the elements that are being returned and translates them
 * to the array being returned
 * @param {ArrayDiagram} arrayDiagram The array diagram from which you want to return elements
 * @param {ArrayDiagram} returnArray The array diagram which will contain the returned elements
 * @param {number[]} index The indexes of the selected items
 * @param {number} duration The total duration of the transformation
 * @param {boolean} stagger Do you want the transformation animation staggered?
 */
export async function returnArrayElement(arrayDiagram, returnArray, index, duration, stagger) {
	//Map the indexes to nodes in arrayItems of the arrayDiagram
	let selection = d3.selectAll(index.map((item) => arrayDiagram.arrayItems.nodes()[item]));

	//Create a copy of the selection
	const copiedNodes = selection.nodes().map((item) => item.cloneNode(true));
	selection = d3.selectAll(copiedNodes.map((item) => document.getElementById('svg-container').appendChild(item)));

	//Remove the old arrayDiagram class identifier from the item
	selection.classed(`array-item-${arrayDiagram.properties.DIAGRAM_ID}`, false);

	//Get the length of the selection
	const selLength = index.length;

	//Indexes of the array items in the arrayDiagram that are to be translated from their position
	const fromIndex = index;

	//Indexes in the returnArray to which the array items will be translated to
	const toIndex = returnArray.data.map((item, index, array) => array.length - selLength + index);

	//Translate the copied selection from their old position to the new position
	await translateArrayElement(selection, arrayDiagram, returnArray, fromIndex, toIndex, (3 * duration) / 4, stagger);

	//Make the copied selection recognizable by the returned
	//array by changing its class and the bound datum
	selection.attr('class', `array-item-${returnArray.properties.DIAGRAM_ID}`);
	selection.datum((data, index) => returnArray.data[toIndex[index]]);
	selection.raise();

	await updateArrayDiagram(returnArray, duration / 4, stagger);
}
