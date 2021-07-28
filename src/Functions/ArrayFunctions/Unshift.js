//@ts-check
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram
 * @param {any} item
 */
export function unshift(arrayDiagram, item) {
    arrayDiagram.data.unshift(arrayDiagram.bindToKey(item));
    arrayDiagram.update();
}
