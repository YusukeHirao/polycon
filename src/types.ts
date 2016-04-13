/**
 * DOM Selector or DOM Element or DOM Elements
 */
export type DOMSelector = string | Element | NodeListOf<Element>;

/**
 * x-coordinate and y-coordinate
 */
export interface Point {
	/**
	 * x-coordinate
	 */
	x: number;

	/**
	 * y-coordinate
	 */
	y: number;
}

export interface UpdateInfo {
	isChanged: boolean;
	newPoint: Point;
}
