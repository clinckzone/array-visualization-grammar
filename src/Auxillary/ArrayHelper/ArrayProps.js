import { Vector2D } from "../Vector2D";

//@ts-check
export class ArrayProps {
    /**
     * ArrayProps object defines the various properties of an array diagram.
     * @param {string} diagramLabel Label for the array diagram
     * @param {Vector2D} position X and Y position where the array diagram will be placed
     * @param {number} itemSize Size of each array item
     * @param {number} padding Padding space between each array item
     * @param {d3.Selection} svgContainer d3 selection for the svg container
     */
    constructor(diagramLabel, position, itemSize, padding, svgContainer) {
        this.DIAGRAM_LABEL = diagramLabel;
        this.POSITION = position;
        this.ITEM_SIZE = itemSize;
        this.PADDING = padding;
        this.SVG_CONTAINER = svgContainer;
    }
}
