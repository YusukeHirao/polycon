import Polycon from './Polycon';
import { DOMSelector } from './types';

/**
 *
 */
function polycon (selector: DOMSelector): Polycon | Polycon[] {
	return Polycon.new(selector);
}

/**
 *
 */
window['polycon'] = polycon; // tslint:disable-line:no-string-literal
