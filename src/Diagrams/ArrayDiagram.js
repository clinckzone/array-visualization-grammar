//@ts-check
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid"; 
import { AddArrayElement } from "../Animations/ArrayAnimations/AddArrayElement";
import { RemoveArrayElements } from "../Animations/ArrayAnimations/RemoveArrayElement";

export class ArrayDiagram {
    
    /**
     * @param {Array} data
     */
    constructor(data) {
        this.data = data.map((value) => this.bindToKey(value));
        
        this.TRANSITION_TIME = 1000;
        this.ITEM_SIZE = 30;
        this.PADDING = 10;

        this.svg = this.initialize();
    }

    /**
     * Binds a key with each array element in the diagram
     * so that it can be uniquely identified by d3.
     * @param {any} value 
     */
    bindToKey(value) {
        return {
            value: value,
            key: uuidv4()
        };
    }

    //Initializes the array diagram from the data passed to it
    initialize() {
        //Create a svg container for the array diagram
        let svg = d3
        .select("#diagram-container")
        .append("svg")
        .attr("height", this.ITEM_SIZE + this.PADDING) 
        .style("border-left", "1px solid rgba(0, 0, 0, 0.1)")
        .style("border-right", "1px solid rgba(0, 0, 0, 0.1)")
        .style("margin-left", `${this.PADDING}`)
        .style("margin-right", `${this.PADDING}`);

        return svg;
    }

    update() {
        //Update svg width
        this.svg
        .transition()
        .duration(this.TRANSITION_TIME)
        .attr("width", (this.ITEM_SIZE + this.PADDING) * this.data.length + this.PADDING);
        
        //Update svg elements
        this.svg
        .selectAll("g")
        .data(this.data, (data) => data.key)
        .join(
            enter => AddArrayElement.addElement(enter, this), 
            update => update
            .transition()
            .duration(this.TRANSITION_TIME/2)
            .attr("transform", (data, index) => `translate(${(this.ITEM_SIZE + this.PADDING) * (index + 0.5) + this.PADDING / 2}, ${(this.ITEM_SIZE + this.PADDING) / 2})`),
            exit => RemoveArrayElements.removeElements(exit, this)
        );
    }

    push() {
        this.data.unshift(this.bindToKey(Math.ceil(Math.random()*50)));
        this.update();
    }

    pop() {
        this.data.pop();
        this.update();
    }
}
