//@ts-check
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { rearrangeSelection } from '../transformations/rearrange';
import { removeSelection } from '../transformations/remove';
import { updateBoundary } from '../transformations/update-boundary';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Wrapper function for removing items from the array diagram
 * @param {any[]} index Indexes of items that are to be removed
 * @param {ArrayDiagram} arrayDiagram Array diagram where the items are to be removed from
 * @param {Object} properties Transformation properties for remove transforamtion
 */
export async function remove(index, arrayDiagram, properties) {
	const data = arrayDiagram.data;

	//Sort the items in descending order
	index.sort((a, b) => b - a);

	//Go through each item in the sorted array and remove it from the array diagram
	for (let i = 0; i < index.length; i++) {
		data.splice(index[i], 1);
	}

	//Update the array diagram data
	arrayDiagram.data = data;

	//Bind array items to array data
	const updateSel = arrayDiagram.items.data(arrayDiagram.data, (data) => data.key);

	//Exit selection and length
	const exitSel = updateSel.exit();
	const exitSelLen = exitSel.size();

	//Unit duration
	properties.duration = calculateTotalDuration(properties, exitSelLen + 2);
	const unitDuration = properties.duration / (exitSelLen + 2);

	//Remove array items
	properties.duration = unitDuration * exitSelLen;
	await removeSelection(exitSel, properties);

	//Move the existing items to their new places
	properties.rearrange.duration = unitDuration;
	await rearrangeSelection(updateSel, arrayDiagram, properties.rearrange);

	//Update the array's boundary width
	const updateBoundaryDur = unitDuration;
	await updateBoundary(arrayDiagram, updateBoundaryDur);
}
