//@ts-check
import * as d3 from "d3";
import { color } from "../../Misc/colors";

export class AddArrayElement {
    
    /**
     * @param {d3.Selection} selection
     * @param {number} elementSize
     * @param {number} duration
     * @returns {d3.Selection}
     */
    static addElement(selection, elementSize, duration) {
        //Add the elements the svg that are entering
        const elemEnter = selection.append("g");

        elemEnter
        .append("rect")
        .style("opacity", 0.0)
        .style("fill", color.GREEN)
        .transition()
        .duration(duration/2)
        .style("opacity", 1.0)
        .attr("width", elementSize)
        .attr("height", elementSize)
        .attr("x", -elementSize/2)
        .attr("y", -elementSize/2)
        .attr("rx", 5)
        .transition()
        .duration(duration/2)
        .style("fill", color.GREY)
        
        elemEnter
        .append("text")
        .text((data) => data.value)
        .style("opacity", 0.0)
        .style("font-size", "0px")
        .style("font-family", "Fira Code, sans-serif")
        .style("text-anchor", "middle")
        .style("dominant-baseline", "middle")
        .transition()
        .duration(duration/2)
        .style("opacity", 1.0)
        .style("font-size", "14px")

        return elemEnter;
    }
}
