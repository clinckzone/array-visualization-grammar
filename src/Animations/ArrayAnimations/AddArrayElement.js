//@ts-check
import * as d3 from "d3";
import { color } from "../../Auxillary/Color";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";
import { calcArrayItemPos } from "../../Auxillary/ArrayHelper/CalcArrayItemPos";

/**
 * The function adds the elements given in the index. With the leftmost item being added first.
 * @param {d3.Selection} enterSelection Array items that are to be created in the array diagram
 * @param {ArrayDiagram} arrayDiagram Size of the array items that need to be created
 * @param {number} duration Total duration of the add animation
 * @param {boolean} stagger Should there be delay between successive additions?
 * @returns {Promise<d3.Selection>} Returns the selection of array items in the diagram that have been newly created
 */
export async function addArrayElement(enterSelection, arrayDiagram, duration, stagger) {
    
    //An array to store all promises
    const transformationPromises = [];

    //Check if the addition needs to be staggered
    let delay = 0;

    //If that is the case, calculate duration and delay for each item
    if(stagger === true) {
        duration = duration/(enterSelection.size());
        delay = duration;
    }

    //Add the array items to the svg that are entering
    const elemEnter = enterSelection.append("g");

    //Arranging the position of array items in the array
    elemEnter
    .attr("class", `array-item-${arrayDiagram.properties.DIAGRAM_ID}`)
    .attr("transform", (data, index) => `translate(${calcArrayItemPos(index, arrayDiagram.properties).x}, ${calcArrayItemPos(index, arrayDiagram.properties).y})`);


    //Re-arrange the indexes of the selection. Without rearranging the indexes, their
    //indexes will remain same as the one that they have in the original array diagram.
    //Hence, the delay will then be calculated correctly.
    const elemEnter_filtered = elemEnter.filter(() => true);

    //Appends svg rect as item container to the item being added
    transformationPromises.push( 
        elemEnter_filtered
        .append("rect")
        .attr("class", "array-item-rect")
        .style("opacity", 0.0)
        .style("fill", color.GREEN)
        .transition()
        .duration(duration/2)
        .delay((data, index) => index * delay)
        .style("opacity", 1.0)
        .attr("width", arrayDiagram.properties.ITEM_SIZE)
        .attr("height", arrayDiagram.properties.ITEM_SIZE)
        .attr("x", -arrayDiagram.properties.ITEM_SIZE/2)
        .attr("y", -arrayDiagram.properties.ITEM_SIZE/2)
        .attr("rx", arrayDiagram.properties.ITEM_SIZE/6)
        .transition()
        .duration(duration/2)
        .style("fill", color.GREY)
        .end()
    );
    
    //Appends svg text as value to the array item being added
    transformationPromises.push(
        elemEnter_filtered
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
        .delay((data, index) => index * delay)
        .style("opacity", 1.0)
        .style("font-size", "14px") 
        .end()
    );  

    //Appends svg text as index to the array item being added
    transformationPromises.push(
        elemEnter_filtered
        .append("text")
        .attr("class", "array-item-index")
        .attr("y", arrayDiagram.properties.ITEM_SIZE/2)
        .style("opacity", 0.0)
        .style("font-size", "0px")
        .style("text-anchor", "middle")
        .style("font-family", "Fira Code, sans-serif")
        .style("dominant-baseline", "text-before-edge")
        .style("fill", "rgb(100, 100, 100)")
        .transition()
        .duration(duration/2)
        .delay((data, index) => index * delay)
        .style("opacity", 1.0)
        .style("font-size", "10px")
        .end()
    );

    //Updates item index using elemEnter as it 
    //has correct index references in it
    elemEnter
    .select(".array-item-index")
    .text((data, index) => index);

    //Wait for all promises to resolve
    await Promise.all(transformationPromises);

    //Return the reference to entering elements
    return elemEnter;
}
