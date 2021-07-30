//@ts-check
import * as d3 from "d3";
import { arrayItemPosition } from "../../Auxillary/ArrayHelper/ArrayItemPosition";
import { ArrayProps } from "../../Auxillary/ArrayHelper/ArrayProps";

/**
 * The functions translates the given selection from its original array 
 * diagram to the new location where a new array diagram will be created.
 * @param {d3.Selection} selection 
 * @param {number} start Starting index of the array item that is to be translated 
 * @param {ArrayProps} oldProp Old position of the array diagram from where the item will start
 * @param {ArrayProps} newProp New Position of the array diagram where the item will go to
 * @param {number} duration Total duration of the array in milliseconds. Defaults to 1000ms
 * @returns {Promise} Returns a promise that resolves when translation animation is complete
 */
export async function translateArrayElement(selection, start, oldProp, newProp, duration=1000) {
    //Get the promise from the transition
    const translationPromise = selection
    .transition()
    .duration(duration)
    .tween("itemTween", function(data, index)  {
        const interpolateSVGgroup = d3.interpolateTransformSvg(
            `translate(${arrayItemPosition(start + index, oldProp).x}, ${arrayItemPosition(start + index, oldProp).y})`, 
            `translate(${arrayItemPosition(index, newProp).x}, ${arrayItemPosition(index, newProp).y})`);

        return function(t)  {
            return d3.select(this).attr("transform", interpolateSVGgroup(t))
        }
    }).end();

    return translationPromise;
}
