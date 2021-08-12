import * as d3 from "d3";
import { color } from "../Auxillary/Color";
import { Vector2D } from "../Auxillary/Vector2D";
import { bindToKey } from "../Auxillary/BindKey";
import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { TransformDataSpec } from "./TransformDataSpec";
import { transformType } from "../Auxillary/TransformType";
import { ArrayProps } from "../Auxillary/ArrayHelper/ArrayProps";
import { highlightArrayElement } from "../Animations/ArrayAnimations/HighlightArrayElement";
import { translateArrayElement } from "../Animations/ArrayAnimations/TranslateArrayElement";

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
     * @param {ArrayDiagram} arrayDiagram 
     */
    applyTransformation(arrayDiagram) {
        // Each transformation will be triggered once the previous one is finished. 
        // Since the first one doesn't need any delay, hence 0 for i = 0. 
        let delayTime = 0;

        //Go through each 
        for(let i = 0; i < this.transformation.length; i++) {
            //The current transformation
            const transform = this.transformation[i];

            //Total delay time for each transformation wrt the start of the animation
            if(i !== 0) delayTime += this.transformation[i-1].duration;

            setTimeout(() => {
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

                        arrayDiagram.update(transform.duration, transform.stagger);
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
                        arrayDiagram.update(transform.duration, transform.stagger);

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
                        arrayDiagram.update(transform.duration);

                        break;
                    }

                    case transformType.HIGHLIGHT:
                    {
                        //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                        const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));

                        //Highlight thoses elements
                        highlightArrayElement(selection, transform.duration, transform.stagger, color.BLUE, color.GREY);

                        break;
                    }

                    case transformType.SELECT:
                    {
                        //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                        const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));
                        
                        //Select thoses elements
                        highlightArrayElement(selection, transform.duration, transform.stagger, color.BLUE, color.GREEN);

                        break;
                    }

                    case transformType.DESELECT:
                    {
                        //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                        const selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));

                        //Deselect thoses elements
                        highlightArrayElement(selection, transform.duration, transform.stagger, color.GREY, color.GREY);

                        break;
                    }

                    case transformType.RETURN:
                    {
                        //Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
                        let selection = d3.selectAll(transform.args.item.map((item) => arrayDiagram.arrayItems.nodes()[item.index]));
                        
                        //Create a copy of the selection
                        const copiedNodes = selection.nodes().map(item => item.cloneNode(true));
                        selection = d3.selectAll(copiedNodes.map(item => document.getElementById("svg-container").appendChild(item)));
                        
                        //Remove the indexes of the selection
                        selection.selectAll('.array-item-index').remove();

                        //Remove the old arrayDiagram class identifier from the item
                        selection.classed(`array-item-${arrayDiagram.DIAGRAM_ID}`, false);
                        
                        //Create a new Vector2D object to be used as the new position for the new array diagram
                        const returnPosition = new Vector2D(arrayDiagram.properties.POSITION.x, arrayDiagram.properties.POSITION.y + 2.5*arrayDiagram.properties.ITEM_SIZE);
                        
                        // Create a new ArrayProp object to be used for translation and for the new array diagram 
                        const returnArrProp = new ArrayProps("Return Value", returnPosition, arrayDiagram.properties.ITEM_SIZE, arrayDiagram.properties.PADDING); 
                        
                        //Translate the copied selection from their old position to the new position
                        translateArrayElement(selection, transform.args.item, arrayDiagram.properties, returnArrProp, transform.duration, transform.stagger);
                        
                        // //Get the data being returned
                        // const returnData = [];
                        // for(let i = 0; i < transform.args.item.length; i++) {
                        //     returnData.push(JSON.parse(JSON.stringify(arrayDiagram.data[transform.args.item[i].index])));
                        // }          
                        
                        break;
                    }

                    case transformType.COMBINE:
                    {
                        
                    }

                    case transformType.MORPH:
                    {

                    }
                }
            }, delayTime);
        }
    }
}
