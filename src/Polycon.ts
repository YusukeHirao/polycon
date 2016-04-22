import 'core-js/fn/weak-map';
import FlexPointList from './FlexPointList';
import { DOMSelector, UpdateInfo } from './types';

const SVG_LENGTHTYPE_PX: number = SVGLength.SVG_LENGTHTYPE_PX;

const rootMap: WeakMap<Polycon, Element> = new WeakMap;
const svgMap: WeakMap<Polycon, SVGSVGElement> = new WeakMap;
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
			el.style.setProperty('background-image', 'none', 'important');
		}
		this._backgroundColor = getBackgroundColor(el);
		if (this._backgroundColor) {
			el.style.setProperty('background-color', 'transparent', 'important');
		}
	}

	/**
	 *
	 * ```html
	 * <svg class="background-polygon" role="presentation">
	 * 	<defs>
	 * 		<pattern id="bg04" patternUnits="userSpaceOnUse" x="0" y="0" width="4" height="4">
	 * 			<image x="0" y="0" width="2" height="2" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="bg.png" result="img"/>
	 * 		</pattern>
	 * 	</defs>
	 * 	<polygon data-points="0,-120 71%,0 100%,-120 100%,h+20 29%,h+80 0,h" />
	 * </svg>
	 * ```
	 */
	private _createSVG (): void {
		let fill: string;

		const svg: SVGSVGElement = createSVGElement('svg') as SVGSVGElement;
		svg.setAttribute('role', 'presentation');
		svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
		svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);

		const polygon: SVGPolygonElement = createSVGElement('polygon') as SVGPolygonElement;
		svg.appendChild(polygon);

		if (this._backgroundImage) {
			const fillId: string = `fill-${this._id}`;
			this._patternImage(svg, fillId);
			fill = `url(#${fillId})`;
		} else if (this._backgroundColor) {
			fill = this._backgroundColor;
		}

		if (fill) {
			polygon.setAttribute('fill', fill);
		}

		this.el.appendChild(svg);

		this.svg = svg;
		this.polygon = polygon;
	}

	private _patternImage (svg: SVGSVGElement, id: string) {
		const defs: SVGDefsElement = createSVGElement('defs') as SVGDefsElement;
		const pattern: SVGPatternElement = createSVGElement('pattern') as SVGPatternElement;
		pattern.id = id;
		pattern.setAttribute('patternUnits', 'userSpaceOnUse');
		pattern.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		pattern.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);

		const image: SVGImageElement = createSVGElement('image') as SVGImageElement;
		image.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		image.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this._backgroundImage);

		pattern.appendChild(image);
		defs.appendChild(pattern);
		svg.appendChild(defs);

		const img: HTMLImageElement = new Image;
		img.onload = this._onLoadedImage.bind(this, img, pattern, image);
		img.src = this._backgroundImage;
	}

	private _onLoadedImage ({ width, height }: HTMLImageElement, pattern: SVGPatternElement, image: SVGImageElement) {
		const ratio: number = window.devicePixelRatio || 1;
		pattern.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, width * ratio);
		pattern.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, height * ratio);
		image.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, width * ratio);
		image.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, height * ratio);
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
