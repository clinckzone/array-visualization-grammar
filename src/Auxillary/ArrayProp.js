//@ts-check
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

/**
 * ArrayProp object defines the various properties of an array diagram.
 * @param {string} label Label for the array diagram
 * @param {{x: number; y: number}} position X and Y position where the array diagram will be placed
 * @param {number} itemSize Size of each array item
 * @param {number} padding Padding space between each array item
 * @param {d3.Selection} svgContainer d3 selection for the svg container
 */
export const ArrayProp = {
	label: 'Array',
	id: uuidv4(),
	position: {
		x: 10,
		y: 20,
	},
	itemSize: 30,
	padding: 10,
	svgContainer: d3.select('#svg-container'),
};
