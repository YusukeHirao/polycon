import 'core-js/fn/weak-map';
import FlexPointList from './FlexPointList';
import { DOMSelector, Point, UpdateInfo } from './types';

const SVG_LENGTHTYPE_PX: number = SVGLength.SVG_LENGTHTYPE_PX;
const SVG_LENGTHTYPE_PERCENTAGE: number = SVGLength.SVG_LENGTHTYPE_PERCENTAGE;

const rootMap: WeakMap<Polycon, Element> = new WeakMap;
const svgMap: WeakMap<Polycon, SVGSVGElement> = new WeakMap;
const backgroundMap: WeakMap<Polycon, SVGRectElement> = new WeakMap;
const polygonMap: WeakMap<Polycon, SVGPolygonElement> = new WeakMap;

export default class Polycon {

	private _id: string;

	private _width: number;

	private _height: number;

	private _points: FlexPointList;

	private _backgroundImage: string;

	private _backgroundColor: string;

	/**
	 * ID number of requestAnimationFrame
	 */
	private _rafid: number;

	public static new (selector: DOMSelector): Polycon | Polycon[] {
		let nodeList: NodeListOf<Element>;
		if (selector instanceof Node) {
			return new Polycon(selector);
		} else if (typeof selector === 'string') {
			nodeList = document.querySelectorAll(selector);
		} else if (selector instanceof NodeList) {
			nodeList = selector;
		} else {
			throw new TypeError(`Invalid argument type`);
		}

		const polycons: Polycon[] = [];
		for (const el of nodeList) {
			polycons.push(new Polycon(el));
		}

		return polycons;
	}

	constructor (el: Element) {
		if (!(el instanceof Element)) {
			throw new TypeError(`Invalid argument type`);
		}
		const rect: ClientRect = el.getBoundingClientRect();
		this._id = createUUID();
		this._width = rect.width;
		this._height = rect.height;
		this.el = el;
		this._styleTransport();
		this._createSVG();
		this._setPoints(el.getAttribute('data-points'));
		window.addEventListener('resize', this._onResize.bind(this), false);
	}

	public set el (el: Element) {
		rootMap.set(this, el);
	}

	public get el (): Element {
		return rootMap.get(this);
	}

	public get innerHTML (): string {
		return this.el.innerHTML;
	}

	public set svg (svg: SVGSVGElement) {
		svgMap.set(this, svg);
	}

	public get svg (): SVGSVGElement {
		return svgMap.get(this);
	}

	public set polygon (polygon: SVGPolygonElement) {
		polygonMap.set(this, polygon);
	}

	public get polygon (): SVGPolygonElement {
		return polygonMap.get(this);
	}

	private _styleTransport (): void {
		const el: HTMLElement = this.el as HTMLElement;
		this._backgroundImage = getBackgroundImagePath(el);
		if (this._backgroundImage) {
			el.style.setProperty('background-image', 'none');
		}
		this._backgroundColor = getBackgroundColor(el);
		if (this._backgroundColor) {
			el.style.setProperty('background-color', 'transparent');
		}
	}

	/**
	 *
	 * ```html
	 * <svg class="background-polygon" role="presentation">
	 * 	<defs>
	 * 		<filter id="bg04" filterUnits="userSpaceOnUse" x="0" y="0" width="10000" height="10000">
	 * 			<feImage x="0" y="0" width="4" height="4" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../img/common/bg04.png" result="img"/>
	 * 			<feTile x="0" y="0" width="100%" height="100%" in="img"/>
	 * 		</filter>
	 * 		<clipPath id="clip" clip-rule="evenodd">
	 * 			<polygon
	 * 				data-points="   0,-120 71%,0 100%,-120 100%,h+20 29%,h+80 0,h"
	 * 				data-points-sp="0,-27  71%,0 100%,-27  100%,h+8  29%,h+22 0,h"
	 * 			>
	 * 		</clipPath>
	 * 	</defs>
	 * 	<rect x="0" y="0" width="10000" height="10000" filter="url(#bg04)" clip-path="url(#clip)">
	 * </svg>
	 * ```
	 */
	private _createSVG (): void {
		const filterId: string = `filter-${this._id}`;
		const clipId: string = `clip-${this._id}`;
		const feResultId: string = `fe-result-${this._id}`;

		const svg: SVGSVGElement = createSVGElement('svg') as SVGSVGElement;
		svg.setAttribute('role', 'presentation');
		svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
		svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);

		const rect: SVGRectElement = createSVGElement('rect') as SVGRectElement;
		rect.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		rect.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		rect.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
		rect.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);

		const defs: SVGDefsElement = createSVGElement('defs') as SVGDefsElement;

		const clipPath: SVGClipPathElement = createSVGElement('clipPath') as SVGClipPathElement;
		clipPath.id = clipId;
		clipPath.setAttribute('clip-rule', 'evenodd');

		const polygon: SVGPolygonElement = createSVGElement('polygon') as SVGPolygonElement;

		rect.setAttribute('clip-path', `url(#${clipId})`);

		clipPath.appendChild(polygon);
		defs.appendChild(clipPath);
		svg.appendChild(defs);
		svg.appendChild(rect);

		if (this._backgroundImage) {
			const filter: SVGFilterElement = createSVGElement('filter') as SVGFilterElement;
			filter.id = filterId;
			filter.setAttribute('filterUnits', 'userSpaceOnUse');
			filter.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
			filter.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
			filter.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
			filter.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);

			const feImage: SVGFEImageElement = createSVGElement('feImage') as SVGFEImageElement;
			feImage.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
			feImage.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
			feImage.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 2);
			feImage.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 2);
			feImage.href.baseVal = this._backgroundImage;
			feImage.result.baseVal = feResultId;

			const feTile: SVGFETileElement = createSVGElement('feTile') as SVGFETileElement;
			feTile.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
			feTile.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
			feTile.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PERCENTAGE, 100);
			feTile.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PERCENTAGE, 100);
			feTile.in1.baseVal = feResultId;

			rect.setAttribute('filter', `url(#${filterId})`);

			filter.appendChild(feImage);
			filter.appendChild(feTile);
			defs.appendChild(filter);

		} else if (this._backgroundColor) {

			rect.setAttribute('fill', this._backgroundColor);

		}

		this.el.appendChild(svg);

		this.svg = svg;
		this.polygon = polygon;
	}

	private _setPoints (points: string): void {
		this._points = new FlexPointList(points);
		const l: number = this._points.length;
		const pointsAttr: SVGPointList = this.polygon.points;
		for (let i: number = 0; i < l; i++) {
			const { newPoint }: UpdateInfo = this._points.isUpdated(i, this._width, this._height);
			const point: SVGPoint = this.svg.createSVGPoint();
			point.x = newPoint.x;
			point.y = newPoint.y;
			pointsAttr.appendItem(point);
		}
	}

	private _update (): void {
		const rect: ClientRect = this.el.getBoundingClientRect();
		this._width = rect.width;
		this._height = rect.height;

		const svg: SVGSVGElement = this.svg;
		svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
		svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);

		const l: number = this._points.length;
		const pointsAttr: SVGPointList = this.polygon.points;
		for (let i: number = 0; i < l; i++) {
			const { isChanged, newPoint }: UpdateInfo = this._points.isUpdated(i, this._width, this._height);
			if (isChanged) {
				const point: SVGPoint = this.svg.createSVGPoint();
				point.x = newPoint.x;
				point.y = newPoint.y;
				pointsAttr.replaceItem(point, i);
			}
		}
	}

	private _onResize (e: UIEvent): void {
		if (window.requestAnimationFrame) {
			if (window.cancelAnimationFrame) {
				cancelAnimationFrame(this._rafid);
			}
			this._rafid = window.requestAnimationFrame(this._update.bind(this));
		} else {
			this._update();
		}
	}

}

function createSVGElement (qualifiedName: string): SVGElement {
	'use strict';
	return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);
}

function createUUID (): string {
	'use strict';
	return Math.round(Date.now() * Math.random()).toString(36);
}

function getBackgroundImagePath (el: HTMLElement): string {
	'use strict';
	const style: CSSStyleDeclaration = window.getComputedStyle(el);
	const styleValue: string = style.getPropertyValue('background-image');
	if (!styleValue) {
		return '';
	}
	const matchArray: RegExpMatchArray = styleValue.match(/url\(("|')?([^\)]*)\1\)/);
	if (!matchArray) {
		return '';
	}
	const [ , , path]: string[] = matchArray;
	return path || '';
}

function getBackgroundColor (el: HTMLElement): string {
	'use strict';
	const style: CSSStyleDeclaration = window.getComputedStyle(el);
	const colorCode: string = style.getPropertyValue('background-color');
	return colorCode || '';
}
