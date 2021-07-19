//@ts-check
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid"; 

export class ArrayDiagram {
    
    /**
     * @param {Array} data
     * @param {Object} properties
     */
    constructor(data, properties) {
        this.data = data.map((value) => this.bindToKey(value));
        this.properties = properties;
        this.svg = this.initialize();
        this.TRANSITION_TIME = 1000;
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
        .attr("height", this.properties.ITEM_SIZE + this.properties.PADDING) 
        .style("border-left", "1px solid rgba(0, 0, 0, 0.1)")
        .style("border-right", "1px solid rgba(0, 0, 0, 0.1)")
        .style("margin-left", `${this.properties.PADDING}`)
        .style("margin-right", `${this.properties.PADDING}`);

        return svg;
    }

    update() {
        //Update svg width
        this.svg
        .transition()
        .duration(this.TRANSITION_TIME)
        .attr("width", (this.properties.ITEM_SIZE + this.properties.PADDING) * this.data.length + this.properties.PADDING);

        //Update svg elements
        this.svg
        .selectAll("g")
        .data(this.data, (data) => data.key)
        .join(this.addElements.bind(this), this.updateElements.bind(this), this.removeElements.bind(this));
    }

    addElements(selection) {
        let elemEnter = selection
        .append("g")
        .attr("transform", (data, index) => `translate(${(this.properties.ITEM_SIZE + this.properties.PADDING) * (index + 0.5) + this.properties.PADDING / 2}, ${(this.properties.ITEM_SIZE + this.properties.PADDING) / 2})`);
        
        elemEnter
        .append("rect")
        .style("fill", "#befcb3")
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .attr("width", this.properties.ITEM_SIZE)
        .attr("height", this.properties.ITEM_SIZE)
        .attr("x", -this.properties.ITEM_SIZE / 2)
        .attr("y", -this.properties.ITEM_SIZE / 2)
        .attr("rx", 5)
        .transition()
        .duration(this.TRANSITION_TIME)
        .style("fill", "#dfe5e8")

        elemEnter
        .append("text")
        .style("font-size", "0px")
        .style("font-family", "Fira Code, sans-serif")
        .style("dominant-baseline", "middle")
        .style("text-anchor", "middle")
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .style("font-size", "14px")
        .text((data) => data.value);

        return elemEnter;
    }

    updateElements(selection) {
        let updateElem = selection
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .attr("transform", (data, index) => `translate(${(this.properties.ITEM_SIZE + this.properties.PADDING) * (index + 0.5) + this.properties.PADDING / 2}, ${(this.properties.ITEM_SIZE + this.properties.PADDING) / 2})`);
        
        return updateElem;
    }

    removeElements(selection) {
        /**
         * Used sort of a hack to get around the problem of 
         * triggering transitions in chain. I want to come up
         * with a more concrete and independent implementation.
         **/

        let removeElem = selection
        .transition()
        .duration(1*this.TRANSITION_TIME);

        selection
        .selectAll("rect")
        .transition()
        .duration(this.TRANSITION_TIME/3)
        .attr("width", this.properties.ITEM_SIZE*1.1)
        .attr("height", this.properties.ITEM_SIZE*1.1)
        .attr("x", -this.properties.ITEM_SIZE*1.1 / 2)
        .attr("y", -this.properties.ITEM_SIZE*1.1 / 2)
        .style("fill", "#f9aeb7")
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 0.0);

        selection
        .selectAll("text")
        .transition()
        .duration(this.TRANSITION_TIME/4)
        .style("font-size", "18px")
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .style("font-size", "0px")
        .style("opacity", 0.0);

        return removeElem.remove();
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
