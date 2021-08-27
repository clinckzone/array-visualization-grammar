//@ts-check
export class DataSpec {
	/**
	 * Stores the kind of data we want to visualize
	 * @param {{name: string; type: string}} rawData
	 */
	constructor(rawData) {
		this.name = rawData.name;
		this.type = rawData.type;
	}
}
