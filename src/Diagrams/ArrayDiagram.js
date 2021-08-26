//@ts-check
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid"; 
import { ArrayProps } from "../Auxillary/ArrayHelper/ArrayProps";

export class ArrayDiagram {
    
    /**
     * Array Diagram object defines the diagram for an array. Pass it
     * the data and properties in order to initialize the object.
     * @param {number[]} data  Data that the array diagram holds and displays
     * @param {ArrayProps} properties ArrayProps object defines the properties of the array diagram
     */
    constructor(data, properties) {
        this.data = data;
        this.properties = properties;

        this.DIAGRAM_ID = uuidv4(); 
        
        this.arrayBoundary = this.initializeArrayBoundary();
        this.arrayLabel = this.initializeArrayLabel();
        this.arrayItems = null;
    }

    /**
     * Create an svg text as the label for the diagram
     * @returns {d3.Selection}
     */
    initializeArrayLabel() {
        const label = this.properties.SVG_CONTAINER
        .append("text")
        .attr("class", `array-label-${this.DIAGRAM_ID}`)
        .attr("x", `${this.properties.POSITION.x}`)
        .attr("y", `${this.properties.POSITION.y}`)
        .text(`${this.properties.DIAGRAM_LABEL}`)
        .style("dominant-baseline", "text-after-edge")
        .style("font-size", "12px");

        return label;
    }

    /**
     * Create a rect svg for the array diagram's boundary
     * @returns {d3.Selection}
     */
    initializeArrayBoundary() {
        const boundary = this.properties.SVG_CONTAINER
        .append("rect")
        .attr("class", `array-boundary-${this.DIAGRAM_ID}`)
        .attr("height", this.properties.ITEM_SIZE + 2*this.properties.PADDING)
        .attr("x", `${this.properties.POSITION.x}`)
        .attr("y", `${this.properties.POSITION.y}`)
        .attr("rx", 0.1*this.properties.ITEM_SIZE)
        .attr("ry", 0.1*this.properties.ITEM_SIZE)
        .style("fill", "#fafafa")
        .style("stroke", "rgb(0, 0, 0, 0.05)")
        .style("stroke-width", "0.8")
        .style("transform", 'translate()')
        .style("opacity", 0.0);

        return boundary;
    }
}
