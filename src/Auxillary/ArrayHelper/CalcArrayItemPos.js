//@ts-check
import { ArrayProp } from './ArrayProp';

/**
 * The function returns the x and y position of array item
 * within the array diagram
 * @param {number} itemIndex Position of the item within the array
 * @param {ArrayProp} arrayProps ArrayProp object of the array diagram
 * @returns {{x: number; y: number}} Calculated X and Y position of the array item
 */
export function calcArrayItemPos(itemIndex, arrayProps) {
	return {
		x: (arrayProps.ITEM_SIZE + arrayProps.PADDING) * (itemIndex + 0.5) + arrayProps.PADDING / 2 + arrayProps.POSITION.x,
		y: (arrayProps.ITEM_SIZE + arrayProps.PADDING) / 2 + arrayProps.POSITION.y,
	};
}
