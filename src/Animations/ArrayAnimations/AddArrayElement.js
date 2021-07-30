import * as d3 from "d3";
import { color } from "../../Auxillary/Color";

/**
 * The function accepts the selections of items that
 * are being created, the size of each array item and 
 * the total duration for the enter animation.
 * @param {d3.Selection} selection Array items that are to be created in the array diagram
 * @param {number} itemSize Size of the array items that need to be created
 * @param {number} duration Total duration of the add animation
 * @returns {d3.Selection} Returns the selection of array items in the diagram that have been newly created
 */
export function addArrayElement(selection, itemSize, duration) {
    //Add the array items to the svg that are entering
    const elemEnter = selection.append("g");

    elemEnter
    .append("rect")
    .attr("class", "array-item-rect")
    .style("opacity", 0.0)
    .style("fill", color.GREEN)
    .transition()
    .duration(duration/2)
    .style("opacity", 1.0)
    .attr("width", itemSize)
    .attr("height", itemSize)
    .attr("x", -itemSize/2)
    .attr("y", -itemSize/2)
    .attr("rx", itemSize/6)
    .transition()
    .duration(duration/2)
    .style("fill", color.GREY);
    
    elemEnter
    .append("text")
    .attr("class", "array-item-text")
    .text((data) => data.value)
    .style("opacity", 0.0)
    .style("font-size", "0px")
    .style("font-family", "Fira Code, sans-serif")
    .style("text-anchor", "middle")
    .style("dominant-baseline", "middle")
    .transition()
    .duration(duration/2)
    .style("opacity", 1.0)
    .style("font-size", "14px");  //**Parametrize the the font size in accordance with the item size**

    elemEnter
    .append("text")
    .attr("class", "array-item-index")
    .text((data, index) => index)
    .attr("y", itemSize/2)
    .style("opacity", 0.0)
    .style("font-size", "0px")
    .style("text-anchor", "middle")
    .style("font-family", "Fira Code, sans-serif")
    .style("dominant-baseline", "text-before-edge")
    .style("fill", "rgb(100, 100, 100)")
    .transition()
    .duration(duration/2)
    .style("opacity", 1.0)
    .style("font-size", "10px"); //**Parametrize the the font size in accordance with the item size**

    return elemEnter;
}
