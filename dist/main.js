/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunctionAnimationSpec": () => (/* binding */ FunctionAnimationSpec)
/* harmony export */ });
/* harmony import */ var _DataSpec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


//@ts-check
class FunctionAnimationSpec {
    constructor(rawSpec) {
        this.callee = rawSpec.callee;
        this.data = rawSpec.args.map((arg) => new _DataSpec__WEBPACK_IMPORTED_MODULE_0__.DataSpec(arg));
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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSpec": () => (/* binding */ DataSpec)
/* harmony export */ });
//@ts-check
class DataSpec {
    /**
     * @param {{name: string; value: number|Array; type: string}} rawData 
     */
    constructor(rawData) {
        this.name = rawData.name;
        this.value = rawData.value;
        this.type = rawData.type;
    }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Specification_FunctionAnimationSpec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
//@ts-check


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

const functionAnimationSpec = new _Specification_FunctionAnimationSpec__WEBPACK_IMPORTED_MODULE_0__.FunctionAnimationSpec(rawSpec_unshift);
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
})();

/******/ })()
;