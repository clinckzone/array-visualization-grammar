//@ts-check
import { color } from '../Auxillary/Color';

export class StyleSpec {
	/**
	 * StyleSpec stores all the properties related to the styling and animation properties of the array diagram that will be drawn
	 * @param {Object} rawSpec
	 */
	constructor(rawSpec) {
		//Theme properties
		this.theme = rawSpec.theme !== undefined ? rawSpec.theme : {};

		//Label
		this.theme.label =
			this.theme.label !== undefined ? this.theme.label : {};
		this.theme.label.font =
			this.theme.label.font !== undefined
				? this.theme.label.font
				: 'Arial';
		this.theme.label.fontSize =
			this.theme.label.fontSize !== undefined
				? this.theme.label.fontSize
				: '12px';
		this.theme.label.fontWeight =
			this.theme.label.fontWeight !== undefined
				? this.theme.label.fontWeight
				: 'normal';
		this.theme.label.color =
			this.theme.label.color !== undefined
				? this.theme.label.color
				: color.LABEL_DEFAULT;
		this.theme.label.visible =
			this.theme.label.visible !== undefined
				? this.theme.label.visible
				: true;

		//Item
		this.theme.item = this.theme.item !== undefined ? this.theme.item : {};
		this.theme.item.fill =
			this.theme.item.fill !== undefined
				? this.theme.item.fill
				: color.ITEM_DEFAULT;
		this.theme.item.stroke =
			this.theme.item.stroke !== undefined
				? this.theme.item.stroke
				: color.ITEM_DEFAULT;
		this.theme.item.strokeWidth =
			this.theme.item.strokeWidth !== undefined
				? this.theme.item.strokeWidth
				: '1px';
		this.theme.item.font =
			this.theme.item.font !== undefined ? this.theme.item.font : 'Arial';
		this.theme.item.fontSize =
			this.theme.item.fontSize !== undefined
				? this.theme.item.fontSize
				: '14px';
		this.theme.item.fontWeight =
			this.theme.item.fontWeight !== undefined
				? this.theme.item.fontWeight
				: 'normal';
		this.theme.item.visible =
			this.theme.item.visible !== undefined
				? this.theme.item.visible
				: true;

		//Index
		this.theme.index =
			this.theme.index !== undefined ? this.theme.index : {};
		this.theme.index.font =
			this.theme.index.font !== undefined
				? this.theme.index.font
				: 'Arial';
		this.theme.index.fontSize =
			this.theme.index.fontSize !== undefined
				? this.theme.index.fontSize
				: '10px';
		this.theme.index.fontWeight =
			this.theme.index.fontWeight !== undefined
				? this.theme.index.fontWeight
				: 'normal';
		this.theme.index.color =
			this.theme.index.color !== undefined
				? this.theme.index.color
				: color.INDEX_DEFAULT;
		this.theme.index.visible =
			this.theme.index.visible !== undefined
				? this.theme.index.visible
				: true;

		//Container
		this.theme.container =
			this.theme.container !== undefined ? this.theme.container : {};
		this.theme.container.fill =
			this.theme.container.fill !== undefined
				? this.theme.container.fill
				: color.CONTAINER_DEFAULT;
		this.theme.container.stroke =
			this.theme.container.stroke !== undefined
				? this.theme.container.stroke
				: color.CONTAINER_DEFAULT;
		this.theme.container.strokeWidth =
			this.theme.container.strokeWidth !== undefined
				? this.theme.container.strokeWidth
				: '1px';
		this.theme.container.visible =
			this.theme.container.visible !== undefined
				? this.theme.container.visible
				: true;

		//Transform
		this.transform =
			rawSpec.transform != undefined ? rawSpec.transform : {};

		//Global
		this.transform.global =
			this.transform.global !== undefined ? this.transform.global : {};
		this.transform.global.stagger =
			this.transform.global.stagger !== undefined
				? this.transform.global.stagger
				: false;
		this.transform.global.durationEach =
			this.transform.global.durationEach !== undefined
				? this.transform.global.durationEach
				: 1000;
		this.transform.global.easingFunction =
			this.transform.global.easingFunction !== undefined
				? `d3.${this.transform.global.easingFunction}`
				: 'd3.easeCubic';

		//Initialize
		this.transform.initialize =
			this.transform.initialize !== undefined
				? this.transform.initialize
				: {};
		this.transform.initialize.stagger =
			this.transform.initialize.stagger !== undefined
				? this.transform.initialize.stagger
				: this.transform.global.stagger;
		this.transform.initialize.durationEach =
			this.transform.initialize.durationEach !== undefined
				? this.transform.initialize.durationEach
				: this.transform.global.durationEach;
		this.transform.initialize.easingFunction =
			this.transform.initialize.easingFunction !== undefined
				? `d3.${this.transform.initialize.easingFunction}`
				: this.transform.global.easingFunction;

		//Add
		this.transform.add =
			this.transform.add !== undefined ? this.transform.add : {};
		this.transform.add.stroke =
			this.transform.add.stroke !== undefined
				? this.transform.add.stroke
				: color.ADD_DEFAULT;
		this.transform.add.strokeWidth =
			this.transform.add.strokeWidth !== undefined
				? this.transform.add.strokeWidth
				: '1px';
		this.transform.add.fill =
			this.transform.add.fill !== undefined
				? this.transform.add.fill
				: color.ADD_DEFAULT;
		this.transform.add.stagger =
			this.transform.add.stagger !== undefined
				? this.transform.add.stagger
				: this.transform.global.stagger;
		this.transform.add.durationEach =
			this.transform.add.durationEach !== undefined
				? this.transform.add.durationEach
				: this.transform.global.durationEach;
		this.transform.add.easingFunction =
			this.transform.add.easingFunction !== undefined
				? `d3.${this.transform.add.easingFunction}`
				: this.transform.global.easingFunction;

		//Remove
		this.transform.remove =
			this.transform.remove !== undefined ? this.transform.remove : {};
		this.transform.remove.stroke =
			this.transform.remove.stroke !== undefined
				? this.transform.remove.stroke
				: color.REMOVE_DEFAULT;
		this.transform.remove.strokeWidth =
			this.transform.remove.strokeWidth !== undefined
				? this.transform.remove.strokeWidth
				: '1px';
		this.transform.remove.fill =
			this.transform.remove.fill !== undefined
				? this.transform.remove.fill
				: color.REMOVE_DEFAULT;
		this.transform.remove.stagger =
			this.transform.remove.stagger !== undefined
				? this.transform.remove.stagger
				: this.transform.global.stagger;
		this.transform.remove.durationEach =
			this.transform.remove.durationEach !== undefined
				? this.transform.remove.durationEach
				: this.transform.global.durationEach;
		this.transform.remove.easingFunction =
			this.transform.remove.easingFunction !== undefined
				? `d3.${this.transform.remove.easingFunction}`
				: this.transform.global.easingFunction;

		//Update
		this.transform.update =
			this.transform.update !== undefined ? this.transform.update : {};
		this.transform.update.stagger =
			this.transform.update.stagger !== undefined
				? this.transform.update.stagger
				: this.transform.global.stagger;
		this.transform.update.durationEach =
			this.transform.update.durationEach !== undefined
				? this.transform.update.durationEach
				: this.transform.global.durationEach;
		this.transform.update.easingFunction =
			this.transform.update.easingFunction !== undefined
				? `d3.${this.transform.update.easingFunction}`
				: this.transform.global.easingFunction;

		//Highlight
		this.transform.highlight =
			this.transform.highlight !== undefined
				? this.transform.highlight
				: {};
		this.transform.highlight.stroke =
			this.transform.highlight.stroke !== undefined
				? this.transform.highlight.stroke
				: color.REMOVE_DEFAULT;
		this.transform.highlight.strokeWidth =
			this.transform.highlight.strokeWidth !== undefined
				? this.transform.highlight.strokeWidth
				: '1px';
		this.transform.highlight.fill =
			this.transform.highlight.fill !== undefined
				? this.transform.highlight.fill
				: color.REMOVE_DEFAULT;
		this.transform.highlight.stagger =
			this.transform.highlight.stagger !== undefined
				? this.transform.highlight.stagger
				: this.transform.global.stagger;
		this.transform.highlight.durationEach =
			this.transform.highlight.durationEach !== undefined
				? this.transform.highlight.durationEach
				: this.transform.global.durationEach;
		this.transform.highlight.easingFunction =
			this.transform.highlight.easingFunction !== undefined
				? `d3.${this.transform.highlight.easingFunction}`
				: this.transform.global.easingFunction;

		//Select
		this.transform.select =
			this.transform.select !== undefined ? this.transform.select : {};
		this.transform.select.stroke =
			this.transform.select.stroke !== undefined
				? this.transform.select.stroke
				: color.ADD_DEFAULT;
		this.transform.select.strokeWidth =
			this.transform.select.strokeWidth !== undefined
				? this.transform.select.strokeWidth
				: '1px';
		this.transform.select.fill =
			this.transform.select.fill !== undefined
				? this.transform.select.fill
				: color.ADD_DEFAULT;
		this.transform.select.stagger =
			this.transform.select.stagger !== undefined
				? this.transform.select.stagger
				: this.transform.global.stagger;
		this.transform.select.durationEach =
			this.transform.select.durationEach !== undefined
				? this.transform.select.durationEach
				: this.transform.global.durationEach;
		this.transform.select.easingFunction =
			this.transform.select.easingFunction !== undefined
				? `d3.${this.transform.select.easingFunction}`
				: this.transform.global.easingFunction;

		//Deselect
		this.transform.deselect =
			this.transform.deselect !== undefined
				? this.transform.deselect
				: {};
		this.transform.deselect.stagger =
			this.transform.deselect.stagger !== undefined
				? this.transform.deselect.stagger
				: this.transform.global.stagger;
		this.transform.deselect.durationEach =
			this.transform.deselect.durationEach !== undefined
				? this.transform.deselect.durationEach
				: this.transform.global.durationEach;
		this.transform.deselect.easingFunction =
			this.transform.deselect.easingFunction !== undefined
				? `d3.${this.transform.deselect.easingFunction}`
				: this.transform.global.easingFunction;

		//Return
		this.transform.return =
			this.transform.return !== undefined ? this.transform.return : {};
		this.transform.return.stagger =
			this.transform.return.stagger !== undefined
				? this.transform.return.stagger
				: this.transform.global.stagger;
		this.transform.return.durationEach =
			this.transform.return.durationEach !== undefined
				? this.transform.return.durationEach
				: this.transform.global.durationEach;
		this.transform.return.easingFunction =
			this.transform.return.easingFunction !== undefined
				? `d3.${this.transform.return.easingFunction}`
				: this.transform.global.easingFunction;

		//Combine
		this.transform.combine =
			this.transform.combine !== undefined ? this.transform.combine : {};
		this.transform.combine.stagger =
			this.transform.combine.stagger !== undefined
				? this.transform.combine.stagger
				: this.transform.global.stagger;
		this.transform.combine.durationEach =
			this.transform.combine.durationEach !== undefined
				? this.transform.combine.durationEach
				: this.transform.global.durationEach;
		this.transform.combine.easingFunction =
			this.transform.combine.easingFunction !== undefined
				? `d3.${this.transform.combine.easingFunction}`
				: this.transform.global.easingFunction;

		//Morph
		this.transform.morph =
			this.transform.morph !== undefined ? this.transform.morph : {};
		this.transform.morph.stagger =
			this.transform.morph.stagger !== undefined
				? this.transform.morph.stagger
				: this.transform.global.stagger;
		this.transform.morph.durationEach =
			this.transform.morph.durationEach !== undefined
				? this.transform.morph.durationEach
				: this.transform.global.durationEach;
		this.transform.morph.easingFunction =
			this.transform.morph.easingFunction !== undefined
				? `d3.${this.transform.morph.easingFunction}`
				: this.transform.global.easingFunction;

		//Exchange
		this.transform.exchange =
			this.transform.exchange !== undefined
				? this.transform.exchange
				: {};
		this.transform.exchange.stagger =
			this.transform.exchange.stagger !== undefined
				? this.transform.exchange.stagger
				: this.transform.global.stagger;
		this.transform.exchange.durationEach =
			this.transform.exchange.durationEach !== undefined
				? this.transform.exchange.durationEach
				: this.transform.global.durationEach;
		this.transform.exchange.easingFunction =
			this.transform.exchange.easingFunction !== undefined
				? `d3.${this.transform.exchange.easingFunction}`
				: this.transform.global.easingFunction;
	}
}
