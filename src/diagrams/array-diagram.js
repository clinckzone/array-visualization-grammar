//@ts-check
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { arrayPropSpec } from '../specifications/array';

export class ArrayDiagram {
	/**
	 * Array Diagram object defines the diagram for an array.
	 * @param {arrayPropSpec} properties Defines the properties of the array diagram
	 */
	constructor(properties) {
		this.properties = properties;
		this.label = this.initializeArrayLabel();
		this.container = this.initializeArrayContainer();
		this._data = [];
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
	}

	get data() {
		return this._data;
	}

	/**
	 * Arranges all the svg nodes in the order corresponding
	 * to each item of in array diagrams' data. Returns a d3
	 * selection of items that in the array diagram.
	 */
	get items() {
		//Update the selection according to the data
		const dataNodes = this.data.map((item) => {
			return d3
				.selectAll(`g.array-item-${this.properties.id}`)
				.filter((data) => {
					return data.value === item.value;
				})
				.node();
		});

		//Select the all items of the array diagram
		const domNodes = Array.from(
			document.getElementsByClassName(`array-item-${this.properties.id}`)
		);

		//Reorder their position in svg dom
		domNodes.forEach((item, index, array) => {
			const node = array.find((node) => node == dataNodes[index]);
			if (node !== undefined) document.getElementById('svg-container').appendChild(node);
		});

		//Now select the svg elemnets in order
		const selection = this.properties.svg.selectAll(`g.array-item-${this.properties.id}`);
		return selection;
	}

	/**
	 * Create an svg text as the label for the diagram
	 * @returns {d3.Selection}
	 */
	initializeArrayLabel() {
		const label = this.properties.svg
			.append('text')
			.attr('class', `array-label-${this.properties.id}`)
			.attr('x', `${this.properties.position.x}`)
			.attr('y', `${this.properties.position.y}`)
			.text(`${this.properties.name}`)
			.style('dominant-baseline', 'text-after-edge')
			.style('font-family', this.properties.style.label.fontFamily)
			.style('font-size', this.properties.style.label.fontSize)
			.style('font-weight', this.properties.style.label.fontWeight)
			.style('opacity', this.properties.style.label.opacity)
			.style('fill', this.properties.style.label.color);

		return label;
	}

	/**
	 * Create a rect svg for the array diagram's boundary
	 * @returns {d3.Selection}
	 */
	initializeArrayContainer() {
		const container = this.properties.svg
			.append('rect')
			.attr('class', `array-boundary-${this.properties.id}`)
			.attr(
				'height',
				this.properties.style.item.itemSize + 2 * this.properties.style.item.padding
			)
			.attr('x', `${this.properties.position.x}`)
			.attr('y', `${this.properties.position.y}`)
			.attr('rx', 0.1 * this.properties.style.item.itemSize)
			.attr('ry', 0.1 * this.properties.style.item.itemSize)
			.style('fill', this.properties.style.container.fill)
			.style('stroke', this.properties.style.container.stroke)
			.style('stroke-width', this.properties.style.container.strokeWidth)
			.style('opacity', this.properties.style.container.opacity);

		return container;
	}

	/**
	 * The function returns the x and y position of array item
	 * within the array diagram
	 * @param {number} index Position of the item within the array
	 * @returns {{x: number; y: number}} Calculated X and Y position of the array item
	 */
	calculateItemPosition(index) {
		return {
			x:
				(this.properties.style.item.itemSize + this.properties.style.item.padding) *
					(index + 0.5) +
				this.properties.style.item.padding / 2 +
				this.properties.position.x,
			y:
				(this.properties.style.item.itemSize + this.properties.style.item.padding) / 2 +
				this.properties.position.y,
		};
	}
}
