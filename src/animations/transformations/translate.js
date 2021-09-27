//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from '../../diagrams/array-diagram';

/**
 * The functions translates the given selection from its original array
 * diagram to the new location where a new array diagram will be created.
 * @param {d3.Selection} selection D3 selection that references to the copied nodes
 * @param {ArrayDiagram} startArray The array diagram from where the item will start
 * @param {ArrayDiagram} endArray The array diagram where the item will go to
 * @param {number[]} startIndex Indexes of the array items in the startArray that are to be translated from their position
 * @param {number[]} endIndex Indexes in the endArray to which the array items will be translated to
 * @param {Object} properties Translation properties
 */
export async function translateSelection(
	selection,
	startArray,
	endArray,
	startIndex,
	endIndex,
	properties
) {
	//Curviness of translation path
	const factor = 4;

	//Helpers objects
	const lineGenerator = d3.line().curve(d3.curveNatural);
	const xmlns = 'http://www.w3.org/2000/svg';

	//Check if the translation needs to be staggered
	//If that is the case, calculate duration and delay for each item
	let delay = 0;
	if (properties.stagger === true) {
		properties.duration = properties.duration / selection.size();
		delay = properties.duration;
	}

	//translate each item
	await selection
		.transition()
		.duration(properties.duration)
		.delay((data, index) => index * delay)
		.tween('itemTween', function (data, index) {
			//Start point of translation
			const x1 = startArray.calculateItemPosition(startIndex[index]).x;
			const y1 = startArray.calculateItemPosition(startIndex[index]).y;

			//End point of translation
			const x2 = endArray.calculateItemPosition(endIndex[index]).x;
			const y2 = endArray.calculateItemPosition(endIndex[index]).y;

			//Midpoint of translation
			const xMid = calculateCurveMidPoint(x1, y1, x2, y2, factor).x;
			const yMid = calculateCurveMidPoint(x1, y1, x2, y2, factor).y;

			const itemPathEndPoints = [
				[x1, y1],
				[xMid, yMid],
				[x2, y2],
			];

			//Data for the items' path
			const itemPathData = lineGenerator(itemPathEndPoints);

			//Interpolation function
			const interpolateSVGgroup = (t) => {
				//Create a path SVG node meant to be used as a helper.
				let itemPath = document.createElementNS(xmlns, 'path');

				//Add data attribute to the path element
				itemPath.setAttribute('d', itemPathData);

				//Maps value t to the length of the svg path
				let length = d3.interpolateNumber(0, itemPath.getTotalLength());

				//x, y coords along the svg path at value t
				const { x, y } = itemPath.getPointAtLength(length(t));

				return `translate(${x}, ${y})`;
			};

			return function (t) {
				return d3.select(this).attr('transform', interpolateSVGgroup(t));
			};
		})
		.end();
}

/**
 * This function calculates a point P that lies at a perpendicular distance of d/4 from the line connecting the
 * two points (x1, y1) and (x2, y2), where 'd' is the distance between the two points. P is located such that its
 * projection M on the line connecting the two points is at its middle.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} factor Determines the perpendicular distance of P from the line joining the two points
 */
function calculateCurveMidPoint(x1, y1, x2, y2, factor) {
	return {
		x: (x1 + x2) / 2 + (y2 - y1) / factor,
		y: (y1 + y2) / 2 - (x2 - x1) / factor,
	};
}
