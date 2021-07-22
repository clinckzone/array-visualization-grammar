import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";
import * as d3 from "d3";

//@ts-check
export class HighlightArrayElement {

    /**
     * @param {d3.Selection} selection 
     * @param {ArrayDiagram} context 
     */
    static hightlightElement(selection, context, tillThisIndex) {

        //Selection here represents an array of groups within the svg.
        selection
        .selectAll("rect")
        .filter((data, index) => index <= tillThisIndex)
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .delay((data, index) => index*1000)
        .attr("width", context.ITEM_SIZE*1.1)
        .attr("height", context.ITEM_SIZE*1.1)
        .attr("x", -context.ITEM_SIZE*1.1/2)
        .attr("y", -context.ITEM_SIZE*1.1/2)
        .style("fill", "#99d8fc")
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .style("fill", "#dfe5e8")
        .attr("width", context.ITEM_SIZE)
        .attr("height", context.ITEM_SIZE)
        .attr("x", -context.ITEM_SIZE/2)
        .attr("y", -context.ITEM_SIZE/2);

        selection
        .selectAll("text")
        .filter((data, index) => index <= tillThisIndex)
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .delay((data, index) => index*1000)
        .style("font-size", "16px")
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .style("font-size", "14px");
    }
}
