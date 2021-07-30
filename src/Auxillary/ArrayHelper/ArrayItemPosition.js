//@ts-check
import { Vector2D } from "../Vector2D";
import { ArrayProps } from "./ArrayProps";

/**
 * The function returns the x and y position of array item 
 * within the array diagram
 * @param {number} itemIndex Position of the item within the array 
 * @param {ArrayProps} arrayProps ArrayProp object of the array diagram
 * @returns {Vector2D} Calculated X and Y position of the array item
 */
export function arrayItemPosition(itemIndex, arrayProps) {
    return new Vector2D((arrayProps.ITEM_SIZE + arrayProps.PADDING) * (itemIndex + 0.5) + arrayProps.PADDING/2 + arrayProps.POSITION.x,
                        (arrayProps.ITEM_SIZE + arrayProps.PADDING)/2 + arrayProps.POSITION.y);
}
