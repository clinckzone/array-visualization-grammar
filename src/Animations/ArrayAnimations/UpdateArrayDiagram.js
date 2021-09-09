//@ts-check
import { addArrayElement } from './AddArrayElement';
import { removeArrayElement } from './RemoveArrayElement';
import { updateArrayElement } from './UpdateArrayElement';
import { updateArrayBoundary } from './UpdateArrayBoundary';

import { ArrayDiagram } from '../../Diagrams/ArrayDiagram';

/**
 * A function that updates the items that are in the array diagram and its boundary width
 * @param {ArrayDiagram} arrayDiagram Array diagram that needs to be updated
 * @param {number} duration Total time for updating the array
 * @param {boolean} stagger Should there be delay between successive highlights?
 */
export async function updateArrayDiagram(arrayDiagram, duration, stagger) {
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
	const unitDuration = duration / (enterSelLen + exitSelLen + 2);

	//Remove array items
	const exitDuration = unitDuration * exitSelLen;
	await removeArrayElement(exitSel, exitDuration, stagger);

	//Update the array's boundary width
	const updateBoundaryDur = unitDuration;
	await updateArrayBoundary(arrayDiagram, updateBoundaryDur);

	//Move the existing items to their new places
	const updateDuration = unitDuration;
	await updateArrayElement(updateSel, arrayDiagram, updateDuration);

	//Add array items
	const enterDuration = unitDuration * enterSelLen;
	await addArrayElement(enterSel, arrayDiagram, enterDuration, stagger);
}
