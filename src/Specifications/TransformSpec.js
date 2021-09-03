//@ts-check
import * as d3 from 'd3';

import { StyleSpec } from './StyleSpec';
import { TransformDataSpec } from './TransformDataSpec';

import { color } from '../Auxillary/Color';
import { transformType } from '../Auxillary/TransformType';
import { ArrayProp } from '../Auxillary/ArrayHelper/ArrayProp';

import { ArrayDiagram } from '../Diagrams/ArrayDiagram';
import { PrimitiveDiagram } from '../Diagrams/PrimitiveDiagram';
import { morphArrayElement } from '../Animations/ArrayAnimations/MorphArrayElement';
import { updateArrayDiagram } from '../Animations/ArrayAnimations/UpdateArrayDiagram';
import { returnArrayElement } from '../Animations/ArrayAnimations/ReturnArrayElement';
import { highlightArrayElement } from '../Animations/ArrayAnimations/HighlightArrayElement';
import { exchangeArrayElement } from '../Animations/ArrayAnimations/ExchangeArrayElement';
import { combineArrayElement } from '../Animations/ArrayAnimations/CombineArrayElement';

export class TransformSpec {
	/**
	 * TransformSpec stores all the transformation data inside itself
	 * and is able to execute the stored transformation data.
	 * @param {any[]} rawSpec Raw specification for the transformations that are to be applied on the array data
	 * @param {StyleSpec} styleSpec Style specification object that contains specifications for styling and animation
	 */
	constructor(rawSpec, styleSpec) {
		this.style = styleSpec;
		this.transformation = rawSpec.map((item) => {
			//Retrieve and pass the animation settings for a specific transformation
			const transformStyleSpec = this.style.transform[item.type];
			return new TransformDataSpec(item, transformStyleSpec);
		});
	}

	/**
	 * Applies various tranformations to the passed array
	 * @param {ArrayDiagram} arrayDiagram Array Diagram on which transformations will be performed
	 */
	async applyTransformation(arrayDiagram) {
		//Initialize the returnArray as null
		let returnArray = null;

		//Go through each
		for (let i = 0; i < this.transformation.length; i++) {
			//The current transformation
			const transform = this.transformation[i];

			//Match the transformation type
			switch (transform.type) {
				case transformType.INITIALIZE: {
					//Always update the array diagrams' data before using it
					arrayDiagram.data = transform.args.item.map(
						(item) => item.value
					);
					await updateArrayDiagram(
						arrayDiagram,
						transform.duration,
						transform.stagger
					);
					break;
				}

				case transformType.ADD: {
					//Store a reference of the array diagrams' data
					const data = arrayDiagram.data;

					//Sort the items in ascending order
					transform.args.item.sort((a, b) => a.index - b.index);

					//Go through each item in the sorted array and add it in the array diagram
					for (let i = 0; i < transform.args.item.length; i++) {
						//Get the value and index of the current item in the array
						const index = transform.args.item[i].index;
						const value = transform.args.item[i].value;

						//Add a new item to the data
						data.splice(index, 0, value);
					}

					//Update the array diagrams' data before updating it
					arrayDiagram.data = data;
					await updateArrayDiagram(
						arrayDiagram,
						transform.duration,
						transform.stagger
					);
					break;
				}

				case transformType.REMOVE: {
					//Store a copy of the array diagrams' data
					const data = arrayDiagram.data;

					//Sort the items in descending order
					transform.args.item.sort((a, b) => b.index - a.index);

					//Go through each item in the sorted array and remove it from the array diagram
					for (let i = 0; i < transform.args.item.length; i++) {
						//Get the index from the current item
						const index = transform.args.item[i].index;

						//Remove the item from the data
						data.splice(index, 1);
					}

					//Update the array diagrams' data before updating it
					arrayDiagram.data = data;
					await updateArrayDiagram(
						arrayDiagram,
						transform.duration,
						transform.stagger
					);
					break;
				}

				case transformType.UPDATE: {
					//Variable to hold the new array data for the array diagram
					const arrayData = [];

					//Get the indexes and values as seperate arrays
					const value = transform.args.item.map((item) => item.value);

					//Create a new array data for the array diagram
					for (let i = 0; i < value.length; i++) {
						const item = arrayDiagram.data.find(
							(item) => item.value === value[i]
						);
						item === undefined
							? arrayData.push(value[i])
							: arrayData.push(item);
					}

					//Assign the new and rearranged array data to the array diagram
					arrayDiagram.data = arrayData;
					await updateArrayDiagram(
						arrayDiagram,
						transform.duration,
						transform.stagger
					);

					break;
				}

				case transformType.HIGHLIGHT: {
					//Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
					const selection = d3.selectAll(
						transform.args.item.map(
							(item) => arrayDiagram.items.nodes()[item.index]
						)
					);

					//Highlight thoses elements
					await highlightArrayElement(
						selection,
						transform.duration,
						transform.stagger,
						color.HIGHLIGHT_DEFAULT,
						color.ITEM_DEFAULT
					);

					break;
				}

				case transformType.SELECT: {
					//Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
					const selection = d3.selectAll(
						transform.args.item.map(
							(item) => arrayDiagram.items.nodes()[item.index]
						)
					);

					//Select thoses elements
					await highlightArrayElement(
						selection,
						transform.duration,
						transform.stagger,
						color.HIGHLIGHT_DEFAULT,
						color.ADD_DEFAULT
					);

					break;
				}

				case transformType.DESELECT: {
					//Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
					const selection = d3.selectAll(
						transform.args.item.map(
							(item) => arrayDiagram.items.nodes()[item.index]
						)
					);

					//Deselect thoses elements
					await highlightArrayElement(
						selection,
						transform.duration,
						transform.stagger,
						color.ITEM_DEFAULT,
						color.ITEM_DEFAULT
					);

					break;
				}

				case transformType.RETURN: {
					if (transform.args.type === transform.dataType.ARRAY) {
						//Get the indexes of the items being returned
						const index = transform.args.item.map(
							(item) => item.index
						);

						//If returnArray is null, then create one
						if (returnArray === null) {
							//Create a object to be used as the new position for the new array diagram
							const returnPosition = {
								x: arrayDiagram.properties.POSITION.x,
								y:
									arrayDiagram.properties.POSITION.y +
									2.5 * arrayDiagram.properties.ITEM_SIZE,
							};

							// Create a new ArrayProp object to be used for translation and for the new array diagram
							const returnArrProp = new ArrayProp(
								'Return Value',
								returnPosition,
								arrayDiagram.properties.ITEM_SIZE,
								arrayDiagram.properties.PADDING,
								d3.select('#svg-container')
							);

							//Create a new array diagram that will store returned values
							returnArray = new ArrayDiagram(returnArrProp);

							//Get the data that the returned array will store
							const returnArrData = [];

							for (let i = 0; i < index.length; i++) {
								//Pass just the value so that keys are unique
								const data = arrayDiagram.data[index[i]].value;
								returnArrData.push(data);
							}

							//Update the data stored in the array diagram
							returnArray.data = returnArrData;
						}

						//If it's not null then add the data corresponding to the returned items in the returnArray
						else {
							const returnArrData = returnArray.data;

							for (let i = 0; i < index.length; i++) {
								//Pass just the value so that keys are unique
								const data = arrayDiagram.data[index[i]].value;
								returnArrData.push(data);
							}

							//Update the data stored in the array diagram
							returnArray.data = returnArrData;
						}

						//Return items
						await returnArrayElement(
							arrayDiagram,
							returnArray,
							index,
							transform.duration,
							transform.stagger
						);
					} else if (
						transform.args.type === transform.dataType.PRIMITIVE
					) {
						//Create a object to be used as the new position for the new array diagram
						const returnPosition = {
							x: arrayDiagram.properties.POSITION.x,
							y:
								arrayDiagram.properties.POSITION.y +
								2.5 * arrayDiagram.properties.ITEM_SIZE,
						};

						// Create a new ArrayProp object to be used for translation and for the new array diagram
						const returnArrProp = new ArrayProp(
							'Return Value',
							returnPosition,
							arrayDiagram.properties.ITEM_SIZE,
							arrayDiagram.properties.PADDING,
							arrayDiagram.properties.SVG_CONTAINER
						);

						//Create a new array diagram that will store returned values
						returnArray = new PrimitiveDiagram(returnArrProp);
						if (transform.args.item[0].index !== undefined) {
							//Get the index of the item being returned
							const index = transform.args.item.map(
								(item) => item.index
							);

							const returnData = index.map(
								(item) => arrayDiagram.data[item]
							);

							returnArray.data = returnData;

							//Return items
							await returnArrayElement(
								arrayDiagram,
								returnArray,
								index,
								transform.duration,
								transform.stagger
							);
						} else if (transform.args.item[0].value !== undefined) {
							const value = transform.args.item.map(
								(item) => item.value
							);
							returnArray.data = value;

							//Update the array
							await updateArrayDiagram(
								returnArray,
								transform.duration,
								transform.stagger
							);
						}
					}

					break;
				}

				case transformType.EXCHANGE: {
					const index = transform.args.item.map((item) => item.index);
					for (let i = 0; i < index.length; i++) {
						const indexesToExchange = index[i];
						await exchangeArrayElement(
							indexesToExchange,
							arrayDiagram,
							1000,
							transform.stagger
						);
					}
					break;
				}

				case transformType.COMBINE: {
					const index = transform.args.item.map((item) => item.index);
					const value = transform.args.item.map((item) => item.value);

					for (let i = 0; i < index.length; i++) {
						const indexesToCombine = index[i];
						const valuesToReplace = value[i];

						await combineArrayElement(
							indexesToCombine,
							valuesToReplace,
							arrayDiagram,
							1000,
							transform.stagger
						);
					}
					break;
				}

				case transformType.MORPH: {
					//Map the indexes in the transform.args.item array to nodes in arrayItems of the arrayDiagram
					const selection = d3.selectAll(
						transform.args.item.map(
							(item) => arrayDiagram.items.nodes()[item.index]
						)
					);

					//Get the indexes and values as seperate arrays
					const index = transform.args.item.map((item) => item.index);
					const value = transform.args.item.map((item) => item.value);

					//Only change values in the data array of the array diagram and not keys
					for (let i = 0; i < transform.args.item.length; i++) {
						arrayDiagram.data[index[i]].value = value[i];
					}

					//Morph the elements to the corresponding values specified in the arguments
					await morphArrayElement(
						selection,
						value,
						transform.duration,
						transform.stagger
					);

					break;
				}
			}
		}
		return returnArray;
	}
}
