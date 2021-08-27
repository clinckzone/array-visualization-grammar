//@ts-check
import * as d3 from "d3";
import { DataSpec } from "./DataSpec";
import { StyleSpec } from "./StyleSpec";
import { AnimationSpec } from "./AnimationSpec";
import { TransformSpec } from "./TransformSpec";
import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { ArrayProp } from "../Auxillary/ArrayHelper/ArrayProp";

export class InterpreterSpec {
    /**
     * InterpreterSpec takes in the parsed JSON from the JSON editor
     * and interpretes it to create and drive the array animations
     * @param {any} rawSpec Raw specifications obtained by directlty parsing the text from the JSON editor
     */
    constructor(rawSpec) {
        //Gets the data structure that we are animating
        this.data = new DataSpec(rawSpec.data);

        //Get the animation settings
        rawSpec.animation =
            rawSpec.animation !== undefined ? rawSpec.animation : {};
        this.animation = new AnimationSpec(rawSpec.animation);

        //Get the style settings
        rawSpec.style = rawSpec.style !== undefined ? rawSpec.style : {};
        this.style = new StyleSpec(rawSpec.style);

        //Get the transformations on the data structure
        rawSpec.transform =
            rawSpec.transform !== undefined ? rawSpec.transform : [];
        this.transform = rawSpec.transform.map(
            (item) => new TransformSpec(item, this.animation, this.style)
        );
    }

    async interpret() {
        //Based on the data, create an array diagram
        const svgContainer = d3.select("#svg-container");
        const arrayProps = new ArrayProp(
            this.data.name,
            { x: 10, y: 20 },
            30,
            10,
            svgContainer
        );
        let arrayDiagram = new ArrayDiagram(this.data.value, arrayProps);

        //Applies the transformation on the array in order
        for (let i = 0; i < this.transform.length; i++) {
            const returnArray = await this.transform[i].applyTransformation(
                arrayDiagram
            );
            try {
                arrayDiagram = returnArray;
            } catch {
                throw "Nothing after this";
            }
        }
    }
}
