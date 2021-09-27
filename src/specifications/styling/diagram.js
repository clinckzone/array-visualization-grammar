//@ts-check
import { colors } from '../../helpers/enums/colors';

export class DiagramStyleSpec {
	/**
	 * Initializes diagram related styling properties of the array diagrm
	 * @param {Object} rawSpec
	 */
	constructor(rawSpec) {
		rawSpec.label = rawSpec.label || {};
		this.label = this.init_label(rawSpec.label);

		rawSpec.container = rawSpec.container || {};
		this.container = this.init_container(rawSpec.container);

		rawSpec.index = rawSpec.index || {};
		this.index = this.init_index(rawSpec.index);

		rawSpec.item = rawSpec.item || {};
		this.item = this.init_item(rawSpec.item);
	}

	init_label(rawSpec) {
		const label = {
			fontFamily: rawSpec['font-family'] || 'Arial',
			fontSize: rawSpec['font-size'] || '12px',
			fontWeight: rawSpec['font-weight'] || 'normal',
			color: rawSpec.color || colors.LABEL,
			opacity: rawSpec.opacity !== undefined ? rawSpec.opacity : 1.0,
		};
		return label;
	}

	init_container(rawSpec) {
		const container = {
			fill: rawSpec.fill || colors.CONTAINER,
			stroke: rawSpec.stroke || colors.CONTAINER,
			strokeWidth: rawSpec['stroke-width'] || '1px',
			opacity: rawSpec.opacity !== undefined ? rawSpec.opacity : 1.0,
		};
		return container;
	}

	init_index(rawSpec) {
		const index = {
			fontFamily: rawSpec['font-family'] || 'Arial',
			fontSize: rawSpec['font-size'] || '10px',
			fontWeight: rawSpec['font-weight'] || 'normal',
			color: rawSpec.color || colors.INDEX,
			opacity: rawSpec.opacity !== undefined ? rawSpec.opacity : 1.0,
		};
		return index;
	}

	init_item(rawSpec) {
		const item = {
			fill: rawSpec.fill || colors.ITEM,
			stroke: rawSpec.stroke || colors.ITEM,
			strokeWidth: rawSpec['stroke-width'] || '1px',
			color: rawSpec.color || colors.ITEM_TEXT,
			fontFamily: rawSpec['font-family'] || 'Arial',
			fontSize: rawSpec['font-size'] || '14px',
			fontWeight: rawSpec['font-weight'] || 'normal',
			itemSize: rawSpec['item-size'] || 30,
			padding: rawSpec.padding !== undefined ? rawSpec.padding : 10,
			opacity: rawSpec.opacity !== undefined ? rawSpec.opacity : 1.0,
		};
		return item;
	}
}
