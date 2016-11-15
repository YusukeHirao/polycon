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

/**
 * Updated information of point
 */
export interface UpdateInfo {
	/**
	 * x or y value are changed?
	 */
	isChanged: boolean;

	/**
	 * new point
	 */
	newPoint: Point | null;
}

/**
 * Rules of media queries
 */
export interface MediaQueryRuleList<T> {
	/**
	 * A condition of media query
	 * `T` is type of value
	 */
	[ condition: string ]: T;
}
