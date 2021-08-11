//@ts-check
export class TransformDataSpec {
    /**
     * TransformDataSpec stores a single transformation data inside itself
     * @param {{type: string; value: any[], index: any[]; duration: number; stagger: boolean}} rawData 
     */
    constructor(rawData) {
        //Transformation type
        this.type = rawData.type;

        //Transformation duration
        if(rawData.duration !== undefined) this.duration = rawData.duration;
        else this.duration = 1000;

        //Should the transformation be staggered?
        if(rawData.stagger !== undefined) this.stagger = rawData.stagger;
        else this.stagger = false;

        //Transformation arguments
        //If both index and value are specified, then wrap each corresponding pair into a single object
        if(rawData.value !== undefined && rawData.index !== undefined) {
            //Create an array of objects containing value and index
            this.item = new Array(rawData.value.length).fill(0).map((item, index) => ({index: rawData.index[index], value: rawData.value[index]}));
        }
        //Else wrap whichever one is defined into a single object each
        else {
            if(rawData.value !== undefined) this.item = rawData.value.map(item => ({value: item}));
            if(rawData.index !== undefined) this.item = rawData.index.map(item => ({index: item}));
        }
    }
}
