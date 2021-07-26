//@ts-check
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid"; 
import { addArrayElement} from "../Animations/ArrayAnimations/AddArrayElement";
import { HighlightArrayElement } from "../Animations/ArrayAnimations/HighlightArrayElement";
import { removeArrayElement } from "../Animations/ArrayAnimations/RemoveArrayElement";

export class ArrayDiagram {
    
    /**
     * @param {Array} data
     * @param {{label: string; x: number; y: number}} properties
     */
    constructor(data, properties) {
        this.data = data.map((value) => this.bindToKey(value));
        
        this.DIAGRAM_LABEL = properties.label;
        this.X_POS = properties.x;
        this.Y_POS = properties.y;

        this.DIAGRAM_ID = uuidv4(); 
        this.TRANSITION_TIME = 1000;
        this.ITEM_SIZE = 30;
        this.PADDING = 10;
        
        this.svgContainerRef = d3.select("#svg-container");
        this.arrayBoundary = this.initializeArrayBoundary();
        this.arrayLabel = this.initializeArrayLabel();
        this.arrayElements = this.update();
    }

    initializeArrayLabel() {
        //Create a svg text as the label for the diagram
        let label = this.svgContainerRef
        .append("text")
        .attr("class", `array-label-${this.DIAGRAM_ID}`)
        .attr("x", `${this.X_POS}`)
        .attr("y", `${this.Y_POS + this.ITEM_SIZE + 2.5*this.PADDING}`)
        .text(`${this.DIAGRAM_LABEL}`)
        .style("font-size", "10px");

        return label;
    }

    initializeArrayBoundary() {
        //Create a rect svg for the array diagram's boudnary
        let boundary = this.svgContainerRef
        .append("rect")
        .attr("class", `array-boundary-${this.DIAGRAM_ID}`)
        .attr("height", this.ITEM_SIZE + this.PADDING)
        .attr("x", `${this.X_POS}`)
        .attr("y", `${this.Y_POS}`)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "#fafafa")
        .style("stroke", "rgb(0, 0, 0, 0.05)")
        .style("stroke-width", "0.8")
        .style("transform", 'translate()');

        return boundary;
    }

    update() {
        //Update the array's boundary width
        this.updateBoundary();

        //Update the elements that are in the array diagram
        const elements = this.svgContainerRef
        .selectAll(`g.array-element-${this.DIAGRAM_ID}`)
        .data(this.data, (data) => data.key)
        .join(
            enter => addArrayElement(enter, this.ITEM_SIZE, this.TRANSITION_TIME)
                .attr("class", `array-element-${this.DIAGRAM_ID}`)
                .attr("transform", (data, index) => `translate(${this.calcPositionCoord(index).x}, ${this.calcPositionCoord(index).y})`),
            update => update
                .transition()
                .duration(this.TRANSITION_TIME/2)
                .attr("transform", (data, index) => `translate(${this.calcPositionCoord(index).x}, ${this.calcPositionCoord(index).y})`),
            exit => removeArrayElement(exit, this.ITEM_SIZE, this.TRANSITION_TIME/2)
                .transition()
                .delay(this.TRANSITION_TIME/2)
                .remove()
        );

        return elements;
    }

    //Update witdh of array's boundary
    updateBoundary() {
        return this.arrayBoundary
        .transition()
        .duration(this.TRANSITION_TIME/2)
        .attr("width", (this.ITEM_SIZE + this.PADDING) * this.data.length + this.PADDING);
    }

    /**
     * Returns the position of each element in the array diagram
     * @param {number} index
     */
    calcPositionCoord(index) {
        return {
            x: (this.ITEM_SIZE + this.PADDING) * (index + 0.5) + this.PADDING/2 + this.X_POS, 
            y: (this.ITEM_SIZE + this.PADDING)/2 + this.Y_POS
        };
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

    async search() {
        //Get the position of the element in the array
        // @ts-ignore
        let tillThisIndex = this.data.findIndex(element => (element.value == document.getElementById('search-element').value));

        //If its not there then just go through all the elements
        if(tillThisIndex === -1) {
            tillThisIndex = this.data.length - 1;
        }

        const selection = d3.selectAll("svg");
        const foundElement = await HighlightArrayElement.hightlightElement(selection, this, tillThisIndex);
        const properties = {x: this.X_POS, y: this.Y_POS + 2*this.ITEM_SIZE, label: "Return Value"};
        const newArrayDiagram = new ArrayDiagram([this.data[tillThisIndex].value], properties);

        let node = foundElement.node();
        // @ts-ignore
        let nodeCopy = node.cloneNode(true);
        let nodeCopy_ = d3.select(document.getElementById("diagram-container").appendChild(nodeCopy));
        console.log(foundElement);

        nodeCopy_
        .select("rect")
        .style("fill", "#befcb3");
        
        await nodeCopy_
        .transition()
        .duration(2*this.TRANSITION_TIME)
        .tween('elementTween', (data) => {
            const interpolateSVGgroup = d3.interpolateTransformSvg(
                `translate(${this.calcPositionCoord(tillThisIndex).x}, ${this.calcPositionCoord(tillThisIndex).y})`, 
                `translate(${newArrayDiagram.calcPositionCoord(0).x}, ${newArrayDiagram.calcPositionCoord(0).y})`
                );
            return (t) => {
                nodeCopy_
                .attr("transform", interpolateSVGgroup(t))
            }
        }).end();

        nodeCopy_
        .select("rect")
        .transition()
        .duration(this.TRANSITION_TIME)
        .style("fill" , "#dfe5e8");
    }
}
