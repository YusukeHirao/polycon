import * as types from './types';
import FlexNumber from './FlexNumber';

export default class FlexPoint {

	/**
	 * x-coordinate
	 */
	private _x: FlexNumber;

	/**
	 * y-coordinate
	 */
	private _y: FlexNumber;

	/**
	 * Flexible two-dimensional coordinates
	 *
	 * @param x x-coordinate
	 * @param y y-coordinate
	 */
	constructor (x: string, y: string) {
		this._x = new FlexNumber(x);
		this._y = new FlexNumber(y);
	}

	/**
	 * evaluate
	 *
	 * @param width width
	 * @param height height
	 * @return width and height
	 */
	public evaluate (width: number, height: number): types.Point {
		return {
			x: this._x.evaluate(width),
			y: this._y.evaluate(height),
		};
	}

}


