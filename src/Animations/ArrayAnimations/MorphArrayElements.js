//@ts-check
/**
 * Morphs the specified selection to the values mentioned in the value argument
 * @param {d3.Selection} selection Items in the array that are to be morphed
 * @param {any} values Values to which the selected items will be morphed to
 * @param {number} duration 
 * @param {boolean} stagger 
 */
export async function morphArrayElement(selection, values, duration, stagger) {
    //An array to store all promises
    const transformationPromises = [];

    //Check if the addition needs to be staggered
    let delay = 0;

    //If that is the case, calculate duration and delay for each item
    if(stagger === true) {
        duration = duration/(selection.size());
        delay = duration;
    }

    transformationPromises.push(
        selection.select("rect")
        .transition()
        .duration(duration/4)
        .delay((data, index) => index * delay)
        .style("transform", "scale(1.2)")
        .transition()
        .duration(3*duration/8)
        .style("transform", "scale(0.5) rotate(0.5turn)")
        .transition()
        .duration(3*duration/8)
        .style("transform", "scale(1.0) rotate(2.0turn)")
        .end()
    );

    transformationPromises.push(
        selection.select("text")
        .transition()
        .duration(duration/4)
        .delay((data, index) => index * delay)
        .style("transform", "scale(1.25)")
        .transition()
        .duration(3*duration/8)
        .style("transform", "scale(0.5) rotate(0.5turn)")
        .transition()
        .duration(3*duration/8)
        .text((data, index) => values[index])
        .style("transform", "scale(1.0) rotate(2.0turn)")
        .end()
    );

    return Promise.all(transformationPromises);
}
