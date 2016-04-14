"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('core-js/fn/weak-map');
require('core-js/fn/symbol');
var FlexPoint_1 = require('./FlexPoint');

var FlexPointList = function () {
    function FlexPointList(points) {
        _classCallCheck(this, FlexPointList);

        this._flexPoints = [];
        this._currentAbsPoints = [];
        this._parse(points);
    }

    _createClass(FlexPointList, [{
        key: 'isUpdated',
        value: function isUpdated(index, width, height) {
            var info = {
                isChanged: false,
                newPoint: null
            };
            var flex = this._flexPoints[index];
            if (flex) {
                var updated = flex.evaluate(width, height);
                var current = this._currentAbsPoints[index];
                if (updated.x !== current.x || updated.y !== updated.y) {
                    info.isChanged = true;
                }
                this._currentAbsPoints[index].x = updated.x;
                this._currentAbsPoints[index].y = updated.y;
                info.newPoint = updated;
            } else {
                if (window.console) {
                    window.console.warn('[' + index + ']th point is undefined');
                }
            }
            return info;
        }
    }, {
        key: '_parse',
        value: function _parse(points) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = points.split(/\s+/g)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var point = _step.value;

                    point = point.trim();
                    if (!point) {
                        continue;
                    }

                    var _point$split = point.split(',');

                    var _point$split2 = _slicedToArray(_point$split, 2);

                    var x = _point$split2[0];
                    var y = _point$split2[1];

                    this._flexPoints.push(new FlexPoint_1.default(x, y));
                    this._currentAbsPoints.push({ x: NaN, y: NaN });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'length',
        get: function get() {
            return this._flexPoints.length;
        }
    }]);

    return FlexPointList;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FlexPointList;