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
        this.data = data;
        this.properties = properties;

        this.DIAGRAM_ID = uuidv4(); 
        
        this.svgContainerRef = d3.select("#svg-container");
        this.arrayBoundary = this.initializeArrayBoundary();
        this.arrayLabel = this.initializeArrayLabel();
        
        //Initialize the array diagram
        this.update(this.properties.INIT_TIME);
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
        .style("transform", 'translate()')
        .style("opacity", 0.0);

        return boundary;
    }

    /**
     * Updates the array diagram's boundary width and the items that are in the array diagram
     * @param {number} updateTime Total time for updating the array
     * @param {boolean} stagger Should there be delay between successive highlights?
     * @returns {d3.Selection} D3 selction of <g> elements in the array diagram 
     */
    update(updateTime, stagger=false) {

        //Update the array's boundary width
        this.updateBoundary(updateTime/3);

        //Update the items that are in the array diagram
        const items = this.svgContainerRef
        .selectAll(`g.array-item-${this.DIAGRAM_ID}`)
        .data(this.data, (data) => data.key)
        .join(
            enter => addArrayElement(enter, this.properties.ITEM_SIZE, updateTime, stagger)
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
                .duration(updateTime)
                .attr("transform", (data, index) => `translate(${arrayItemPosition(index, this.properties).x}, ${arrayItemPosition(index, this.properties).y})`)
            },
            exit => removeArrayElement(exit, updateTime, stagger)
                .transition()
                .delay(updateTime)
                .remove()
        );
        
        //Update the reference to array items
        this.arrayItems = items;

        return items;
    }

    /**
     * Update witdh of array's boundary
     */
    updateBoundary(updateTime) {
        return this.arrayBoundary
        .transition()
        .duration(updateTime/2)
        .style("opacity", 1.0)
        .attr("width", (this.properties.ITEM_SIZE + this.properties.PADDING) * this.data.length + this.properties.PADDING);
    }
}
