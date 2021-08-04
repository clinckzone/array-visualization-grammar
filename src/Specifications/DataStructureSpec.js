//@ts-check
export class DataStructureSpec {
    /**
     * @param {{name: string; value: any; type: string}} rawData 
     */
    constructor(rawData) {
        this.name = rawData.name;
        this.value = rawData.value;
        this.type = rawData.type;
    }
}
