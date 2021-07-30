//@ts-check
import Iroh from 'iroh/dist/iroh-node.es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { FunctionAnimationSpec } from "./Specifications/FunctionAnimationSpec";
import { templateJsonSpec } from './Specifications/TemplateJsonSpec';

//Compile script upon click
const compileButton = document.getElementById("compile-button");
compileButton.addEventListener('click', compile);

//Run the Json spec upon click
const runButton = document.getElementById("run-button");
runButton.addEventListener('click', execute);

//Initialize the javascript editor
const jsEditor = monaco.editor.create(document.getElementById('js-editor-container'), {
	value: `//Javascript`,
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
				{
					const item = e.arguments[0];
					jsonSpec.args.push({name: "item", value: item, type: `${typeof item}`});
					
					break;
				}

				case "pop":
				 	break;

				case "shift":
					break;

				case "unshift":
				{
					const item = e.arguments[0];
					jsonSpec.args.push({name: "item", value: item, type: `${typeof item}`});
					
					break;
				}

				case "splice":
				{
					const start = e.arguments[0];
					jsonSpec.args.push({name: "start", value: start, type: `${typeof start}`});

					const deleteCount = e.arguments[1];
					jsonSpec.args.push({name: "deleteCount", value: deleteCount, type: `${typeof deleteCount}`});

					const items = e.arguments.slice(2);
					jsonSpec.args.push({name: "items", value: items, type: "array"});
					
					break;
				}

				case "join":
					break;

				case "reverse" :
					break;

				case "slice":
					const start = e.arguments[0];
					jsonSpec.args.push({name: "start", value: start, type: `${typeof start}`});

					const end = e.arguments[1];
					jsonSpec.args.push({name: "end", value: end, type: `${typeof start}`});

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
	let item = document.getElementById("svg-container");
	while (item.firstChild) {
		item.removeChild(item.firstChild);
	}

	const functionAnimationSpec = new FunctionAnimationSpec(JSON.parse(jsonData));
	functionAnimationSpec.compile();
}
