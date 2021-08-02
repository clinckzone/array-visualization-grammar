import * as d3 from "d3";
import { hightlightArrayElement } from "../../Animations/ArrayAnimations/HighlightArrayElement";
import { translateArrayElement } from "../../Animations/ArrayAnimations/TranslateArrayElement";
import { ArrayProps } from "../../Auxillary/ArrayHelper/ArrayProps";
import { color } from "../../Auxillary/Color";
import { Vector2D } from "../../Auxillary/Vector2D";
import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

/**
 * @param {ArrayDiagram} arrayDiagram
 */
export async function find(arrayDiagram, searchItem) {
    //Get the position of the item that is to be searched in the array
    let foundItemIndex = arrayDiagram.data.findIndex(item => (item.value == searchItem));

    //Was the item found in the array?
    let foundFlag = true;

    //If its not there then just go through all the items
    if(foundItemIndex === -1) {
        foundItemIndex = arrayDiagram.data.length - 1;
        foundFlag = false;
    }

    //Select the found array item as well as all array items that come before it 
    const itemSelection = d3.selectAll(`g.array-item-${arrayDiagram.DIAGRAM_ID}`)
                            .filter((data, index) => index <= foundItemIndex);

    //**Parametrize the duration of highlight and the delay**
    //Sequentially highlight all the selected array items
    await hightlightArrayElement(itemSelection, false, 1000);

    //Depending upon whether the item was found in the array or not, run two different animations
    if(foundFlag) {
        //Create a copy of the found items' DOM node
        const copiedNode = itemSelection.filter((data, index) => index === foundItemIndex).node().cloneNode(true);
        const copiedItem = d3.select(document.getElementById("svg-container").appendChild(copiedNode));

        //Remove the index from the copied array items
        d3.selectAll(copiedItem).selectChildren(".array-item-index").remove();

        //Create a new Vector2D object to be used as the new position for the new array diagram
        const newArrayPosition = new Vector2D(arrayDiagram.properties.POSITION.x, arrayDiagram.properties.POSITION.y + 2.5*arrayDiagram.properties.ITEM_SIZE);
        
        //Create a new ArrayProp object to be used for translation and for the new array diagram 
        const newArrayProp = new ArrayProps("Sliced Array",
                                            newArrayPosition,
                                            arrayDiagram.properties.ITEM_SIZE,
                                            arrayDiagram.properties.PADDING);

        //**Parametrize the duration of translation**
        //Translate the newly created items to a new place within the svg
        await translateArrayElement(copiedItem, foundItemIndex, arrayDiagram.properties, newArrayProp); 
    }
    else {
        //**Parametrize the duration of highlight**
        //Highlight all the elements red at once.
        await hightlightArrayElement(itemSelection, false, color.RED);
    }
}
