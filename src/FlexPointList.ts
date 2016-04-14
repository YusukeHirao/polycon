import 'core-js/fn/weak-map';
import 'core-js/fn/symbol';
import FlexPoint from './FlexPoint';
import { Point, UpdateInfo } from './types';

export default class FlexPointList {

	private _flexPoints: { [condition: string]: FlexPoint[] } = {};

	private _currentAbsPoints: Point[] = [];

	constructor (points: string) {
		this._parse(points);
	}

	public get length (): number {
		return this._flexPoints['default'].length;
	}

	public isUpdated (index: number, width: number, height: number): UpdateInfo {
		const info: UpdateInfo = {
			isChanged: false,
			newPoint: null,
		};
		let points: FlexPoint[] = this._flexPoints['default'];
		for (const condition in this._flexPoints) {
			if (this._flexPoints.hasOwnProperty(condition)) {
				if (condition === 'default') {
					continue;
				}
				if (window.matchMedia(condition).matches) {
					points = this._flexPoints[condition];
				}
			}
		}
		const flex: FlexPoint = points[index];
		if (flex) {
			const updated: Point = flex.evaluate(width, height);
			const current: Point = this._currentAbsPoints[index];
			if (updated.x !== current.x || updated.y !== updated.y) {
				info.isChanged = true;
			}
			this._currentAbsPoints[index].x = updated.x;
			this._currentAbsPoints[index].y = updated.y;
			info.newPoint = updated;
		} else {
			if (window.console) {
				window.console.warn(`[${index}]th point is undefined`);
			}
		}
		return info;
	}

	private _parse (query: string): void {

		const rules: MediaQueryRuleList<string> = mediaQueryParse(query);

		for (const condition in rules) {
			if (rules.hasOwnProperty(condition)) {
				const points: string = rules[condition];
				this._flexPoints[condition] = [];
				for (let point of points.split(/\s+/g)) {
					point = point.trim();
					if (!point) {
						continue;
					}
					const [x, y]: string[] = point.split(',');
					if (condition === 'default') {
						this._currentAbsPoints.push({ x: NaN, y: NaN });
					}
					this._flexPoints[condition].push(new FlexPoint(x, y));
				}
			}
		}
	}

}

interface MediaQueryRuleList<T> {
	[ condition: string ]: T;
}

function mediaQueryParse (query: string): MediaQueryRuleList<string> {
	'use strict';
	const rules: RegExpMatchArray = query.match(/@media[^\{]+\{[^\}]+\}/g);
	if (!rules) {
		return { 'default': query };
	}
	const ruleList: MediaQueryRuleList<string> = {};
	for (const rule of rules) {
		const matches: RegExpMatchArray = rule.match(/@media([^\{]+)\{([^\}]+)\}/);
		if (!matches) {
			continue;
		}
		const [, condition, value]: string[] = matches;
		ruleList[condition.trim()] = value.trim();
	}
	return ruleList;
}
