//@ts-check
import { transformType } from "../Auxillary/TransformType";

export class AnimationSpec {
    /**
     * AnimationSpec stores animation properties at global and transformation level
     * @param {Object} rawSpec 
     */
    constructor(rawSpec) {
        this.global = rawSpec.global !== undefined ? rawSpec.global : {};

        //Global properties
        this.global.stagger = this.global.stagger !== undefined ? this.global.stagger : false;
        this.global.easingFunction = this.global.easingFunction !== undefined ? `d3.${this.global.easingFunction}` : "d3.easeCubic";
        this.global.durationEach = this.global.durationEach !== undefined ? this.global.durationEach : 1000;

        //An array property containing animation properties for each transformation type 
        this.transform = [];

        //Go through each transformation type
        Object.keys(transformType).forEach((key) => {

            //Retrieve the name of each transformation
            const rawSpecKey = transformType[`${key}`];

            //Use the retrieved name to access the property in rawSpec checking if the property exists
            const propExist = rawSpec[rawSpecKey] !== undefined;

            //Define animation properties for each transformation type : either default or user defined
            const type = rawSpecKey;  
            const stagger = (propExist && rawSpec[rawSpecKey].stagger !== undefined) ? rawSpec[rawSpecKey].stagger : this.global.stagger;
            const easingFunction = (propExist && rawSpec[rawSpecKey].easingFunction !== undefined) ? `d3.${rawSpec[rawSpecKey].easingFunction}` : this.global.easingFunction;
            const durationEach = (propExist && rawSpec[rawSpecKey].durationEach !== undefined) ? rawSpec[rawSpecKey].durationEach : this.global.durationEach;
        
            this.transform.push({ type, stagger, durationEach, easingFunction });
        });
    }
}
