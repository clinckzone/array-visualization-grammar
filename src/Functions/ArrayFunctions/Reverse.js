//@ts-check
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 */
export function reverse(arrayDiagram) {
    arrayDiagram.data.reverse();
    arrayDiagram.update();
}
