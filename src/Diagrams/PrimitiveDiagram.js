//@ts-check
import { ArrayDiagram } from './ArrayDiagram';

export class PrimitiveDiagram extends ArrayDiagram {
	constructor(properties) {
		super(properties);
		this.boundary.style('display', 'none');
	}
}
