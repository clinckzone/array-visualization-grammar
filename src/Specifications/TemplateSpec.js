//@ts-check
import { color } from '../Auxillary/Color';

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
				type: 'morph',
				index: [3, 4, 1],
				value: [10, 23, 82],
			},
			{
				type: 'return',
				index: [1, 0],
			},
			{
				type: 'return',
				index: [0, 1],
			},
		],
		[
			{
				type: 'return',
				index: [0, 1],
			},
			{
				type: 'return',
				index: [1, 0],
			},
		],
	],
	style: {
		theme: {
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
		},
		transform: {
			global: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			initialize: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			add: {
				stroke: 'grey',
				strokeWidth: '1px',
				fill: 'Black',
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			remove: {
				stroke: 'grey',
				strokeWidth: '1px',
				fill: 'Black',
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			update: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			highlight: {
				stroke: 'grey',
				strokeWidth: '1px',
				fill: 'Black',
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			select: {
				stroke: 'grey',
				strokeWidth: '1px',
				fill: 'Black',
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			deselect: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			return: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			combine: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
			morph: {
				stagger: false,
				durationEach: 2000,
				easingFunction: 'easeCubic',
			},
		},
	},
};
