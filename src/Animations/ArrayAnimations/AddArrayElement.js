//@ts-check
import * as d3 from "d3";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

export class AddArrayElement {
    
    /**
     * @param {d3.Selection} selection 
     * @param {ArrayDiagram} context 
     * @returns {d3.Selection}
     */
    static addElement(selection, context) {
        let elemEnter = selection
        .append("g")
        .attr("transform", (data, index) => `translate(${(context.ITEM_SIZE + context.PADDING) * (index + 0.5) + context.PADDING / 2}, ${(context.ITEM_SIZE + context.PADDING) / 2})`);

        elemEnter
        .append("rect")
        .style("fill", "#befcb3")
        .transition()
        .duration(context.TRANSITION_TIME)
        .attr("width", context.ITEM_SIZE)
        .attr("height", context.ITEM_SIZE)
        .attr("x", -context.ITEM_SIZE / 2)
        .attr("y", -context.ITEM_SIZE / 2)
        .attr("rx", 5)
        .transition()
        .duration(context.TRANSITION_TIME)
        .style("fill", "#dfe5e8");

        elemEnter
        .append("text")
        .style("font-size", "0px")
        .style("font-family", "Fira Code, sans-serif")
        .style("dominant-baseline", "middle")
        .style("text-anchor", "middle")
        .transition()
        .duration(context.TRANSITION_TIME)
        .style("font-size", "14px")
        .text((data) => data.value);

        return elemEnter;
    }
}
