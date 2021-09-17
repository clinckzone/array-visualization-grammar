//@ts-check
import { ArrayDiagram } from '../../../Diagrams/ArrayDiagram';
import { addSelection } from '../AddSelection';
import { updateBoundary } from '../UpdateBoundary';
import { removeSelection } from '../RemoveSelection';
import { updateSelection } from '../UpdateSelection';
import { totalDuration } from '../../../Helpers/Functions/TotalDuration';

/**
 * Updates the items that are in the array diagram and its boundary width
 * @param {Array} data Array diagram data
 * @param {ArrayDiagram} arrayDiagram Array diagram that needs to be updated
 * @param {Object} properties Transformation properties for add, remove transformations
 */
export async function update(data, arrayDiagram, properties) {
	//Update array diagrams' data
	arrayDiagram.data = data;

	//Bind array items to array data
	const updateSel = arrayDiagram.items.data(
		arrayDiagram.data,
		(data) => data.key
	);

	//Enter and exit selections
	const enterSel = updateSel.enter();
	const exitSel = updateSel.exit();

	//Selection lengths
	const enterSelLen = enterSel.size();
	const exitSelLen = exitSel.size();

	//Unit duration
	properties.duration = totalDuration(
		properties,
		enterSelLen + exitSelLen + 2
	);
	const unitDuration = properties.duration / (enterSelLen + exitSelLen + 2);

	//Remove array items
	properties.remove.duration = unitDuration * exitSelLen;
	properties.remove.stagger = properties.stagger;
	properties.remove.easing = properties.easing;
	await removeSelection(exitSel, properties.remove);

	//Update the array's boundary width
	const updateBoundaryDur = unitDuration;
	await updateBoundary(arrayDiagram, updateBoundaryDur);

	//Move the existing items to their new places
	const updateDuration = unitDuration;
	await updateSelection(updateSel, arrayDiagram, updateDuration);

	//Add array items
	properties.add.duration = unitDuration * enterSelLen;
	properties.add.stagger = properties.stagger;
	properties.add.easing = properties.easing;
	await addSelection(enterSel, arrayDiagram, properties.add);
}
