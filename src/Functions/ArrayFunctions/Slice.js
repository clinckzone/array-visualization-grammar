import * as d3 from "d3";
import { hightlightArrayElement } from "../../Animations/ArrayAnimations/HighlightArrayElement";
import { translateArrayElement } from "../../Animations/ArrayAnimations/TranslateArrayElement";
import { ArrayProps } from "../../Auxillary/ArrayHelper/ArrayProps";
import { Vector2D } from "../../Auxillary/Vector2D";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram 
 * @param {number} start 
 * @param {number} end 
 */
export async function slice(arrayDiagram, start, end) {
    //Get the sliced array
    const slicedArray = arrayDiagram.data.slice(start, end).map(item => item.value);

    //Get the items specified in the arguments as a d3 selection
    const itemSelection = d3.selectAll(`g.array-item-${arrayDiagram.DIAGRAM_ID}`)
                            .filter((data, index) => (index >= start && index < end));

    //**Parametrize the duration of highlight**
    //Highlight the selected items
    await hightlightArrayElement(itemSelection); 

    //Create a copy of the selected items
    const copiedNodes = itemSelection.nodes().map(item => item.cloneNode(true));
    const copiedItems = d3.selectAll(copiedNodes.map(item => document.getElementById("svg-container").appendChild(item)));

    //Create a new Vector2D object to be used as the new position for the new array diagram
    const newArrayPosition = new Vector2D(arrayDiagram.properties.POSITION.x, arrayDiagram.properties.POSITION.y + 2.5*arrayDiagram.properties.ITEM_SIZE);
    
    //Create a new ArrayProp object to be used for translation and for the new array diagram 
    const newArrayProp = new ArrayProps("Sliced Array",
                                        newArrayPosition,
                                        arrayDiagram.properties.ITEM_SIZE,
                                        arrayDiagram.properties.PADDING);

    //**Parametrize the duration of translation**
    //Translate the newly created items to a new place within the svg
    await translateArrayElement(copiedItems, start, arrayDiagram.properties, newArrayProp); 

    //Create the sliced array diagram
    const slicedArrayDiagram = new ArrayDiagram(slicedArray, newArrayProp);
}
