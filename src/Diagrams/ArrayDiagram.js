//@ts-check
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { ArrayProp } from '../Auxillary/ArrayHelper/ArrayProp';

export class ArrayDiagram {
	/**
	 * Array Diagram object defines the diagram for an array.
	 * @param {ArrayProp} properties Defines the properties of the array diagram
	 */
	constructor(properties) {
		this.properties = properties;
		this.label = this.initializeArrayLabel();
		this.boundary = this.initializeArrayBoundary();
	}

	set data(data) {
		//Makes sure that each item in the passed data array
		//is wrapped into an object containing a key/value pair
		this._data = data.map((item) => {
			if (item.key !== undefined) {
				return item;
			} else {
				return {
					value: item,
					key: uuidv4(),
				};
			}
		});

		//Update the selection according to the data
		this.items = this._data.map((item) => {
			return d3
				.selectAll(`g.array-item-${this.properties.DIAGRAM_ID}`)
				.filter((data) => {
					return data.value === item.value;
				})
				.node();
		});
	}

	get data() {
		return this._data;
	}

	/**
	 * Arranges all the svg nodes in the order corresponding
	 * to each item of in array diagrams' data
	 */
	set items(items) {
		//Select the all items of the array diagram
		const nodes = Array.from(
			document.getElementsByClassName(
				`array-item-${this.properties.DIAGRAM_ID}`
			)
		);

		//Reorder their position
		nodes.forEach((item, index, array) => {
			const node = array.find((node) => node == items[index]);
			if (node !== undefined)
				document.getElementById('svg-container').appendChild(node);
		});
	}

	/**
	 * Returns a d3 selection of items that in the array diagram
	 */
	get items() {
		const selection = this.properties.SVG_CONTAINER.selectAll(
			`g.array-item-${this.properties.DIAGRAM_ID}`
		);

		return selection;
	}

	/**
	 * Create an svg text as the label for the diagram
	 * @returns {d3.Selection}
	 */
	initializeArrayLabel() {
		const label = this.properties.SVG_CONTAINER.append('text')
			.attr('class', `array-label-${this.properties.DIAGRAM_ID}`)
			.attr('x', `${this.properties.POSITION.x}`)
			.attr('y', `${this.properties.POSITION.y}`)
			.text(`${this.properties.DIAGRAM_LABEL}`)
			.style('dominant-baseline', 'text-after-edge')
			.style('font-size', '12px');

		return label;
	}

	/**
	 * Create a rect svg for the array diagram's boundary
	 * @returns {d3.Selection}
	 */
	initializeArrayBoundary() {
		const boundary = this.properties.SVG_CONTAINER.append('rect')
			.attr('class', `array-boundary-${this.properties.DIAGRAM_ID}`)
			.attr(
				'height',
				this.properties.ITEM_SIZE + 2 * this.properties.PADDING
			)
			.attr('x', `${this.properties.POSITION.x}`)
			.attr('y', `${this.properties.POSITION.y}`)
			.attr('rx', 0.1 * this.properties.ITEM_SIZE)
			.attr('ry', 0.1 * this.properties.ITEM_SIZE)
			.style('fill', '#fafafa')
			.style('stroke', 'rgb(0, 0, 0, 0.05)')
			.style('stroke-width', '1px');

		return boundary;
	}
}
