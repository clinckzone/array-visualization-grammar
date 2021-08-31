//@ts-check
import * as d3 from 'd3';
import { ArrayDiagram } from './ArrayDiagram';

export class PrimitiveDiagram extends ArrayDiagram {
	constructor(properties) {
		super(properties);
		this.boundary.style('display', 'none');
	}
}
