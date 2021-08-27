//@ts-check
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";
import { ArrayProp } from "../Auxillary/ArrayHelper/ArrayProp";

export class ArrayDiagram {
    /**
     * Array Diagram object defines the diagram for an array. Pass it
     * the data and properties in order to initialize the object.
     * @param {any[]} data The data that the array diagram holds and displays
     * @param {ArrayProp} properties ArrayProps object defines the properties of the array diagram
     */
    constructor(data, properties) {
        //Wraps each item in the passed data array into an object containing a key/value pair
        this._data = data.map((item) => {
            return {
                value: item,
                key: uuidv4(),
            };
        });

        this.properties = properties;
        this.arrayLabel = this.initializeArrayLabel();
        this.arrayBoundary = this.initializeArrayBoundary();
        this.arrayItems = d3.select(`array-item-${this.properties.DIAGRAM_ID}`);
    }

    /**
     * Sets the data that the array diagram holds and displays
     */
    set data(data) {
        //Makes sure that each item in the passed data array is wrapped into an object containing a key/value pair
        this._data = data.map((item) => {
            if (item.key !== undefined) {
                return item;
            } else {
                return {
                    value: item,
                    key: uuidv4(),
                };
            }
        });
    }

    /**
     * Returns the data that the array diagram holds and displays
     */
    get data() {
        return this._data;
    }

    /**
     * Create an svg text as the label for the diagram
     * @returns {d3.Selection}
     */
    initializeArrayLabel() {
        const label = this.properties.SVG_CONTAINER.append("text")
            .attr("class", `array-label-${this.properties.DIAGRAM_ID}`)
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
        const boundary = this.properties.SVG_CONTAINER.append("rect")
            .attr("class", `array-boundary-${this.properties.DIAGRAM_ID}`)
            .attr(
                "height",
                this.properties.ITEM_SIZE + 2 * this.properties.PADDING
            )
            .attr("x", `${this.properties.POSITION.x}`)
            .attr("y", `${this.properties.POSITION.y}`)
            .attr("rx", 0.1 * this.properties.ITEM_SIZE)
            .attr("ry", 0.1 * this.properties.ITEM_SIZE)
            .style("fill", "#fafafa")
            .style("stroke", "rgb(0, 0, 0, 0.05)")
            .style("stroke-width", "0.8")
            .style("transform", "translate()")
            .style("opacity", 0.0);

        return boundary;
    }

    /**
     * Binds a key with each array item in the diagram
     * so that it can be uniquely identified by d3.
     * @param {any} value
     * @returns {{key:string; value: any}}
     */
    bindToKey(value) {
        return {
            value: value,
            key: uuidv4(),
        };
    }
}
