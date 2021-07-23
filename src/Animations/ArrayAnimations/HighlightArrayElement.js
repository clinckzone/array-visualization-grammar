import { ArrayDiagram } from "../../Diagrams/ArrayDiagram";
import * as d3 from "d3";

//@ts-check
export class HighlightArrayElement {

    /**
     * @param {d3.Selection} selection 
     * @param {ArrayDiagram} context 
     */
    static async hightlightElement(selection, context, tillThisIndex) {
        const transitionPromise = [];
        //Selection here represents an array of groups within the svg.
        transitionPromise.push(
            selection
            .selectAll(`.array-element-${context.DIAGRAM_ID} rect`)
            .filter((data, index) => index <= tillThisIndex)
            .transition()
            .duration(context.TRANSITION_TIME/2)
            .delay((data, index) => index*1000)
            .attr("width", context.ITEM_SIZE*1.1)
            .attr("height", context.ITEM_SIZE*1.1)
            .attr("x", -context.ITEM_SIZE*1.1/2)
            .attr("y", -context.ITEM_SIZE*1.1/2)
            .style("fill", (data, index) => index === tillThisIndex ? "#befcb3" : "#99d8fc")
            .transition()
            .duration(context.TRANSITION_TIME/2)
            .style("fill", (data, index) => index === tillThisIndex ? "#befcb3" : "#dfe5e8")
            .attr("width", context.ITEM_SIZE)
            .attr("height", context.ITEM_SIZE)
            .attr("x", -context.ITEM_SIZE/2)
            .attr("y", -context.ITEM_SIZE/2)
            .end()
        );
        
        transitionPromise.push(
            selection
            .selectAll(`.array-element-${context.DIAGRAM_ID} text`)
            .filter((data, index) => index <= tillThisIndex)
            .transition()
            .duration(context.TRANSITION_TIME/2)
            .delay((data, index) => index*1000)
            .style("font-size", "16px")
            .transition()
            .duration(context.TRANSITION_TIME/2)
            .style("font-size", "14px")
            .end()
        );

        const element = selection.selectAll("g").filter((data, index) => index == tillThisIndex);

        return await Promise.all(transitionPromise).then(() => element);
    }
}
