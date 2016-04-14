import Polycon from './Polycon';
import { DOMSelector } from './types';

/**
 *
 */
function polycon (selector: DOMSelector): Polycon | Polycon[] {
	'use strict';
	return Polycon.new(selector);
}

/**
 *
 */
window['polycon'] = polycon;
