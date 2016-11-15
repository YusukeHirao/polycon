"use strict";

var Polycon_1 = require("./Polycon");
/**
 *
 */
function polycon(selector) {
  return Polycon_1.default.new(selector);
}
/**
 *
 */
window['polycon'] = polycon; // tslint:disable-line:no-string-literal