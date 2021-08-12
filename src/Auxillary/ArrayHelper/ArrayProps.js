import { Vector2D } from "../Vector2D";

//@ts-check
export class ArrayProps {
    /**
     * ArrayProps object defines the various properties of an array diagram.
     * @param {string} diagramLabel Label for the array diagram
     * @param {Vector2D} position X and Y position where the array diagram will be placed
     * @param {number} itemSize Size of each array item
     * @param {number} padding Padding space between each array item
     */
    constructor(diagramLabel="Array", position, itemSize=30, padding=10, initTime=0) {
        this.DIAGRAM_LABEL = diagramLabel;
        this.POSITION = position;
        this.ITEM_SIZE = itemSize;
        this.PADDING = padding;
        this.INIT_TIME = initTime;
    }
}
