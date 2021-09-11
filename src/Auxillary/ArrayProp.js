//@ts-check
import * as d3 from 'd3';
import { color } from './Color';
import { v4 as uuidv4 } from 'uuid';

/**
 * ArrayProp object defines the various properties of an array diagram.
 */
export const ArrayProp = {
	name: 'Array',
	id: uuidv4(),
	svgContainer: d3.select('#svg-container'),
	position: {
		x: 10,
		y: 20,
	},
	label: {
		font: 'Fira Sans',
		fontSize: '12px',
		fontWeight: 'normal',
		color: color.LABEL,
		visible: true,
	},
	container: {
		fill: color.CONTAINER,
		stroke: color.CONTAINER,
		strokeWidth: '1px',
		visible: true,
	},
	index: {
		font: 'Fira Sans',
		fontSize: '10px',
		fontWeight: 'normal',
		color: color.INDEX,
		visible: true,
	},
	item: {
		fill: color.ITEM,
		stroke: color.ITEM,
		strokeWidth: '1px',
		font: 'Arial',
		fontSize: '14px',
		fontWeight: 'normal',
		itemSize: 30,
		padding: 10,
		visible: true,
	},
};
