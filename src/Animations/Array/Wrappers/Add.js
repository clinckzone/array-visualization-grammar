//@ts-check
import { ArrayDiagram } from '../../../Diagrams/ArrayDiagram';
import { totalDuration } from '../../../Helpers/Functions/TotalDuration';
import { addSelection } from '../AddSelection';
import { updateBoundary } from '../UpdateBoundary';
import { updateSelection } from '../UpdateSelection';

/**
 * Wrapper function for adding items to the array diagram
 * @param {{index: number; value: any}[]} item Index, value pair of the items to be added
 * @param {ArrayDiagram} arrayDiagram Array diagram where the items are to be added
 * @param {Object} properties Transformation properties for addition
 */
export async function add(item, arrayDiagram, properties) {
	const data = arrayDiagram.data;

	//Sort the items in ascending order
	item.sort((a, b) => a.index - b.index);

	//Go through each item in the sorted array and add it in the array diagram
	for (let i = 0; i < item.length; i++) {
		const index = item[i].index;
		const value = item[i].value;
		data.splice(index, 0, value);
	}

	//Update the array diagram data
	arrayDiagram.data = data;

	//Bind array items to array data
	const updateSel = arrayDiagram.items.data(
		arrayDiagram.data,
		(data) => data.key
	);

	//Enter selection and length
	const enterSel = updateSel.enter();
	const enterSelLen = enterSel.size();

	//Unit duration
	properties.duration = totalDuration(properties, enterSelLen + 2);
	const unitDuration = properties.duration / (enterSelLen + 2);

	//Update the array's boundary width
	const updateBoundaryDur = unitDuration;
	await updateBoundary(arrayDiagram, updateBoundaryDur);

	//Move the existing items to their new places
	const updateDuration = unitDuration;
	await updateSelection(updateSel, arrayDiagram, updateDuration);

	//Add array items
	properties.duration = unitDuration * enterSelLen;
	await addSelection(enterSel, arrayDiagram, properties);
}
