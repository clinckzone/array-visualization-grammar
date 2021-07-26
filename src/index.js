//@ts-check
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as d3 from "d3";
import { ArrayDiagram } from "./Diagrams/ArrayDiagram";
import { push } from "./Functions/ArrayFunctions/Push";
import { pop } from "./Functions/ArrayFunctions/Pop";

const data = [10, 22, 31, 14, 25];
const properties = {x: 10, y: 10, label: "Input Array"};
let arrayDiagram = new ArrayDiagram(data, properties);

d3.select("#push").on("click", push.bind(arrayDiagram));
d3.select("#pop").on("click", pop.bind(arrayDiagram));
d3.select("#search").on("click", arrayDiagram.search.bind(arrayDiagram));

const jsEditor = monaco.editor.create(document.getElementById('js-editor-container'), {
	value: `function x() {\n\tconsole.log("Hello world!");\n}\n`,
	language: 'javascript'
});

const jsonEditor = monaco.editor.create(document.getElementById('json-editor-container'), {
	value: `function x() {\n\tconsole.log("Hello world!");\n}\n`,
	language: 'javascript'
});
