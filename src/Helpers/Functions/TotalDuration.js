//@ts-check
/**
 * Calculates the total duration of the transformation
 * @param {Object} properties Transformation property of the transformation whose total duration is to be calculated
 * @param {number} length Number of unit transformation involved in case of staggered transformation
 * @returns
 */
export function totalDuration(properties, length) {
	if (properties.stagger) {
		if (properties.duration === undefined) {
			return properties['duration-each'] * length;
		} else {
			return properties.duration;
		}
	} else {
		if (properties.duration === undefined) {
			return properties['duration-each'];
		} else {
			return properties.duration;
		}
	}
}
