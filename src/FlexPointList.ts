import 'core-js/fn/weak-map';
import 'core-js/fn/symbol';
import FlexPoint from './FlexPoint';
import { Point, UpdateInfo } from './types';

export default class FlexPointList {

	private _flexPoints: FlexPoint[];

	private _currentAbsPoints: Point[];

	constructor (points: string) {
		this._parse(points);
	}

	public get length (): number {
		return this._flexPoints.length;
	}

	public isUpdated (index: number, width: number, height: number): UpdateInfo {
		const info: UpdateInfo = {
			isChanged: false,
			newPoint: null,
		};
		const flex: FlexPoint = this._flexPoints[index];
		if (flex) {
			const updated: Point = flex.evaluate(width, height);
			const current: Point = this._currentAbsPoints[index];
			if (updated.x !== current.x && updated.y !== updated.y) {
				info.isChanged = true;
				info.newPoint = updated;
				this._currentAbsPoints[index] = updated;
			}
		} else {
			if (window.console) {
				window.console.warn(`[${index}]th point is undefined`);
			}
		}
		return info;
	}

	private _parse (points: string): void {
		for (let point of points.split(/\s+/g)) {
			point = point.trim();
			if (!point) {
				continue;
			}
			const [x, y]: string[] = point.split(',');
			this._flexPoints.push(new FlexPoint(x, y));
			this._currentAbsPoints.push({ x: NaN, y: NaN });
		}
	}

}
