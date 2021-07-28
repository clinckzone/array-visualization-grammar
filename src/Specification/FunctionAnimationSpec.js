import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { DataSpec } from "./DataSpec";
import { pop } from "../Functions/ArrayFunctions/Pop";
import { push } from "../Functions/ArrayFunctions/Push";
import { shift } from "../Functions/ArrayFunctions/Shift";
import { unshift } from "../Functions/ArrayFunctions/Unshift";

//@ts-check
export class FunctionAnimationSpec {
    constructor(rawSpec) {
        this.data = new DataSpec(rawSpec.data);
        this.callee = rawSpec.callee;
        this.args = rawSpec.args.map((arg) => new DataSpec(arg));
    }

    compile() {
        const arrayDiagram = new ArrayDiagram(this.data.value, {x: 10, y: 10, label: this.data.name});

        if(this.callee === "pop") {
            pop(arrayDiagram);
        }

        else if (this.callee === "push") {
            let item = this.args.find(item => item.name === "item").value;
            push(arrayDiagram, item);
        }

        else if (this.callee === "shift") {
            shift(arrayDiagram);
        }

        else if (this.callee === "unshift") {
            let item = this.args.find(item => item.name === "item").value;
            unshift(arrayDiagram, item);
        }
    }
}
