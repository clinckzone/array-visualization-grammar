//@ts-check
import { ArrayDiagram } from '../../diagrams/array-diagram';
import { addSelection } from '../transformations/add';
import { updateBoundary } from '../transformations/update-boundary';
import { calculateTotalDuration } from '../../helpers/functions/calculate-total-duration';

/**
 * Wrapper for array diagram initialization
 * @param {any[]} values Sequence of values that are to be initialized as an array diagram
 * @param {ArrayDiagram} arrayDiagram Array diagram where the values will be initialized
 * @param {Object} properties Contains styling properties for initialization
 */
export async function initialize(values, arrayDiagram, properties) {
	//Update array diagrams' data
	arrayDiagram.data = values;

	//Bind array items to array data
	const updateSel = arrayDiagram.items.data(arrayDiagram.data, (data) => data.key);

	//Enter selection and its length
	const enterSel = updateSel.enter();
	const enterSelLen = enterSel.size();

	properties.duration = calculateTotalDuration(properties, enterSelLen + 1);
	const unitDuration = properties.duration / (enterSelLen + 1);

	//Update the array's boundary width
	const updateBoundaryDur = unitDuration;
	await updateBoundary(arrayDiagram, updateBoundaryDur);

	//Add elements to the array diagram
	const enterDuration = unitDuration * enterSelLen;
	await addSelection(enterSel, arrayDiagram, properties);
}
