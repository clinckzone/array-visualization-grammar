//@ts-check
import { color } from '../Enums/Color';

export const TransformProp = {
	global: {
		stagger: false,
		easing: 'easeCubic',
		'duration-each': 2000,
	},
	initialize: {
		fill: color.ADD,
		stroke: color.ADD,
		'stroke-width': '1px',
		color: color.ADD_TEXT,
	},
	update: {
		add: {
			fill: color.ADD,
			stroke: color.ADD,
			'stroke-width': '1px',
			color: color.ADD_TEXT,
		},
		remove: {
			fill: color.REMOVE,
			stroke: color.REMOVE,
			'stroke-width': '1px',
			color: color.REMOVE_TEXT,
		},
	},
	add: {
		fill: color.ADD,
		stroke: color.ADD,
		'stroke-width': '1px',
		color: color.ADD_TEXT,
	},
	remove: {
		fill: color.REMOVE,
		stroke: color.REMOVE,
		'stroke-width': '1px',
		color: color.REMOVE_TEXT,
	},
	highlight: {
		fill: color.HIGHLIGHT,
		stroke: color.HIGHLIGHT,
		'stroke-width': '1px',
		color: color.HIGHLIGHT_TEXT,
	},
	select: {
		fill: color.HIGHLIGHT,
		stroke: color.HIGHLIGHT,
		'stroke-width': '1px',
		color: color.HIGHLIGHT_TEXT,
	},
	deselect: {},
	morph: {},
	combine: {},
	exchange: {},
	return: {},
};
