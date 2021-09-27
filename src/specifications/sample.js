//@ts-check
import { colors } from '../helpers/enums/colors';

export const sampleSpec = {
	data: ['Array'],
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
			{
				type: 'exchange',
				index: [
					[
						[0, 1],
						[2, 3],
					],
					[
						[0, 1],
						[2, 3],
					],
				],
			},
		],
	],
	style: {
		diagram: {
			label: {
				'font-family': 'Fira Sans',
				'font-size': '12px',
				'font-weight': 'normal',
				color: colors.LABEL,
				opacity: 1.0,
			},

			container: {
				fill: colors.CONTAINER,
				stroke: colors.CONTAINER,
				'stroke-width': '1px',
				opacity: 1.0,
			},

			index: {
				'font-family': 'Fira Sans',
				'font-size': '10px',
				'font-weight': 'normal',
				color: colors.INDEX,
				opacity: 1.0,
			},

			item: {
				fill: colors.ITEM,
				stroke: colors.ITEM,
				'stroke-width': '1px',
				color: colors.ITEM_TEXT,
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
				fill: colors.ADD,
				stroke: colors.ADD,
				'stroke-width': '1px',
				color: colors.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			add: {
				fill: colors.ADD,
				stroke: colors.ADD,
				'stroke-width': '1px',
				color: colors.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			remove: {
				fill: colors.REMOVE,
				stroke: colors.REMOVE,
				'stroke-width': '1px',
				color: colors.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			update: {
				add: {
					fill: colors.ADD,
					stroke: colors.ADD,
					'stroke-width': '1px',
					color: colors.ITEM_TEXT,
				},
				remove: {
					fill: colors.REMOVE,
					stroke: colors.REMOVE,
					'stroke-width': '1px',
					color: colors.ITEM_TEXT,
				},
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			highlight: {
				fill: colors.HIGHLIGHT,
				stroke: colors.HIGHLIGHT,
				'stroke-width': '1px',
				color: colors.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			select: {
				fill: colors.HIGHLIGHT,
				stroke: colors.HIGHLIGHT,
				'stroke-width': '1px',
				color: colors.ITEM_TEXT,
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			deselect: {
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 2000,
			},
			exchange: {
				stagger: false,
				easing: 'easeCubic',
				'duration-each': 500,
			},
		},
	},
};

const spec = {
	data: {
		initialize: ['A', 'B', 'C'],
		derive: ['D', 'E'],
	},

	transform: [
		{
			type: 'initialize',
			start: ['A', 'A', 'B', 'B', 'C', 'C'],
			value: [23, 45, 73, 50, 55, 63],
		},

		{
			type: 'derive',
			start: ['D', 'D', 'D', 'E', 'E', 'E'],
			index: [0, 1, 2, 0, 1, 2],
			from: ['A', 'B', 'C', 'C', 'B', 'A'],
		},

		{
			type: 'add',
			start: ['A', 'B', 'A', 'B', 'C'],
			index: [1, 3, 5, 2, 4],
			value: [23, 65, 45, 93, 63],
		},

		{
			type: 'remove',
			start: ['A', 'B', 'A', 'B', 'C'],
			index: [1, 3, 5, 2, 4],
		},

		{
			type: 'update',
			start: [],
			index: [],
		},

		{
			type: 'highlight',
			start: ['A', 'B', 'A', 'B', 'C'],
			index: [1, 3, 5, 2, 4],
		},

		{
			type: 'select',
			start: ['A', 'B', 'A', 'B', 'C'],
			index: [1, 3, 5, 2, 4],
		},

		{
			type: 'deselect',
			start: ['A', 'B', 'A', 'B', 'C'],
			index: [1, 3, 5, 2, 4],
		},

		{
			type: 'morph',
			start: ['A', 'B', 'C'],
			index: [1, 2, 3],
			value: [23, 53, 93],
		},

		{
			type: 'return',
			start: ['A', 'B', 'C'],
			end: ['B', 'B', 'C'],
			index: [
				[2, 1],
				[4, 6],
				[5, 2],
			],
		},

		{
			type: 'combine',
			start: ['A', 'A', 'B', 'C'],
			end: ['B', 'B', 'C', 'C'],
			index: [
				[2, 1],
				[4, 6],
				[5, 2],
				[0, 2],
			],
		},

		{
			type: 'exchange',
			start: ['A', 'A', 'B', 'C'],
			end: ['B', 'B', 'C', 'C'],
			index: [
				[2, 1],
				[4, 6],
				[5, 2],
				[0, 2],
			],
		},
	],
};
