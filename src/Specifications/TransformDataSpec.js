//@ts-check
export class TransformDataSpec {
    /**
     * TransformDataSpec stores a single transformation data inside itself
     * @param {{type: string; value: any[], index: any[]; stagger: boolean; duration: number; easingFunction: String}} rawData
     * @param {{type: string; stagger: boolean; duration: number; easingFunction: String}} transformAnimSpec
     */
    constructor(rawData, transformAnimSpec) {
        
        //Stored Data types
        this.dataType = {
            ARRAY: "array",
            PRIMITIVE: "primitive"
        }

        //Transformation type
        this.type = rawData.type;

        //Should the transformation be staggered?
        this.stagger = (rawData.stagger !== undefined) ? rawData.stagger : transformAnimSpec.stagger;

        //Specifiy duration property
        this.duration = (rawData.duration !== undefined) ? rawData.duration : transformAnimSpec.duration;

        //Specify the easing function
        this.easingFunction = (rawData.easingFunction !== undefined) ? rawData.easingFunction : transformAnimSpec.easingFunction;

        //Get the transformation arguments
        this.initializeArgs(rawData);
    }

    //Wraps the transformatio arguments in rawData into an object
    initializeArgs(rawData) {

        //If both index and value are specified, then wrap each corresponding pair into a single object
        if(rawData.value !== undefined && rawData.index !== undefined) {

            //If both value and index are specified as arrays
            if((Array.isArray(rawData.index)) && (Array.isArray(rawData.value))) {

                 //Create an array of objects containing value and index
                this.args = {
                    type: this.dataType.ARRAY,
                    item: rawData.index.map((item, index) => ({index: rawData.index[index], value: rawData.value[index]}))
                }
            }

            //Else if both value and index are specified as primitives
            else if(!Array.isArray(rawData.index) && !Array.isArray(rawData.value)) {
                this.args = {
                    type: this.dataType.PRIMITIVE,
                    item: [{index: rawData.index, value: rawData.value}]
                }
            }

            else {
                throw "Both index and value should either be of type array or a primitive."
            }
        }

        //Else wrap whichever one is defined into a single object each
        else {

            //If only value exists
            if(rawData.value !== undefined) {

                //If value is an array
                if(Array.isArray(rawData.value)) {
                    this.args = {
                        type: this.dataType.ARRAY,
                        item: rawData.value.map(item => ({value: item}))
                    }
                }

                //If value is a primitive
                else {
                    this.args = {
                        type: this.dataType.PRIMITIVE,
                        item: [{value: rawData.value}]
                    }
                }
            }

            //If only index exits 
            if(rawData.index !== undefined) {

                //If index is an array
                if(Array.isArray(rawData.index)) {
                    this.args = {
                        type: this.dataType.ARRAY,
                        item: rawData.index.map(item => ({index: item}))
                    }
                }

                //If index is a primitive
                else {
                    this.args = {
                        type: this.dataType.PRIMITIVE,
                        item: [{index: rawData.index}]
                    }
                }
            }
        }
    }

}
