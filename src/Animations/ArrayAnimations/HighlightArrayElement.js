import * as d3 from "d3";
import { color } from "../../Auxillary/Color";

/**
 * The function accepts a d3 selection that is to be highlighted,
 * total duration of highlight animation, successive delays between
 * each highlight and color of each highlight. Leave the delay 
 * argument if you want all the selections to be highlighted together. 
 * @param {d3.Selection} selection D3 selection that is to be highlighted
 * @param {boolean} keepSel Do you want to keep the highlilghted item selected?
 * @param {number} delay Delay between successive highlights. Use 0 to highlight everything at once
 * @param {number} duration Total duration of the highlight animation for each array item
 * @param {string} highColor Color to be used for highlighting
 * @param {string} selColor Color to be used for selection
 * @returns {Promise} Returns a promise that resolves when all highlight transitions are completed
 */
export async function hightlightArrayElement(selection, keepSel=false, delay=0, duration=1000, highColor=color.BLUE, selColor=color.GREEN) {
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
        .style("fill", highColor)
        .transition(duration/2)
        .style("transform", "scale(1.0)")
        .style("fill", (keepSel) ? color.GREEN : color.GREY)
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
