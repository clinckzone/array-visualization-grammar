//@ts-check
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 */
export function push(arrayDiagram, item) {
    arrayDiagram.data.push(item);
    arrayDiagram.update();
}
