//@ts-check
/**
 * Copies all the properties that are present in the reciever from the donor to the reciever
 * @param {Object} recieverObj Object whose properties receive values from donor
 * @param {Object} donorObj Object from which property values are taken
 * @returns
 */
export function retrieveValues(recieverObj, donorObj) {
	const protoKeys = Object.getPrototypeOf(recieverObj);
	const objKeys = Object.keys(recieverObj);
	const keys = objKeys.concat(protoKeys);

	for (let key of keys) {
		if (typeof recieverObj[key] === 'object') {
			recieverObj[key] = retrieveValues(recieverObj[key], donorObj[key]);
		} else {
			recieverObj[key] = donorObj[key];
		}
	}
	return recieverObj;
}
