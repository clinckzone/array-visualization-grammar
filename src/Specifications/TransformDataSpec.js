//@ts-check
export class TransformDataSpec {
    /**
     * TransformDataSpec stores a single transformation data inside itself
     * @param {{type: string; value: any[], index: any[]}} rawSpec 
     */
    constructor(rawSpec) {
        this.type = rawSpec.type;
        if(rawSpec.value !== undefined && rawSpec.index !== undefined) {
            //Create an array of objects containing value and index
            this.item = new Array(rawSpec.value.length).fill(0).map((item, index) => ({index: rawSpec.index[index], value: rawSpec.value[index]}));
        }
        else {
            if(rawSpec.value !== undefined) this.item = rawSpec.value.map(item => ({value: item}));
            if(rawSpec.index !== undefined) this.item = rawSpec.index.map(item => ({index: item}));
        }
    }
}
