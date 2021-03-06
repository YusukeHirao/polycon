import 'core-js/fn/weak-map';

import FlexPointList from './FlexPointList';
import { DOMSelector } from './types';

const NS_SVG = 'http://www.w3.org/2000/svg';
const ATTRIBUTE_NAME = 'data-polycon-node';
const STYLE_NODE_NAME = 'style';
const ROOT_NODE_NAME = 'root';
const BACKGROUND_NODE_NAME = 'background';
const STYLE_SELECTOR = `[${ATTRIBUTE_NAME}="${STYLE_NODE_NAME}"]`;
const ROOT_SELECTOR = `[${ATTRIBUTE_NAME}="${ROOT_NODE_NAME}"]`;
const BACKGROUND_SELECTOR = `[${ATTRIBUTE_NAME}="${BACKGROUND_NODE_NAME}"]`;
const SVG_LENGTHTYPE_PX = SVGLength.SVG_LENGTHTYPE_PX;

const rootMap: WeakMap<Polycon, Element> = new WeakMap();
const svgMap: WeakMap<Polycon, SVGSVGElement> = new WeakMap();
const polygonMap: WeakMap<Polycon, SVGPolygonElement> = new WeakMap();

export default class Polycon {

	/**
	 * Create a new instance or instance list
	 *
	 * @param selector A selector string or an element or element List
	 */
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

	/**
	 * Create string of UUID
	 */
	private static _createUUID (): string {
		return Math.round(Date.now() * Math.random()).toString(36);
	}

	/**
	 * Get path of background image from an element
	 */
	private static _getBackgroundImagePath (el: HTMLElement): string {
		const style = window.getComputedStyle(el);
		const styleValue = style.getPropertyValue('background-image');
		if (!styleValue) {
			return '';
		}
		const matchArray = styleValue.match(/url\(("|')?([^\)]*)\1\)/);
		if (!matchArray) {
			return '';
		}
		const [ , , path] = matchArray;
		return path || '';
	}

	/**
	 * Get color of background from an element
	 */
	private static _getBackgroundColor (el: HTMLElement): string {
		const style = window.getComputedStyle(el);
		const colorCode = style.getPropertyValue('background-color');
		return colorCode || '';
	}

	/**
	 * Create a `<style>` element "only once" for `Polycon` elements
	 */
	private static _setStyle (): void {
		let style: HTMLStyleElement = document.querySelector(STYLE_SELECTOR) as HTMLStyleElement;
		if (!style) {
			const head = document.getElementsByTagName('head')[0];
			style = document.createElement('style');
			style.setAttribute(ATTRIBUTE_NAME, STYLE_NODE_NAME);
			head.appendChild(style);
			const sheet = style.sheet as CSSStyleSheet;
			sheet.insertRule(`${ROOT_SELECTOR} { position: relative; background: none !important; }`, sheet.rules.length);
			sheet.insertRule(`${ROOT_SELECTOR} > * { position: relative; z-index: 1; }`, sheet.rules.length);
			sheet.insertRule(`${ROOT_SELECTOR} > ${BACKGROUND_SELECTOR} { position: absolute; z-index: 0; top: 0; left: 0; }`, sheet.rules.length);
		}
	}

	/**
	 * An unique id in DOM tree (But this isn't a attriblute value of `id`)
	 */
	private _id: string;

	/**
	 * Width of this element
	 */
	private _width: number;

	/**
	 * Height of this element
	 */
	private _height: number;

	/**
	 * Points (Vertices)
	 */
	private _points: FlexPointList;

	/**
	 * A source path of background image
	 */
	private _backgroundImage: string;

	/**
	 * A color of background
	 */
	private _backgroundColor: string;

	/**
	 * ID number of requestAnimationFrame
	 */
	private _rafid: number;

	/**
	 * create a `Polycon` element
	 *
	 * @param el An element
	 */
	constructor (el: Element) {
		if (!(el instanceof Element)) {
			throw new TypeError(`Invalid argument type`);
		}
		const rect = el.getBoundingClientRect();
		const points = el.getAttribute('data-points') || '';
		this._id = Polycon._createUUID();
		this._width = rect.width;
		this._height = rect.height;
		this.el = el;
		this._styleTransport();
		this._createSVG();
		this._setPoints(points);
		Polycon._setStyle();
		el.setAttribute(ATTRIBUTE_NAME, ROOT_NODE_NAME);
		window.addEventListener('resize', this._onResize.bind(this), false);
	}

	/**
	 * A corresponding element
	 */
	public set el (el: Element) {
		rootMap.set(this, el);
	}
	public get el (): Element {
		return rootMap.get(this)!;
	}

	/**
	 * An innerHTML string of corresponding element
	 *
	 * @readonly
	 */
	public get innerHTML (): string {
		return this.el.innerHTML;
	}

	/**
	 * A polygonal SVG element
	 */
	public set svg (svg: SVGSVGElement) {
		svgMap.set(this, svg);
	}
	public get svg (): SVGSVGElement {
		return svgMap.get(this)!;
	}

	/**
	 * An element of `<polygon>` in SVG element
	 */
	public set polygon (polygon: SVGPolygonElement) {
		polygonMap.set(this, polygon);
	}
	public get polygon (): SVGPolygonElement {
		return polygonMap.get(this)!;
	}

	/**
	 * Inheritance of styles
	 *
	 */
	private _styleTransport (): void {
		const el = this.el as HTMLElement;
		this._backgroundImage = Polycon._getBackgroundImagePath(el);
		this._backgroundColor = Polycon._getBackgroundColor(el);
	}

	/**
	 * Create a SVG element for psuedo-background
	 *
	 * ```html
	 * <svg data-polycon-node="background" role="presentation" width="..." height="...">
	 * 	<polygon points="......" fill="..." />
	 * 	<defs>
	 * 		<pattern id="..." patternUnits="userSpaceOnUse" x="0" y="0" width="..." height="...">
	 * 			<image x="0" y="0" width="..." height="..." xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="..."/>
	 * 		</pattern>
	 * 	</defs>
	 * </svg>
	 * ```
	 */
	private _createSVG (): void {
		const svg = document.createElementNS(NS_SVG, 'svg') as SVGSVGElement;
		svg.setAttribute('role', 'presentation');
		svg.setAttribute(ATTRIBUTE_NAME, BACKGROUND_NODE_NAME);
		svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
		svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);

		const polygon = document.createElementNS(NS_SVG, 'polygon') as SVGPolygonElement;
		svg.appendChild(polygon);

		let fill = '';
		if (this._backgroundImage) {
			const fillId = `fill-${this._id}`;
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

	/**
	 * Create a pattern for background image
	 */
	private _patternImage (svg: SVGSVGElement, id: string): void {
		const defs = document.createElementNS(NS_SVG, 'defs') as SVGDefsElement;
		const pattern = document.createElementNS(NS_SVG, 'pattern') as SVGPatternElement;
		pattern.id = id;
		pattern.setAttribute('patternUnits', 'userSpaceOnUse');
		pattern.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		pattern.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);

		const image = document.createElementNS(NS_SVG, 'image') as SVGImageElement;
		image.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		image.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this._backgroundImage);

		pattern.appendChild(image);
		defs.appendChild(pattern);
		svg.appendChild(defs);

		const img = new Image();
		img.onload = this._onLoadedImage.bind(this, img, pattern, image);
		img.src = this._backgroundImage;
	}

	/**
	 * Set image sizes when loaded image
	 *
	 * @param width Width of loaded background image
	 * @param height Height of loaded background image
	 * @param pattern `<pattern>` element for background image
	 * @param image `<image>` element for background image
	 */
	private _onLoadedImage ({ width, height }: HTMLImageElement, pattern: SVGPatternElement, image: SVGImageElement): void {
		const ratio = window.devicePixelRatio || 1;
		pattern.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, width / ratio);
		pattern.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, height / ratio);
		image.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, width / ratio);
		image.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, height / ratio);
	}

	/**
	 * Set points(vertices) at first time
	 */
	private _setPoints (points: string): void {
		this._points = new FlexPointList(points);
		const l = this._points.length;
		const pointsAttr = this.polygon.points;
		for (let i = 0; i < l; i++) {
			const { newPoint } = this._points.update(i, this._width, this._height);
			if (newPoint) {
				const point = this.svg.createSVGPoint();
				point.x = newPoint.x;
				point.y = newPoint.y;
				pointsAttr.appendItem(point);
			}
		}
	}

	/**
	 * Update points(vertices)
	 */
	private _update (): void {
		const rect = this.el.getBoundingClientRect();
		this._width = rect.width;
		this._height = rect.height;

		const svg = this.svg;
		svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
		svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);

		const l = this._points.length;
		const pointsAttr = this.polygon.points;
		for (let i = 0; i < l; i++) {
			const { isChanged, newPoint } = this._points.update(i, this._width, this._height);
			if (isChanged && newPoint) {
				const point = this.svg.createSVGPoint();
				point.x = newPoint.x;
				point.y = newPoint.y;
				pointsAttr.replaceItem(point, i);
			}
		}
	}

	/**
	 * A resize handler
	 */
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
