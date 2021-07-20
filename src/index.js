//@ts-check
import { FunctionAnimationSpec } from "./Specification/FunctionAnimationSpec";

// Example JSON specs
let rawSpec_pop = {
    callee: "pop",
    args: [{ name: "self", value: [1, 2, 3, 4, 5], type: "array" }]
};

let rawSpec_push = {
    callee: "push",
    args: 
        [
            { name: "self", value: [1, 2, 3, 4, 5], type: "array" },
            { name: "element", value: 28, type: "number" }
        ]
};

let rawSpec_shift = {
    callee: "shift",
    args: [{ name: "self", value: [1, 2, 3, 4, 5], type: "array" }]
};

let rawSpec_unshift = {
    callee: "unshift",
    args: 
        [
            { name: "self", value: [1, 2, 3, 4, 5], type: "array" },
            { name: "element", value: 28, type: "number" }
        ]
};

const functionAnimationSpec = new FunctionAnimationSpec(rawSpec_unshift);
functionAnimationSpec.compile();

console.log(functionAnimationSpec);

// Load JSON
// let rawSpec = {
//     callee: "pop",
//     args: [
//         { name: "self", value: [1, 2, 3, 4, 5], type: "array" },
//         { name: "start", value: 0, type: "number" },
//         { name: "deleteCount", value: 6, type: "number" }
//     ],
//     animations: {
//         data: "$self",
//         select: {
//             begin: "$start",
//             end: "$start + $count"
//         },
//         animation: [{type: "highlight"}, {type: "delete"}]
//     }
// };