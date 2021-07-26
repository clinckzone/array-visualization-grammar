//@ts-check
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const runButton = document.getElementById("run-button");
runButton.addEventListener('click', execute);

const jsEditor = monaco.editor.create(document.getElementById('js-editor-container'), {
	value: `function x() {\n\tconsole.log("Hello world!");\n}\n`,
	language: 'javascript'
});

const jsonEditor = monaco.editor.create(document.getElementById('json-editor-container'), {
	value: 
`{
	"calle": "push",
	"data": [
		{"name": "self", "type": "array", "value": [1, 2, 3, 4]},
		{"name": "item", "type": "number", "value": 24},
	]
}`,
	language: 'json'
});

function execute() {
	const jsonData = jsonEditor.getValue();
	console.log(jsonData);
}
