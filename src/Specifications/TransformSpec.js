import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { TransformDataSpec } from "./TransformDataSpec";

//@ts-check
export class TransformSpec {
    /**
     * TransformSpec stores all the transformation data inside itself
     * and is able to execute the stored transformation data. 
     * @param {any[]} rawSpec Raw specification for the transformation that are to be applied on the array data
     */
    constructor(rawSpec) {
        this.transformation = rawSpec.map(item => new TransformDataSpec(item));
        console.log(this.transformation);
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
                    break;
                }
                case "remove":
                {
                    break;
                }
                case "update":
                {
                    break;
                }
            }
        }
    }
}
