"use strict";

var Polycon_1 = require('./Polycon');
/**
 *
 */
function polycon(selector) {
  'use strict';

  return Polycon_1.default.new(selector);
}
/**
 *
 */
window['polycon'] = polycon;