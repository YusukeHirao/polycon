"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlexNumber_1 = require('./FlexNumber');

var FlexPoint = function () {
    /**
     * @param x x-coordinate
     * @param y y-coordinate
     */

    function FlexPoint(x, y) {
        _classCallCheck(this, FlexPoint);

        this._x = new FlexNumber_1.default(x);
        this._y = new FlexNumber_1.default(y);
    }
    /**
     * evaluate
     *
     * @param width width
     * @param height height
     * @return width and height
     */


    _createClass(FlexPoint, [{
        key: "evaluate",
        value: function evaluate(width, height) {
            return {
                x: this._x.evaluate(width),
                y: this._y.evaluate(height)
            };
        }
    }]);

    return FlexPoint;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FlexPoint;