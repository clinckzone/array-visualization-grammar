//@ts-check
import { addArrayElement } from "./AddArrayElement";
import { updateArrayBoundary } from "./UpdateArrayBoundary";

import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";

import { arrayItemPosition } from "../../Auxillary/ArrayHelper/ArrayItemPosition";
import { removeArrayElement } from "./RemoveArrayElement";

/**
 * A function that updates the array diagram's boundary width and the items that are in the array diagram
 * @param {ArrayDiagram} arrayDiagram Array diagram that needs to be updated
 * @param {number} duration Total time for updating the array
 * @param {boolean} stagger Should there be delay between successive highlights?
 * @returns {Promise<d3.Selection>} D3 selction of <g> elements in the array diagram 
 */
export async function updateArrayDiagram(arrayDiagram, duration, stagger) {
    
    //Bind array items to array data
    let updateSelection = arrayDiagram.properties.SVG_CONTAINER
    .selectAll(`g.array-item-${arrayDiagram.DIAGRAM_ID}`)
    .data(arrayDiagram.data, (data) => data.key);
    
    //Enter and exit selections
    let enterSelection = updateSelection.enter();
    let exitSelection = updateSelection.exit();

    //Remove array items
    exitSelection = await removeArrayElement(exitSelection, duration/3, stagger);

    //Update the array's boundary width
    await updateArrayBoundary(arrayDiagram, duration/6);

    //Move the existing items to their new places
    await updateSelection.transition()
    .duration(duration/6)
    .attr("transform", (data, index) => `translate(${arrayItemPosition(index, arrayDiagram.properties).x}, ${arrayItemPosition(index, arrayDiagram.properties).y})`)
    .end();

    //Add array items
    enterSelection = await addArrayElement(enterSelection, arrayDiagram, duration/3, stagger);
    
    //Modify the indexes of each array item 
    updateSelection
    .select(".array-item-index")
    .text((data, index) => index);

    //Merge the update selection with the enter selection
    //Assign it as a reference to the array items of the array diagram 
    arrayDiagram.arrayItems = updateSelection.merge(enterSelection);

    return updateSelection;

}
