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
    }

    /**
     * Create an svg text as the label for the diagram
     * @returns {d3.Selection}
     */
    initializeArrayLabel() {
        const label = this.svgContainerRef
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
        const boundary = this.svgContainerRef
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
     * @returns {Promise<d3.Selection>} D3 selction of <g> elements in the array diagram 
     */
    async update(updateTime, stagger=false) {
        
        //Bind array items to array data
        const items = this.svgContainerRef
        .selectAll(`g.array-item-${this.DIAGRAM_ID}`)
        .data(this.data, (data) => data.key);
        
        //Variables to hold the items that are being added, removed or updated
        let enterElem, exitElem, updateElem;

        //If items are only being added
        if(items.enter().nodes().length !== 0 && items.exit().nodes.length === 0) {

            //Update the array's boundary width
            await this.updateBoundary(updateTime/6);

            //Move the existing items to their new places
            await items.transition()
            .duration(updateTime/6)
            .attr("transform", (data, index) => `translate(${arrayItemPosition(index, this.properties).x}, ${arrayItemPosition(index, this.properties).y})`)
            .end();
            
            //Modify the indexes of each array item 
            items.select(".array-item-index").text((data, index) => index);

            //Add items and merge with update. Remove doesn't do anything as there aren't any elements to remove.  
            enterElem = await addArrayElement(items, this, 2*updateTime/3, stagger);
            exitElem = await removeArrayElement(items, 0, stagger);
            updateElem = enterElem.merge(items);
        }

        //If items are only being removed
        if(items.exit().nodes().length !== 0 && items.enter().nodes.length === 0) {

            //Remove array items
            exitElem = await removeArrayElement(items, 2*updateTime/3, stagger);

            //Move the existing items to their new places
            await items.transition()
            .duration(updateTime/6)
            .attr("transform", (data, index) => `translate(${arrayItemPosition(index, this.properties).x}, ${arrayItemPosition(index, this.properties).y})`)
            .end();

            //Update the array's boundary width
            await this.updateBoundary(updateTime/6);
            
            //Modify the indexes of each array item 
            items.select(".array-item-index").text((data, index) => index);

            //Doesn't do anything as there aren't any elements to add
            enterElem = await addArrayElement(items, this, 0, stagger);
            updateElem = enterElem.merge(items);
        }

        //Update the reference to array items
        this.arrayItems = updateElem;

        return items;
    }

    /**
     * Update witdh of array's boundary
     */
    async updateBoundary(updateTime) {
        return this.arrayBoundary
        .transition()
        .duration(updateTime/2)
        .style("opacity", 1.0)
        .attr("width", (this.properties.ITEM_SIZE + this.properties.PADDING) * this.data.length + this.properties.PADDING)
        .end();
    }
}
