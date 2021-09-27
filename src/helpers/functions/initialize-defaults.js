//@ts-check
/**
 * Initializes the undefined/undeclared keys of the object with default values from a correspinding default object
 * @param {Object} initObj Object whose properties are to be initialized
 * @param {Object} defaultObj Object to be used for initializing those properties by providing default values
 */
export function initializeDefaults(initObj, defaultObj) {
	const keys = Object.keys(defaultObj);

	for (const key of keys) {
		if (initObj[key] !== undefined) {
			if (typeof initObj[key] === 'object') {
				initObj[key] = initializeDefaults(
					initObj[key],
					defaultObj[key]
				);
			}
		} else {
			initObj[key] = defaultObj[key];
		}
	}

	return initObj;
}
