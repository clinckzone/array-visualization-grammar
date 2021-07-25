//@ts-check
import * as d3 from "d3";
import { color } from "../../Misc/colors";

export class RemoveArrayElement {

    /**
     * @param {d3.Selection} selection 
     * @param {number} itemSize
     * @param {number} duration
     * @returns {d3.Selection}
     */
    static removeElement(selection, itemSize, duration) {
        const removeElem = selection;

        removeElem
        .selectAll("rect")
        .transition()
        .duration(duration/2)
        .attr("width", itemSize*1.1)
        .attr("height", itemSize*1.1)
        .attr("x", -itemSize*1.1/2)
        .attr("y", -itemSize*1.1/2)
        .style("fill", color.RED)
        .transition()
        .duration(duration/2)
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 0.0);

        removeElem
        .selectAll("text")
        .transition()
        .duration(duration/2)
        .style("font-size", "18px")
        .transition()
        .duration(duration/2)
        .style("font-size", "0px")
        .style("opacity", 0.0);

        return removeElem;
    } 
}
