//@ts-check
import * as d3 from 'd3';
import { color } from '../Enums/Color';
import { v4 as uuidv4 } from 'uuid';

/**
 * Styling properties for the array diagram
 */
export const ArrayDiagramStyle = {
	label: {
		'font-family': 'Fira Sans',
		'font-size': '12px',
		'font-weight': 'normal',
		color: color.LABEL,
		opacity: 1.0,
	},

	container: {
		fill: color.CONTAINER,
		stroke: color.CONTAINER,
		'stroke-width': '1px',
		opacity: 1.0,
	},

	index: {
		'font-family': 'Fira Sans',
		'font-size': '10px',
		'font-weight': 'normal',
		color: color.INDEX,
		opacity: 1.0,
	},

	item: {
		fill: color.ITEM,
		stroke: color.ITEM,
		'stroke-width': '1px',
		color: color.ITEM_TEXT,
		'font-family': 'Arial',
		'font-size': '14px',
		'font-weight': 'normal',
		'item-size': 30,
		padding: 10,
		opacity: 1.0,
	},
};

/**
 * This object defines the various properties of an array diagram.
 */
export const ArrayProp = {
	name: 'Array',
	id: uuidv4(),
	svg: d3.select('#svg-container'),

	position: {
		x: 10,
		y: 20,
	},

	style: null,
};
