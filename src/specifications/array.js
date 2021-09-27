//@ts-check
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

/**
 * Default properties of an array diagram.
 */
export const arrayPropSpec = {
	name: 'Array',
	id: uuidv4(),
	svg: d3.select('#svg-container'),

	position: {
		x: 10,
		y: 20,
	},

	style: undefined,
};
