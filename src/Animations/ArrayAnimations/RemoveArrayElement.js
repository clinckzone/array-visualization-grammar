//@ts-check
import * as d3 from "d3";
import { color } from "../../Auxillary/Color";

/**
 * The function takes in a selection that is to be removed
 * and the total duration for the remove animation.
 * @param {d3.Selection} selection Selection that is to be removed from the array diagram 
 * @param {number} duration Total duration of the remove animation
 * @returns {d3.Selection} Returns a d3 selection of items that are to be removed from the array diagram
 */
export function removeArrayElement(selection, duration) {

    selection
    .selectAll(".array-item-rect")
    .transition()
    .duration(duration/2)
    .style("transform", "scale(1.1)")
    .style("fill", color.RED)
    .transition()
    .duration(duration/2)
    .style("transform", "scale(0.0)")
    .style("opacity", 0.0);

    selection
    .selectAll(".array-item-text")
    .transition()
    .duration(duration/2)
    .style("transform", "scale(1.1)")
    .transition()
    .duration(duration/2)
    .style("transform", "scale(0.0)")
    .style("opacity", 0.0);

    selection
    .selectAll(".array-item-index")
    .transition()
    .delay(duration/2)
    .style("font-size", "0px")
    .style("opacity", 0.0);

    return selection;
}
