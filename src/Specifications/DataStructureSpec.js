//@ts-check
export class DataStructureSpec {
    /**
     * @param {{name: string; value: any; type: string; duration: number}} rawData 
     */
    constructor(rawData) {
        this.name = rawData.name;
        this.value = rawData.value;
        this.type = rawData.type;

        if(rawData.duration !== undefined) this.duration = rawData.duration;
        else this.duration = 1000;
    }
}
