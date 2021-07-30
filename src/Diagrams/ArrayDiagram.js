//@ts-check
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid"; 
import { addArrayElement} from "../Animations/ArrayAnimations/AddArrayElement";
import { removeArrayElement } from "../Animations/ArrayAnimations/RemoveArrayElement";
import { arrayItemPosition } from "../Auxillary/ArrayHelper/ArrayItemPosition";
import { ArrayProps } from "../Auxillary/ArrayHelper/ArrayProps";

export class ArrayDiagram {
    
    /**
     * Array Diagram object defines the diagram for an array. Pass it
     * the data and properties in order to initialize the object.
     * @param {any[]} data  Data that the array diagram holds and displays
     * @param {ArrayProps} properties ArrayProps object defines the properties of the array diagram
     */
    constructor(data, properties) {
        this.data = data.map((value) => this.bindToKey(value));
        this.properties = properties;

        this.DIAGRAM_ID = uuidv4(); 
        this.TRANSITION_TIME = 1000; //**Parametrize and externalize this transition time**
        
        this.svgContainerRef = d3.select("#svg-container");
        this.arrayBoundary = this.initializeArrayBoundary();
        this.arrayLabel = this.initializeArrayLabel();
        this.arrayElements = this.update();
    }

    /**
     * Create an svg text as the label for the diagram
     * @returns {d3.Selection}
     */
    initializeArrayLabel() {
        let label = this.svgContainerRef
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
     * Create a rect svg for the array diagram's boudnary
     * @returns {d3.Selection}
     */
    initializeArrayBoundary() {
        let boundary = this.svgContainerRef
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
        .style("transform", 'translate()');

        return boundary;
    }

    /**
     * Updates the array diagram's boundary width and the items that are in the array diagram
     * @returns {d3.Selection} D3 selction of <g> elements in the array diagram 
     */
    update() {
        //Update the array's boundary width
        this.updateBoundary();

        //Update the items that are in the array diagram
        const items = this.svgContainerRef
        .selectAll(`g.array-item-${this.DIAGRAM_ID}`)
        .data(this.data, (data) => data.key)
        .join(
            enter => addArrayElement(enter, this.properties.ITEM_SIZE, this.TRANSITION_TIME)
                .attr("class", `array-item-${this.DIAGRAM_ID}`)
                .attr("transform", (data, index) => `translate(${arrayItemPosition(index, this.properties).x}, ${arrayItemPosition(index, this.properties).y})`),
            update => {
                //Update the array indices
                update
                .select(".array-item-index")
                .text((data, index) => index);

                //Update the array item positions
                return update
                .transition()
                .duration(this.TRANSITION_TIME/2)
                .attr("transform", (data, index) => `translate(${arrayItemPosition(index, this.properties).x}, ${arrayItemPosition(index, this.properties).y})`)
            },
            exit => removeArrayElement(exit, this.TRANSITION_TIME/2)
                .transition()
                .delay(this.TRANSITION_TIME/2)
                .remove()
        );

        return items;
    }

    /**
     * Update witdh of array's boundary
     */
    updateBoundary() {
        return this.arrayBoundary
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .attr("width", (this.properties.ITEM_SIZE + this.properties.PADDING) * this.data.length + this.properties.PADDING);
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
            key: uuidv4()
        };
    }
}
