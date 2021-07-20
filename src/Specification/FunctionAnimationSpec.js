import { DataSpec } from "./DataSpec";

//@ts-check
export class FunctionAnimationSpec {
    constructor(rawSpec) {
        this.callee = rawSpec.callee;
        this.data = rawSpec.args.map((arg) => new DataSpec(arg));
    }

    compile() {
        let array = this.data.find(element => element.type === "array").value;
        if(this.callee === "pop") {
            console.log(`Initial array: ${array}`);
            
            let poppedElement = array.pop();
            console.log(`Array after ${this.callee}: ${array}`);
            console.log(`Popped element ${poppedElement}`);
        }

        else if (this.callee === "push") {
            let element = this.data.find(element => element.name === "element").value;
            console.log(`Initial array: ${array}`);

            let pushedArray = array.push(element);
            console.log(`Array after ${this.callee}: ${array}`);
        }

        else if (this.callee === "shift") {
            console.log(`Initial array: ${array}`);
            
            let poppedElement = array.shift();
            console.log(`Array after ${this.callee}: ${array}`);
            console.log(`Popped element ${poppedElement}`);
        }

        else if (this.callee === "unshift") {
            let element = this.data.find(element => element.name === "element").value;
            console.log(`Initial array: ${array}`);

            let pushedArray = array.unshift(element);
            console.log(`Array after ${this.callee}: ${array}`);
        }
    }
}
