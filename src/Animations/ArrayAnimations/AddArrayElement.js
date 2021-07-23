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
        const elemEnter = selection
        .append("g")
        .attr("class", `array-element-${context.DIAGRAM_ID}`)
        .attr("transform", (data, index) => `translate(${context.calcPositionCoord(index).x}, ${context.calcPositionCoord(index).y})`);

        elemEnter
        .append("rect")
        .style("fill", "#befcb3")
        .style("opacity", 0.0)
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .attr("width", context.ITEM_SIZE)
        .attr("height", context.ITEM_SIZE)
        .attr("x", -context.ITEM_SIZE/2)
        .attr("y", -context.ITEM_SIZE/2)
        .attr("rx", 5)
        .style("opacity", 1.0)
        .transition()
        .duration(context.TRANSITION_TIME)
        .style("fill", "#dfe5e8")
        
        elemEnter
        .append("text")
        .style("font-size", "0px")
        .style("font-family", "Fira Code, sans-serif")
        .style("dominant-baseline", "middle")
        .style("text-anchor", "middle")
        .style("opacity", 0.0)
        .transition()
        .duration(context.TRANSITION_TIME/2)
        .style("font-size", "14px")
        .style("opacity", 1.0)
        .text((data) => data.value)

        return elemEnter;
    }
}
