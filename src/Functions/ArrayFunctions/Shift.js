//@ts-check
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 */
export function shift(arrayDiagram) {
    arrayDiagram.data.shift();
    arrayDiagram.update();
}
