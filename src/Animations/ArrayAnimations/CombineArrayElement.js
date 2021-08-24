//@ts-check
import * as d3 from "d3";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";
import { translateArrayElement } from "./TranslateArrayElement";

/**
 * Takes in a selection and combines the items in the selection sequentially. 
 * @param {d3.Selection} selection Selection corresponding to the array items that are to be combined 
 * @param {Array} combineIndexes Indexes of the array items that are to be combined
 * @param {ArrayDiagram} arrayDiagram Array Diagram where the combination will happen
 * @param {number} duration Duration of the transformation
 * @param {boolean} stagger Is this even necessary?
 */
export async function combineArrayElement(selection, combineIndexes, arrayDiagram, duration, stagger) {
    const startIndex = combineIndexes[0];
    const toIndex = combineIndexes[1];

    console.log(`${startIndex} -> ${toIndex}`);

    await translateArrayElement(selection, [startIndex], [toIndex], arrayDiagram, arrayDiagram, duration, stagger);
}
