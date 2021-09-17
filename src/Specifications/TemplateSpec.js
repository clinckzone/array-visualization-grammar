//@ts-check
import { color } from '../Helpers/Enums/Color';

export const templateSpec = {
	data: {
		name: 'Arr',
		type: 'array',
	},
	transform: [
		[
			{
				type: 'initialize',
				value: [12, 45, 67, 78, 89],
			},
			{
				type: 'add',
				index: [3, 4, 1],
				value: [10, 23, 82],
			},
		],
	],
	style: {
		diagram: {
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
		},
		transform: {
			global: {
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			initialize: {
				fill: color.ADD,
				stroke: color.ADD,
				'stroke-width': '1px',
				color: color.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			add: {
				fill: color.ADD,
				stroke: color.ADD,
				'stroke-width': '1px',
				color: color.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			remove: {
				fill: color.REMOVE,
				stroke: color.REMOVE,
				'stroke-width': '1px',
				color: color.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			update: {
				add: {
					fill: color.ADD,
					stroke: color.ADD,
					'stroke-width': '1px',
					color: color.ITEM_TEXT,
				},
				remove: {
					fill: color.REMOVE,
					stroke: color.REMOVE,
					'stroke-width': '1px',
					color: color.ITEM_TEXT,
				},
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			highlight: {
				fill: color.HIGHLIGHT,
				stroke: color.HIGHLIGHT,
				'stroke-width': '1px',
				color: color.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			select: {
				fill: color.HIGHLIGHT,
				stroke: color.HIGHLIGHT,
				'stroke-width': '1px',
				color: color.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			deselect: {
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
		},
	},
};
