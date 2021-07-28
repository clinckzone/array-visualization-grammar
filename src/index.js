//@ts-check
import Iroh from 'iroh/dist/iroh-node.es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { FunctionAnimationSpec } from "./Specification/FunctionAnimationSpec";
import { templateJsonSpec } from './Specification/TemplateJsonSpec';

//Compile script upon click
const compileButton = document.getElementById("compile-button");
compileButton.addEventListener('click', compile);

//Run the Json spec upon click
const runButton = document.getElementById("run-button");
runButton.addEventListener('click', execute);

//Initialize the javascript editor
const jsEditor = monaco.editor.create(document.getElementById('js-editor-container'), {
	value: 
`//Initialize and manipulate your array here in javascript.
const sampleArray = [1, 2, 3, 4, 5];
sampleArray.push(3);`,

	language: 'javascript'
});

//Initialize the json editor
const jsonEditor = monaco.editor.create(document.getElementById('json-editor-container'), {
	value: "",
	language: 'json'
});

//Converts the javascript code into json spec
function compile() {
	const code = jsEditor.getValue();
	const stage = new Iroh.Stage(code);

	//Create a deep copy of the declared array
	const jsonSpec = JSON.parse(JSON.stringify(templateJsonSpec));

	//listen to any arrray declarations
	stage.addListener(Iroh.VAR)
	.on("after", 
		(e) => {
			if(Array.isArray(e.value)) {
				jsonSpec.data = JSON.parse(JSON.stringify({name: e.name, value: e.value, type: "array"}));
			}
		}
	);
		
	//Listen to any function calls
	stage.addListener(Iroh.CALL)
	.on("after",
		(e) => {
			//Get the function that is being called on the array
			jsonSpec.callee = e.callee;

			switch(jsonSpec.callee) {
				case "push":
					if(e.arguments.length > 1) {
						console.log(`Expected only a single argument to ${jsonSpec.data.name}.${jsonSpec.callee}()`);
					}
					else { 
						const item = e.arguments[0];
						jsonSpec.args.push({name: "item", value: item, type: `${typeof item}`});
					}
					break;

				case "pop":
				 	break;

				case "shift":
					break;

				case "unshift":
					if(e.arguments.length > 1) {
						console.log(`Expected only a single argument to ${jsonSpec.data.name}.${jsonSpec.callee}()`);
					}
					else { 
						const item = e.arguments[0];
						jsonSpec.args.push({name: "item", value: item, type: `${typeof item}`});
					}
					break;
			}
		}
	);

	eval(stage.script);

	//Setting the value of the json editor
	const jsonEditorValue = `${JSON.stringify(jsonSpec, null, 2)}`;
	jsonEditor.setValue(jsonEditorValue);
}

function execute() {
	const jsonData = jsonEditor.getValue();

	//Clear out all the svgs inside the svg area
	let element = document.getElementById("svg-container");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

	const functionAnimationSpec = new FunctionAnimationSpec(JSON.parse(jsonData));
	functionAnimationSpec.compile();
}
