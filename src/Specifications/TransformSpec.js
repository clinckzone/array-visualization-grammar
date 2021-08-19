import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";
import { color } from "../Auxillary/Color";
import { Vector2D } from "../Auxillary/Vector2D";
import { bindToKey } from "../Auxillary/BindKey";
import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { TransformDataSpec } from "./TransformDataSpec";
import { transformType } from "../Auxillary/TransformType";
import { ArrayProps } from "../Auxillary/ArrayHelper/ArrayProps";
import { morphArrayElement } from "../Animations/ArrayAnimations/MorphArrayElements";
import { returnArrayElement } from "../Animations/ArrayAnimations/ReturnArrayElement";
import { highlightArrayElement } from "../Animations/ArrayAnimations/HighlightArrayElement";

export class TransformSpec {
    /**
     * TransformSpec stores all the transformation data inside itself
     * and is able to execute the stored transformation data. 
     * @param {any[]} rawSpec Raw specification for the transformation that are to be applied on the array data
     */
    constructor(rawSpec) {
        this.transformation = rawSpec.map(item => new TransformDataSpec(item));
    }

    /**
     * Applies various tranformations to the passed array
     * @param {ArrayDiagram} arrayDiagram Array Diagram on which transformations will be performed
     */
    async applyTransformation(arrayDiagram) {
        //Initialize the returnArray as null
        let returnArray = null;

        //Go through each 
        for(let i = 0; i < this.transformation.length; i++) {
            //The current transformation
            const transform = this.transformation[i];

            //Match the transformation type
            switch(transform.type) {
                case transformType.ADD:
                {
                    //Sort the items in ascending order
                    transform.args.item.sort((a, b) => (a.index - b.index));
                    
                    //Go through each item in the sorted array and add it in the array diagram
                    for(let i = 0; i < transform.args.item.length; i++) {
                        //Get the value and index of the current item in the array
                        const index = transform.args.item[i].index;
                        const value = transform.args.item[i].value;

                        //Add a new item to the array diagram and update the diagram
                        arrayDiagram.data.splice(index, 0, bindToKey(value));
                    }

                    await arrayDiagram.update(transform.duration, transform.stagger);
                    break;
                }

                case transformType.REMOVE:
                {
                    //Sort the items in descending order
                    transform.args.item.sort((a, b) => (b.index - a.index));

                    //Go through each item in the sorted array and remove it from the array diagram
                    for(let i = 0; i < transform.args.item.length; i++) {
                        //Get the index from the current item
                        const index = transform.args.item[i].index;

                        //Remove the item from the array diagram and update it
                        arrayDiagram.data.splice(index, 1);
                    }
                    await arrayDiagram.update(transform.duration, transform.stagger);

                    break;
                }

                case transformType.UPDATE:
                {
                    //Variable to hold the new array data for the array diagram
                    let arrayData = [];

                    //Create a new array data for the array diagram
                    for(let i = 0; i < transform.args.item.length; i++) {
                        const item = arrayDiagram.data.find(item => item.value === transform.args.item[i].value);
                        arrayData.push(item);
                    }

                    //Assign the new and rearranged array data to the array diagram 
                    arrayDiagram.data = arrayData;
                    await arrayDiagram.update(transform.duration);

                    break;
                }

                case transformType.HIGHLIGHT:
                {
                    //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                    const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));

                    //Highlight thoses elements
                    await highlightArrayElement(selection, transform.duration, transform.stagger, color.BLUE, color.GREY);

                    break;
                }

                case transformType.SELECT:
                {
                    //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                    const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));
                    
                    //Select thoses elements
                    await highlightArrayElement(selection, transform.duration, transform.stagger, color.BLUE, color.GREEN);

                    break;
                }

                case transformType.DESELECT:
                {
                    //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                    const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));

                    //Deselect thoses elements
                    await highlightArrayElement(selection, transform.duration, transform.stagger, color.GREY, color.GREY);

                    break;
                }

                case transformType.RETURN:
                {
                    //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                    const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));
                    
                    //If returnArray is null, then create one
                    if(returnArray === null) {
                        //Create a new Vector2D object to be used as the new position for the new array diagram
                        const returnPosition = new Vector2D(arrayDiagram.properties.POSITION.x, arrayDiagram.properties.POSITION.y + 2.5*arrayDiagram.properties.ITEM_SIZE);
    
                        // Create a new ArrayProp object to be used for translation and for the new array diagram 
                        const returnArrProp = new ArrayProps("Return Value", returnPosition, arrayDiagram.properties.ITEM_SIZE, arrayDiagram.properties.PADDING); 
                        
                        //Get the data that the returned array will store with unique keys
                        const returnArrData = [];
                        for(let i = 0; i < transform.args.item.length; i++) {
                            const data = arrayDiagram.data[i];
                            returnArrData.push({ value: data.value, key: uuidv4() });
                        }

                        //Create a new array that will store returned values
                        returnArray = new ArrayDiagram(returnArrData, returnArrProp);
                    }
                    //If it's not null then add the data corresponding to the returned items in the returnArray with unique keys
                    else {
                        for(let i = 0; i < transform.args.item.length; i++) {
                            const data = arrayDiagram.data[i];
                            returnArray.data.push({ value: data.value, key: uuidv4() });
                        }
                    }

                    //Get the indexes of the items being returned
                    const index = transform.args.item.map(item => item.index);

                    //Return items
                    await returnArrayElement(selection, arrayDiagram, returnArray, index, transform.duration, transform.stagger);
                    
                    break;
                }

                case transformType.COMBINE:
                {
                    
                }

                case transformType.MORPH:
                {
                    //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                    const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));

                    //Get the indexes and values as seperate arrays from transform.args.item
                    const index = transform.args.item.map(item => item.index);
                    const value = transform.args.item.map(item => item.value);

                    //Only change values in the arrayDiagram.data array and not keys
                    for(let i = 0; i < transform.args.item.length; i++) {
                        arrayDiagram.data[index[i]].value = value[i];
                    }

                    //Morph the elements to the corresponding values specified in the arguments
                    await morphArrayElement(selection, value, transform.duration, transform.stagger);
                }
            }
        }

        return returnArray;
    }
}
