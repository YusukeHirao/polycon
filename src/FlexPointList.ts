import 'core-js/fn/weak-map';
import 'core-js/fn/symbol';
import FlexPoint from './FlexPoint';
import { Point, UpdateInfo, MediaQueryRuleList } from './types';

export default class FlexPointList {

	/**
	 * Flex points(vertices) of each media queries
	 */
	private _flexPoints: { [condition: string]: FlexPoint[] } = {};

	/**
	 * A list of current absolute points(vertices)
	 */
	private _currentAbsPoints: Point[] = [];

	/**
	 * Parse media query and value
	 */
	private static _mediaQueryParse (query: string): MediaQueryRuleList<string> {
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

	/**
	 * A list of flex points(vertices)
	 *
	 * @param points points parameter string
	 */
	constructor (points: string) {
		this._parse(points);
	}

	/**
	 * The number of points(vertices)
	 */
	public get length (): number {
		return this._flexPoints['default'].length;
	}

	/**
	 * Updating a dimension
	 *
	 * @param index index of points(vertices)
	 * @param width width
	 * @param height height
	 * @param update infomation
	 */
	public update (index: number, width: number, height: number): UpdateInfo {
		const info: UpdateInfo = {
			isChanged: false,
			newPoint: null,
		};

		/**
		 * `points` are in current mediaQuery condition.
		 */
		let points: FlexPoint[] = this._flexPoints['default'];
		for (const condition in this._flexPoints) {
			if (this._flexPoints.hasOwnProperty(condition)) {
				if (condition === 'default' || !('matchMedia' in window)) {
					continue;
				}
				if (window.matchMedia(condition).matches) {
					points = this._flexPoints[condition];
				}
			}
		}

		/**
		 * `flex` is at a corresponding index
		 */
		const flex: FlexPoint = points[index];
		if (flex) {
			const updated: Point = flex.evaluate(width, height);
			const current: Point = this._currentAbsPoints[index];
			if (updated.x !== current.x) {
				info.isChanged = true;
				this._currentAbsPoints[index].x = updated.x;
			}
			if (updated.y !== current.y) {
				info.isChanged = true;
				this._currentAbsPoints[index].y = updated.y;
			}
			if (info.isChanged) {
				info.newPoint = updated;
			}
		} else {
			if (window.console) {
				window.console.warn(`[${index}]th point is undefined`);
			}
		}

		return info;
	}

	/**
	 * Parse string of media queries and values
	 *
	 * @param query string of media queries and values
	 */
	private _parse (query: string): void {

		const rules: MediaQueryRuleList<string> = FlexPointList._mediaQueryParse(query);

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


