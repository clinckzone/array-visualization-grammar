import { bindToKey } from "../Auxillary/BindKey";
import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { TransformDataSpec } from "./TransformDataSpec";

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
        //Go through each 
        for(const transform of this.transformation) {
            switch(transform.type) {
                case "add":
                {
                    //Sort the items in ascending order
                    transform.item.sort((a, b) => (a.index - b.index));
                    
                    //Go through each item in the sorted array and add it in the array diagram
                    for(let i = 0; i < transform.item.length; i++) {
                        //Get the value and index of the current item in the array
                        const index = transform.item[i].index;
                        const value = transform.item[i].value;

                        //Add a new item to the array diagram and update the diagram
                        arrayDiagram.data.splice(index, 0, bindToKey(value));
                    }
                    arrayDiagram.update();
                    break;
                }
                case "remove":
                {
                    //Sort the items in descending order
                    transform.item.sort((a, b) => (b.index - a.index));

                    //Go through each item in the sorted array and remove it from the array diagram
                    for(let i = 0; i < transform.item.length; i++) {
                        //Get the index from the current item
                        const index = transform.item[i].index;

                        //Remove the item from the array diagram and update it
                        arrayDiagram.data.splice(index, 1);
                    }
                    arrayDiagram.update();
                    break;
                }
                case "update":
                {
                    //Variable to hold the new array data for the array diagram
                    let arrayData = [];

                    //Create a new array data for the array diagram
                    for(let i = 0; i < transform.item.length; i++) {
                        const item = arrayDiagram.data.find(item => item.value === transform.item[i].value);
                        
                        arrayData.push(item);
                    }

                    //Assign the new and rearranged array data to the array diagram 
                    arrayDiagram.data = arrayData;
                    arrayDiagram.update();
                    break;
                }
            }
        }
    }
}
