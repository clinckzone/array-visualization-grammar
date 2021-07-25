//@ts-check
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 * @param {number} start 
 * @param {number} deleteCount 
 * @param  {...any} items 
 */
export function splice(arrayDiagram, start, deleteCount, ...items) {
    arrayDiagram.data.splice(start, deleteCount, ...items);
    arrayDiagram.update();
}
