//@ts-check
import { color } from "../Auxillary/Color";

export class StyleSpec {
    /**
     * StyleSpec stores all the properties related to the styling properties of the array diagram that will be drawn 
     * @param {Object} rawSpec 
     */
    constructor(rawSpec) {
        this.theme = (rawSpec.theme !== undefined) ? rawSpec.theme : {};

        //Theme properties
        this.theme.itemColor = (this.theme.itemColor !== undefined) ? this.theme.itemColor : color.GREY;
        this.theme.containerColor = (this.theme.containerColor !== undefined) ? this.theme.containerColor : color.LIGHTGREY;
        this.theme.selectColor = (this.theme.selectColor !== undefined) ? this.theme.selectColor : color.GREEN;
        this.theme.highlightColor = (this.theme.highlightColor !== undefined) ? this.theme.highlightColor : color.BLUE;
        this.theme.addColor = (this.theme.addColor !== undefined) ? this.theme.addColor : color.GREEN;
        this.theme.removeColor = (this.theme.removeColor !== undefined) ? this.theme.removeColor : color.RED;
    }
}
