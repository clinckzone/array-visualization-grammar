//@ts-check
import { ArrayDiagram } from "../Diagrams/ArrayDiagram";
import { DataSpec } from "./DataSpec";
import { pop } from "../Functions/ArrayFunctions/Pop";
import { push } from "../Functions/ArrayFunctions/Push";
import { shift } from "../Functions/ArrayFunctions/Shift";
import { unshift } from "../Functions/ArrayFunctions/Unshift";
import { find } from "../Functions/ArrayFunctions/Find";
import { splice } from "../Functions/ArrayFunctions/Splice";
import { join } from "../Functions/ArrayFunctions/Join";
import { reverse } from "../Functions/ArrayFunctions/Reverse";
import { slice } from "../Functions/ArrayFunctions/Slice";
import { ArrayProps } from "../Auxillary/ArrayHelper/ArrayProps";
import { Vector2D } from "../Auxillary/Vector2D";

export class FunctionAnimationSpec {
    /**
     * @param {Object} rawSpec The object is obtained by directlty parsing the text from the Json editor
     */
    constructor(rawSpec) {
        this.data = new DataSpec(rawSpec.data);
        this.callee = rawSpec.callee;
        this.args = rawSpec.args.map((arg) => new DataSpec(arg));
    }

    compile() {
        const arrayProps = new ArrayProps(this.data.name, new Vector2D(10, 20));
        const arrayDiagram = new ArrayDiagram(this.data.value, arrayProps);

        if(this.callee === "pop") {
            setTimeout(() => pop(arrayDiagram), 1000);
        }

        else if (this.callee === "push") {
            let item = this.args.find(item => item.name === "item").value;
            setTimeout(() => push(arrayDiagram, item), 1000);
        }

        else if (this.callee === "shift") {
            setTimeout(() => shift(arrayDiagram), 1000);
        }

        else if (this.callee === "unshift") {
            let item = this.args.find(item => item.name === "item").value;
            setTimeout(() => unshift(arrayDiagram, item), 1000);
        }

        else if(this.callee === "find") {
            let item = this.args.find(item => item.name === "item").value;
            setTimeout(() => find(arrayDiagram, item), 1000);
        }

        else if(this.callee === "splice") {
            const start = this.args.find(item => item.name === "start").value;
            const deleteCount = this.args.find(item => item.name === "deleteCount").value;
            const items = this.args.find(item => item.name === "items").value;

            setTimeout(() => splice(arrayDiagram, start, deleteCount, ...items), 1000);
        }

        else if(this.callee === "join") {
            setTimeout(() => join(arrayDiagram), 1000);
        }

        else if(this.callee === "reverse") {
            setTimeout(() => reverse(arrayDiagram), 1000);
        }

        else if(this.callee === "slice") {
            const start = this.args.find(item => item.name === "start").value;
            const end = this.args.find(item => item.name === "end").value;
            setTimeout(() => slice(arrayDiagram, start, end), 1000);
        }
    }
}
