import { bindToKey } from "../Auxillary/BindKey";
import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { TransformDataSpec } from "./TransformDataSpec";
import { highlightArrayElement } from "../Animations/ArrayAnimations/HighlightArrayElement";
import { transformType } from "../Auxillary/TransformType";
import { color } from "../Auxillary/Color";

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
                        transform.item.sort((a, b) => (a.index - b.index));
                        
                        //Go through each item in the sorted array and add it in the array diagram
                        for(let i = 0; i < transform.item.length; i++) {
                            //Get the value and index of the current item in the array
                            const index = transform.item[i].index;
                            const value = transform.item[i].value;

                            //Add a new item to the array diagram and update the diagram
                            arrayDiagram.data.splice(index, 0, bindToKey(value));
                        }

                        arrayDiagram.update(transform.duration, transform.stagger);
                        break;
                    }

                    case transformType.REMOVE:
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
                        arrayDiagram.update(transform.duration, transform.stagger);

                        break;
                    }

                    case transformType.UPDATE:
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
                        arrayDiagram.update(transform.duration);

                        break;
                    }

                    case transformType.HIGHLIGHT:
                    {
                        //Select the items in the array diagram that you want to highlight
                        const selection = arrayDiagram.arrayItems.filter((data, index) => transform.item.some(item => item.index === index));

                        //Highlight thoses elements
                        highlightArrayElement(selection, transform.duration, transform.stagger, color.BLUE, color.GREY);

                        break;
                    }

                    case transformType.SELECT:
                    {
                        //Select the items in the array diagram that you want to highlight
                        const selection = arrayDiagram.arrayItems.filter((data, index) => transform.item.some(item => item.index === index));
                        
                        //Select thoses elements
                        highlightArrayElement(selection, transform.duration, transform.stagger, color.BLUE, color.GREEN);

                        break;
                    }
                    case transformType.DESELECT:
                    {
                        //Select the items in the array diagram that you want to highlight
                        const selection = arrayDiagram.arrayItems.filter((data, index) => transform.item.some(item => item.index === index));

                        //Deselect thoses elements
                        highlightArrayElement(selection, transform.duration, transform.stagger, color.GREY, color.GREY);

                        break;
                    }
                }
            }, delayTime);
        }
    }
}
