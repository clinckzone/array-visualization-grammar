//@ts-check
import * as d3 from "d3";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 */
export function join(arrayDiagram) {
    const text = d3
    .selectAll(".array-item-text");

    const textCopy = 
    //Highlight text
    //Make a DOM copy of the selected items
    //Move the copy to a new place below the array diagram
    //Replace them with new svg text
    text
    .transition()
    .duration(arrayDiagram.TRANSITION_TIME)
    .style("font-size", "18px");
}
