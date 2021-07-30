import * as d3 from "d3";
import { color } from "../../Auxillary/Color";

/**
 * The function accepts a d3 selection that is to be highlighted,
 * total duration of highlight animation, successive delays between
 * each highlight and color of each highlight. Leave the delay 
 * argument if you want all the selections to be highlighted together. 
 * @param {d3.Selection} selection D3 selection that is to be highlighted
 * @param {number} duration Total duration of the highlight animation for each array item
 * @param {number} delay Delay between successive highlights. Use 0 to highlight everything at once
 * @param {string} selColor Color to be used for highlighting
 * @returns {Promise} Returns a promise that resolves when all highlight transitions are completed
 */
export async function hightlightArrayElement(selection, duration=1000, delay=0, selColor=color.BLUE) {
    //Store all the promises returned by the various transitions in this variable
    const transitionPromise = [];

    //Get the item size of the item that are to be highlighted
    const itemSize = selection.select(".array-item-rect").node().getAttribute("width");

    //How to highlight the rect within each array item
    transitionPromise.push(
        selection
        .select(".array-item-rect")
        .transition(duration/2)
        .delay((data, index) => index * delay)
        .style("transform", "scale(1.1)")
        .style("fill", selColor)
        .transition(duration/2)
        .style("transform", "scale(1.0)")
        .style("fill", color.GREY)
        .end()
    );
    
    //How to highlight the text within each array item
    transitionPromise.push(
        selection
        .select(".array-item-text")
        .transition(duration/2)
        .delay((data, index) => index * delay)
        .style("transform", "scale(1.1)")
        .transition(duration/2)
        .style("transform", "scale(1.0)")
        .end()
    );

    //Wait for all the transition promises to resolve
    return await Promise.all(transitionPromise);
}
