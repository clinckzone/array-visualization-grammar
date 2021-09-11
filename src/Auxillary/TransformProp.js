//@ts-check
import { color } from './Color';

/**
 * TransformProp object defines the various properties of an array transformation.
 */
export const TransformProp = {
	fill: color.ITEM,
	stroke: color.ITEM,
	strokeWidth: '1px',

	stagger: false,
	duration: 1000,
	easing: 'd3.easeCubic',
};
