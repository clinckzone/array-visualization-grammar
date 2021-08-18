import * as d3 from "d3";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";
import { arrayItemPosition } from "../../Auxillary/ArrayHelper/ArrayItemPosition";

/**
 * The functions translates the given selection from its original array 
 * diagram to the new location where a new array diagram will be created.
 * @param {d3.Selection} selection 
 * @param {number[]} fromIndex Indexes of the array items in the startArray that are to be translated from their position
 * @param {number[]} toIndex Indexes in the endArray to which the array items will be translated to
 * @param {ArrayDiagram} startArray The array diagram from where the item will start
 * @param {ArrayDiagram} endArray The array diagram where the item will go to
 * @param {number} duration Total duration of the array in milliseconds.
 */
export async function translateArrayElement(selection, fromIndex, toIndex, startArray, endArray, duration, stagger=false) {
    //An array to store all promises
    const transformationPromises = [];

    //Check if the translation needs to be staggered
    let delay = 0;

    //If that is the case, calculate duration and delay for each item
    if(stagger === true) {
        duration = duration/(selection.size());
        delay = duration;
    }

    //translate each item
    transformationPromises.push(
        selection
        .transition()
        .duration(duration)
        .delay((data, index) => index * delay)
        .tween("itemTween", function(data, index)  {
            //A d3 line generator function
            const lineGenerator = d3.line().curve(d3.curveNatural);

            //Start and end point of translation
            const itemPathEndPoints = [
                [arrayItemPosition(fromIndex[index], startArray.properties).x, arrayItemPosition(fromIndex[index], startArray.properties).y],
                [arrayItemPosition(toIndex[index], endArray.properties).x, arrayItemPosition(toIndex[index], endArray.properties).y]
            ];

            //Data for the items' path
            const itemPathData = lineGenerator(itemPathEndPoints);

            //xml namespace, not sure what this does ¯\(°_o)/¯
            const xmlns = "http://www.w3.org/2000/svg";

            // //This SVG path object will to represent the trail for the item being translated
            // const itemTrailPath = d3.select("#svg-container")
            //                         .append("path")
            //                         .style("stroke", "rgb(0, 0, 0)");

            //Interpolation function
            const interpolateSVGgroup = (t) => {

                //Create a path SVG node. This SVG node is never appended to the HTML document. 
                //It is meant to be used as a helper.
                let itemPath = document.createElementNS(xmlns, "path");

                //Add data attribute to the path element
                itemPath.setAttribute("d", itemPathData);

                //Get a linearly interpolation function for the parameter t that maps itself to the total length of the svg path  
                let length = d3.interpolateNumber(0, itemPath.getTotalLength());

                //Calculate the distance along the path svg at value t
                const {x, y} = itemPath.getPointAtLength(length(t));

                // //Get the start and end point of the item trail path
                // const itemTrailPathEndPoints = [
                //     [itemPathEndPoints[0][0], itemPathEndPoints[0][1]],
                //     [x, y]
                // ];

                // //Calculate the trail path data for the item
                // const itemTrailPathData = lineGenerator(itemTrailPathEndPoints);

                // //Draw the item path
                // itemTrailPath.attr("d", itemTrailPathData);

                return `translate(${x}, ${y})`;
            }

            return function(t)  {
                return d3.select(this).attr("transform", interpolateSVGgroup(t))
            }
        })
        .end()
    );

    return Promise.all(transformationPromises);
}
