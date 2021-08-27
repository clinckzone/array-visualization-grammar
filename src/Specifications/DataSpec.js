//@ts-check
export class DataSpec {
    /**
     * Stores the kind of data we want to visualize
     * @param {{name: string; value: any; type: string}} rawData
     */
    constructor(rawData) {
        this.name = rawData.name;
        this.value = rawData.value;
        this.type = rawData.type;
    }
}
