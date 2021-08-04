import { FunctionAnimationSpec } from "../Specifications/FunctionAnimationSpec";

export function execute(jsonEditor) {
    //Get the specification from the json editor
	const jsonData = jsonEditor.getValue();

	//Clear out all the svgs inside the svg area
	let item = document.getElementById("svg-container");
	while (item.firstChild) {
		item.removeChild(item.firstChild);
	}

    //Interprete the specification
	const functionAnimationSpec = new FunctionAnimationSpec(JSON.parse(jsonData));
	functionAnimationSpec.compile();
}
