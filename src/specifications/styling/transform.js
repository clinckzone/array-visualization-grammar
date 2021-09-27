//@ts-check
import { DiagramStyleSpec } from './diagram';
import { colors } from '../../helpers/enums/colors';

export class TransformStyleSpec {
	/**
	 * Contains transform related styling properties of the array diagram
	 * @param {Object} rawSpec
	 * @param {DiagramStyleSpec} diagramStyleSpec
	 */
	constructor(rawSpec, diagramStyleSpec) {
		rawSpec.global = rawSpec.global || {};
		this.global = this.init_global(rawSpec.global);

		rawSpec.initialize = rawSpec.initialize || {};
		this.initialize = this.init_initialize(rawSpec.initialize);

		rawSpec.add = rawSpec.add || {};
		this.add = this.init_add(rawSpec.add);

		rawSpec.remove = rawSpec.remove || {};
		this.remove = this.init_remove(rawSpec.remove);

		rawSpec.update = rawSpec.update || {};
		this.update = this.init_update(rawSpec.update);

		rawSpec.highlight = rawSpec.highlight || {};
		this.highlight = this.init_highlight(rawSpec.highlight, diagramStyleSpec);

		rawSpec.select = rawSpec.select || {};
		this.select = this.init_select(rawSpec.select);

		rawSpec.deselect = rawSpec.deselect || {};
		this.deselect = this.init_deselect(rawSpec.deselect, diagramStyleSpec);

		rawSpec.exchange = rawSpec.exchange || {};
		this.exchange = this.init_exchange(rawSpec.exchange);
	}

	init_global(rawSpec) {
		const global = {
			stagger: rawSpec.stagger || false,
			easing: `d3.${rawSpec.easing}` || 'd3.easeCubic',
			durationEach: rawSpec['duration-each'] || 2000,
		};
		return global;
	}

	init_initialize(rawSpec) {
		const initialize = {
			fill: rawSpec.fill || colors.ADD,
			stroke: rawSpec.stroke || colors.ADD,
			strokeWidth: rawSpec['stroke-width'] || '1px',
			color: rawSpec.color || colors.ITEM_TEXT,

			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};
		return initialize;
	}

	init_add(rawSpec) {
		const add = {
			fill: rawSpec.fill || colors.ADD,
			stroke: rawSpec.stroke || colors.ADD,
			strokeWidth: rawSpec['stroke-width'] || '1px',
			color: rawSpec.color || colors.ITEM_TEXT,

			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};

		add.rearrange = {
			stagger: false,
			easing: add.easing,
		};

		return add;
	}

	init_remove(rawSpec) {
		const remove = {
			fill: rawSpec.fill || colors.REMOVE,
			stroke: rawSpec.stroke || colors.REMOVE,
			strokeWidth: rawSpec['stroke-width'] || '1px',
			color: rawSpec.color || colors.ITEM_TEXT,

			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};

		remove.rearrange = {
			stagger: false,
			easing: remove.easing,
		};

		return remove;
	}

	init_update(rawSpec) {
		const update = {
			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};

		rawSpec.add = rawSpec.add || {};
		update.add = {
			fill: rawSpec.add.fill || this.add.fill,
			stroke: rawSpec.add.stroke || this.add.stroke,
			strokeWidth: rawSpec.add['stroke-width'] || this.add.strokeWidth,
			color: rawSpec.add.color || this.add.color,

			stagger: rawSpec.add.stagger || update.stagger,
			easing: rawSpec.add.easing || update.easing,
		};

		rawSpec.remove = rawSpec.remove || {};
		update.remove = {
			fill: rawSpec.remove.fill || this.remove.fill,
			stroke: rawSpec.remove.stroke || this.remove.stroke,
			strokeWidth: rawSpec.remove['stroke-width'] || this.remove.strokeWidth,
			color: rawSpec.remove.color || this.remove.color,

			stagger: rawSpec.remove.stagger || update.stagger,
			easing: rawSpec.remove.easing || update.easing,
		};

		update.rearrange = {
			stagger: false,
			easing: update.easing,
		};

		return update;
	}

	init_highlight(rawSpec, diagramStyleSpec) {
		const highlight = {
			focus: {
				fill: rawSpec.fill || colors.HIGHLIGHT,
				stroke: rawSpec.stroke || colors.HIGHLIGHT,
				strokeWidth: rawSpec['stroke-width'] || '1px',
				color: rawSpec.color || colors.ITEM_TEXT,
			},

			defocus: {
				fill: diagramStyleSpec.item.fill,
				stroke: diagramStyleSpec.item.stroke,
				strokeWidth: diagramStyleSpec.item.strokeWidth,
				color: diagramStyleSpec.item.color,
			},

			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};
		return highlight;
	}

	init_select(rawSpec) {
		const select = {
			focus: {
				fill: rawSpec.fill || colors.HIGHLIGHT,
				stroke: rawSpec.stroke || colors.HIGHLIGHT,
				strokeWidth: rawSpec['stroke-width'] || '1px',
				color: rawSpec.color || colors.ITEM_TEXT,
			},

			defocus: {
				fill: rawSpec.fill || colors.HIGHLIGHT,
				stroke: rawSpec.stroke || colors.HIGHLIGHT,
				strokeWidth: rawSpec['stroke-width'] || '1px',
				color: rawSpec.color || colors.ITEM_TEXT,
			},

			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};
		return select;
	}

	init_deselect(rawSpec, diagramStyleSpec) {
		const deselect = {
			focus: {
				fill: diagramStyleSpec.item.fill,
				stroke: diagramStyleSpec.item.stroke,
				strokeWidth: diagramStyleSpec.item.strokeWidth,
				color: diagramStyleSpec.item.color,
			},

			defocus: {
				fill: diagramStyleSpec.item.fill,
				stroke: diagramStyleSpec.item.stroke,
				strokeWidth: diagramStyleSpec.item.strokeWidth,
				color: diagramStyleSpec.item.color,
			},

			stagger: rawSpec.stagger || this.global.stagger,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};
		return deselect;
	}

	init_exchange(rawSpec) {
		const exchange = {
			stagger: rawSpec.stagger || this.global.durationEach,
			easing: `d3.${rawSpec.easing}` || this.global.easing,
			durationEach: rawSpec['duration-each'] || this.global.durationEach,
		};

		exchange.translate = {
			stagger: false,
			easing: exchange.easing,
		};

		exchange.rearrange = {
			stagger: false,
			easing: exchange.easing,
		};

		return exchange;
	}
}
