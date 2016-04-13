import 'core-js/fn/weak-map';
import * as types from './types';

const rootMap: WeakMap<Polycon, Element> = new WeakMap;
const backgroundMap: WeakMap<Polycon, SVGRectElement> = new WeakMap;
const polygonMap: WeakMap<Polycon, SVGPolygonElement> = new WeakMap;

export default class Polycon {

	public id: string;

	public points: string;

	public width: number;

	public height: number;

	public static new (selector: types.DOMSelector): Polycon | Polycon[] {
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
		this.id = Math.round(Date.now() * Math.random()).toString(36);
		this.el = el;
		this.points = el.getAttribute('data-points');
		this.width = rect.width;
		this.height = rect.height;
		this.createSVG();
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

	public set polygon (polygon: SVGPolygonElement) {
		polygonMap.set(this, polygon);
	}

	public get polygon (): SVGPolygonElement {
		return polygonMap.get(this);
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
	public createSVG (): void {
		const SVG_LENGTHTYPE_PX: number = SVGLength.SVG_LENGTHTYPE_PX;
		const SVG_LENGTHTYPE_PERCENTAGE: number = SVGLength.SVG_LENGTHTYPE_PERCENTAGE;
		const filterId: string = `filter-${this.id}`;
		const clipId: string = `clip-${this.id}`;
		const feResultId: string = `fe-result-${this.id}`;

		const svg: SVGSVGElement = createSVGElement('svg') as SVGSVGElement;
		svg.setAttribute('role', 'presentation');
		svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this.width);
		svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this.height);

		const defs: SVGDefsElement = createSVGElement('defs') as SVGDefsElement;

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
		feImage.href.baseVal = 'base/test/fixtures/resource/img.png';
		feImage.result.baseVal = feResultId;

		const feTile: SVGFETileElement = createSVGElement('feTile') as SVGFETileElement;
		feTile.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		feTile.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		feTile.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PERCENTAGE, 100);
		feTile.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PERCENTAGE, 100);
		feTile.in1.baseVal = feResultId;

		const clipPath: SVGClipPathElement = createSVGElement('clipPath') as SVGClipPathElement;
		clipPath.id = clipId;
		clipPath.setAttribute('clip-rule', 'evenodd');

		const polygon: SVGPolygonElement = createSVGElement('polygon') as SVGPolygonElement;
		let p: SVGPoint = svg.createSVGPoint();
		p.x = 0;
		p.y = 30;
		polygon.points.appendItem(p);
		p = svg.createSVGPoint();
		p.x = 40;
		p.y = 50;
		polygon.points.appendItem(p);
		p = svg.createSVGPoint();
		p.x = 400;
		p.y = 0;
		polygon.points.appendItem(p);
		p = svg.createSVGPoint();
		p.x = 400;
		p.y = 300;
		polygon.points.appendItem(p);
		p.x = 0;
		p.y = 300;
		polygon.points.appendItem(p);

		const rect: SVGRectElement = createSVGElement('rect') as SVGRectElement;
		rect.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		rect.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
		rect.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
		rect.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
		rect.setAttribute('filter', `url(#${filterId})`);
		rect.setAttribute('clip-path', `url(#${clipId})`);

		filter.appendChild(feImage);
		filter.appendChild(feTile);
		clipPath.appendChild(polygon);
		defs.appendChild(filter);
		defs.appendChild(clipPath);
		svg.appendChild(defs);
		svg.appendChild(rect);
		this.el.appendChild(svg);

		this.polygon = polygon;
	}

}

function createSVGElement (qualifiedName: string): SVGElement {
	'use strict';
	return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);
}
