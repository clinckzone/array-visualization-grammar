//@ts-check
import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';
import { addArrayElement } from './AddArrayElement';
import { removeArrayElement } from './RemoveArrayElement';
import { updateArrayBoundary } from './UpdateArrayBoundary';
import { calcArrayItemPos } from '../../Auxillary/ArrayHelper/CalcArrayItemPos';

/**
 * A function that updates the array diagram's boundary width and the items that are in the array diagram
 * @param {ArrayDiagram} arrayDiagram Array diagram that needs to be updated
 * @param {number} duration Total time for updating the array
 * @param {boolean} stagger Should there be delay between successive highlights?
 * @returns {Promise<d3.Selection>} D3 selction of <g> elements in the array diagram
 */
export async function updateArrayDiagram(arrayDiagram, duration, stagger) {
	//Bind array items to array data
	let updateSelection = arrayDiagram.items.data(
		arrayDiagram.data,
		(data) => data.key
	);

	//Enter and exit selections
	let enterSelection = updateSelection.enter();
	let exitSelection = updateSelection.exit();

	//Remove array items
	exitSelection = await removeArrayElement(
		exitSelection,
		duration / 3,
		stagger
	);

	//Update the array's boundary width
	await updateArrayBoundary(arrayDiagram, duration / 6);

	//Move the existing items to their new places
	await updateSelection
		.transition()
		.duration(duration / 6)
		.attr(
			'transform',
			(data, index) =>
				`translate(${
					calcArrayItemPos(index, arrayDiagram.properties).x
				}, ${calcArrayItemPos(index, arrayDiagram.properties).y})`
		)
		.end();

	//Add array items
	enterSelection = await addArrayElement(
		enterSelection,
		arrayDiagram,
		duration / 3,
		stagger
	);

	//Modify the indexes of each array item
	updateSelection.select('.array-item-index').text((data, index) => index);

	//Merge the update selection with the enter selection
	updateSelection = updateSelection.merge(enterSelection);

	return updateSelection;
}
