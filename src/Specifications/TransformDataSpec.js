//@ts-check
export class TransformDataSpec {
    /**
     * TransformDataSpec stores a single transformation data inside itself
     * @param {{type: string; value: any[], index: any[]}} rawSpec 
     */
    constructor(rawSpec) {
        this.type = rawSpec.type;
        if(rawSpec !== undefined) this.value = rawSpec.value;
        if(rawSpec !== undefined) this.index = rawSpec.index;
    }
}
