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
        this.data = new DataStructureSpec(rawSpec.data);
        this.transform = new TransformSpec(rawSpec.transform);
        //Animation properties will be added later
    }

    interpret() {
        //Bind data to key
        const bindData = this.data.value.map((value) => bindToKey(value));

        //Based on the data, create an array diagram
        const arrayProps = new ArrayProps(this.data.name, new Vector2D(10, 20));
        const arrayDiagram = new ArrayDiagram(bindData, arrayProps);
        
        //Applies the transformation on the array in order
        this.transform.applyTransformation(arrayDiagram);
    }
}
