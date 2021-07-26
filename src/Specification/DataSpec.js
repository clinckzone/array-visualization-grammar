//@ts-check
export class DataSpec {
    /**
     * @param {{name: string; value: number|Array; type: string}} rawData 
     */
    constructor(rawData) {
        this.name = rawData.name;
        this.value = rawData.value;
        this.type = rawData.type;
    }
}