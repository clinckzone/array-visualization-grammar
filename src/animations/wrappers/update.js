//@ts-check
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { addSelection } from '../transformations/add';
import { removeSelection } from '../transformations/remove';
import { rearrangeSelection } from '../transformations/rearrange';
import { updateBoundary } from '../transformations/update-boundary';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Rearranges, adds, removes the items that are in the array diagram and also its boundary width
 * @param {Array} data Array diagram data
 * @param {ArrayDiagram} arrayDiagram Array diagram that needs to be updated
 * @param {Object} properties Transformation properties for add, remove transformations
 */
export async function update(data, arrayDiagram, properties) {
	//Update array diagrams' data
	arrayDiagram.data = data;

	//Bind array items to array data
	const updateSel = arrayDiagram.items.data(arrayDiagram.data, (data) => data.key);

	//Enter and exit selections
	const enterSel = updateSel.enter();
	const exitSel = updateSel.exit();

	//Selection lengths
	const enterSelLen = enterSel.size();
	const exitSelLen = exitSel.size();

	//Unit duration
	properties.duration = calculateTotalDuration(properties, enterSelLen + exitSelLen + 2);
	const unitDuration = properties.duration / (enterSelLen + exitSelLen + 2);

	//Remove array items
	properties.remove.duration = unitDuration * exitSelLen;
	await removeSelection(exitSel, properties.remove);

	//Update the array's boundary width
	const updateBoundaryDur = unitDuration;
	await updateBoundary(arrayDiagram, updateBoundaryDur);

	//Move the existing items to their new places
	properties.rearrange.duration = unitDuration;
	await rearrangeSelection(updateSel, arrayDiagram, properties.rearrange);

	//Add array items
	properties.add.duration = unitDuration * enterSelLen;
	await addSelection(enterSel, arrayDiagram, properties.add);
}
