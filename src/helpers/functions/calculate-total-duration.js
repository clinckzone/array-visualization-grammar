//@ts-check
/**
 * Calculates the total duration of a transformation
 * @param {Object} properties Pproperties of the transformation whose total duration is to be calculated
 * @param {number} length Number of unit transformations involved
 * @returns
 */
export function calculateTotalDuration(properties, length) {
	if (properties.stagger) {
		if (properties.duration === undefined) {
			return properties.durationEach * length;
		} else {
			return properties.duration;
		}
	} else {
		if (properties.duration === undefined) {
			return properties.durationEach;
		} else {
			return properties.duration;
		}
	}
}
