//@ts-check
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 * @param {number} start 
 * @param {number} deleteCount 
 * @param  {...any} items 
 */
export function splice(arrayDiagram, start, deleteCount, ...items) {
    console.log(items);
    arrayDiagram.data.splice(start, deleteCount, ...items.map(item => arrayDiagram.bindToKey(item)));
    arrayDiagram.update();
}
