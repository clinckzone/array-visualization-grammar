//@ts-check
import { DataStructureSpec } from "./DataStructureSpec";
import { ArrayProps } from '../Auxillary/ArrayHelper/ArrayProps';
import { Vector2D } from "../Auxillary/Vector2D";
import { ArrayDiagram } from '../Diagrams/ArrayDiagram';
import { TransformSpec } from "./TransformSpec";
import { bindToKey } from "../Auxillary/BindKey";

export class InterpreterSpec {
    /**
     * InterpreterSpec takes in the parsed JSON from the JSON editor
     * and interpretes it to make and drive the array animations
     * @param {any} rawSpec The object is obtained by directlty parsing the text from the Json editor
     */
    constructor(rawSpec) {
        //Gets the data structure that we are animating
        this.data = new DataStructureSpec(rawSpec.data);

        //Get the transformations on the data structure
        this.transform = rawSpec.transform.map(item => (new TransformSpec(item)));
        console.log(this.transform);

        //Animation properties will be added later
    }

    async interpret() {
        //Bind data to key
        const bindData = this.data.value.map((value) => bindToKey(value));

        //Based on the data, create an array diagram
        const arrayProps = new ArrayProps(this.data.name, new Vector2D(10, 20), 30, 10);
        let arrayDiagram = new ArrayDiagram(bindData, arrayProps);
        await arrayDiagram.update(this.data.duration);
        
        //Applies the transformation on the array in order
        for(let i = 0; i < this.transform.length; i++){
            console.log(arrayDiagram.data);
            const returnArray = await this.transform[i].applyTransformation(arrayDiagram);
            arrayDiagram = returnArray;
        }  
    }
}
