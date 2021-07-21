//@ts-check
import * as d3 from "d3";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

export class RemoveArrayElements {

    /**
     * @param {d3.Selection} selection 
     * @param {ArrayDiagram} context 
     * @returns {d3.Transition}
     */
    static removeElements(selection, context) {
        let removeElem = selection
        .transition()
        .duration(0);

        removeElem
        .selectAll("rect")
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .attr("width", context.ITEM_SIZE*1.1)
        .attr("height", context.ITEM_SIZE*1.1)
        .attr("x", -context.ITEM_SIZE*1.1 / 2)
        .attr("y", -context.ITEM_SIZE*1.1 / 2)
        .style("fill", "#f9aeb7")
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .style("opacity", 0.0)
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0);

        removeElem
        .selectAll("text")
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .style("font-size", "18px")
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .style("font-size", "0px")
        .style("opacity", 0.0);

        return removeElem
        .delay(2*context.TRANSITION_TIME)
        .remove();
    } 
}
