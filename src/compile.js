import Iroh from 'iroh/dist/iroh-node.es';
import * as stringify from 'json-stringify-pretty-compact';
import { sampleSpec } from './specifications/sample';

/**
 * Converts the javascript code into json spec
 * @param jsEditor Javascript editor instance
 * @param jsonEditor JSON editor instance
 */
export function compile(jsEditor, jsonEditor) {
	//Get the code from the jsEditor and pass it to Iroh
	const code = jsEditor.getValue();
	const stage = new Iroh.Stage(code);

	//Create a deep copy of the declared array
	const jsonSpec = JSON.parse(JSON.stringify(sampleSpec));

	//listen to any arrray declarations
	stage.addListener(Iroh.VAR).on('after', (e) => {
		console.log(e.value);
		if (Array.isArray(e.value)) {
			jsonSpec.data = JSON.parse(
				JSON.stringify({ name: e.name, value: e.value, type: 'array' })
			);
		}
	});

	//Listen to any function calls
	stage.addListener(Iroh.CALL).on('after', (e) => {
		//Get the function that is being called on the array
		const callee = e.callee;
		const data = jsonSpec.data.value;

		//Generate the corresponding JSON based on the function called
		switch (callee) {
			case 'push': {
				//Push takes in one argument which is the item that is to be inserted
				const item = e.arguments[0];
				jsonSpec.transform.push({
					type: 'add',
					index: [data.length],
					value: [item],
				});

				break;
			}

			case 'pop': {
				//Pop removes an item from the end
				jsonSpec.transform.push({
					type: 'remove',
					index: [data.length - 1],
				});

				break;
			}
			case 'shift': {
				//Shift removes an item from the front
				jsonSpec.transform.push({ type: 'remove', index: [0] });

				break;
			}
			case 'unshift': {
				//Push takes in one argument which is the item that is to be inserted
				const item = e.arguments[0];
				jsonSpec.transform.push({
					type: 'add',
					index: [0],
					value: [item],
				});

				break;
			}
			case 'splice': {
				//Spice takes up the items that are to be removed as well as the items to be added
				//Items to be removed
				const startIndex = e.arguments[0];
				const endIndex =
					e.arguments[1] === undefined
						? data.length - 1
						: startIndex + e.arguments[1] - 1;
				const removeIndex = new Array(endIndex - startIndex + 1)
					.fill(0)
					.map((item, index) => startIndex + index);

				//Items to be added
				const addValue = e.arguments.slice(2);
				const addIndex = new Array(addValue.length)
					.fill(0)
					.map((items, index) => startIndex + index);

				//Write into the JSON
				jsonSpec.transform.push({
					type: 'remove',
					index: removeIndex,
				});

				jsonSpec.transform.push({
					type: 'add',
					index: addIndex,
					value: addValue,
				});

				break;
			}
			case 'reverse':
				{
					//Create a new copy of the array with the updated item positions in the new array
					const arrLen = data.length;
					const arrCopy = new Array(arrLen)
						.fill(0)
						.map((item, index) => data[data.length - index - 1]);
					jsonSpec.transform.push({
						type: 'update',
						value: arrCopy,
					});
				}
				break;

			case 'slice':
				break;
		}
	});

	eval(stage.script);

	//Setting the value of the json editor
	const jsonEditorValue = `${stringify(jsonSpec, { maxLength: 50, indent: 4 })}`;
	jsonEditor.setValue(jsonEditorValue);
}
