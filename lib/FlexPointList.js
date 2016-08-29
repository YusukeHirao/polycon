"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('core-js/fn/weak-map');
require('core-js/fn/symbol');
var FlexPoint_1 = require('./FlexPoint');

var FlexPointList = function () {
    /**
     * A list of flex points(vertices)
     *
     * @param points points parameter string
     */
    function FlexPointList(points) {
        _classCallCheck(this, FlexPointList);

        /**
         * Flex points(vertices) of each media queries
         */
        this._flexPoints = {};
        /**
         * A list of current absolute points(vertices)
         */
        this._currentAbsPoints = [];
        this._parse(points);
    }
    /**
     * Parse media query and value
     */


    _createClass(FlexPointList, [{
        key: 'update',

        /**
         * Updating a dimension
         *
         * @param index index of points(vertices)
         * @param width width
         * @param height height
         * @param update infomation
         */
        value: function update(index, width, height) {
            var info = {
                isChanged: false,
                newPoint: null
            };
            /**
             * `points` are in current mediaQuery condition.
             */
            var points = this._flexPoints['default'];
            for (var condition in this._flexPoints) {
                if (this._flexPoints.hasOwnProperty(condition)) {
                    if (condition === 'default' || !('matchMedia' in window)) {
                        continue;
                    }
                    if (window.matchMedia(condition).matches) {
                        points = this._flexPoints[condition];
                    }
                }
            }
            /**
             * `flex` is at a corresponding index
             */
            var flex = points[index];
            if (flex) {
                var updated = flex.evaluate(width, height);
                var current = this._currentAbsPoints[index];
                if (updated.x !== current.x) {
                    info.isChanged = true;
                    this._currentAbsPoints[index].x = updated.x;
                }
                if (updated.y !== current.y) {
                    info.isChanged = true;
                    this._currentAbsPoints[index].y = updated.y;
                }
                if (info.isChanged) {
                    info.newPoint = updated;
                }
            } else {
                if (window.console) {
                    window.console.warn('[' + index + ']th point is undefined');
                }
            }
            return info;
        }
        /**
         * Parse string of media queries and values
         *
         * @param query string of media queries and values
         */

    }, {
        key: '_parse',
        value: function _parse(query) {
            var rules = FlexPointList._mediaQueryParse(query);
            for (var condition in rules) {
                if (rules.hasOwnProperty(condition)) {
                    var points = rules[condition];
                    this._flexPoints[condition] = [];
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

                            if (condition === 'default') {
                                this._currentAbsPoints.push({ x: NaN, y: NaN });
                            }
                            this._flexPoints[condition].push(new FlexPoint_1.default(x, y));
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
            }
        }
    }, {
        key: 'length',

        /**
         * The number of points(vertices)
         */
        get: function get() {
            return this._flexPoints['default'].length;
        }
    }], [{
        key: '_mediaQueryParse',
        value: function _mediaQueryParse(query) {
            var rules = query.match(/@media[^\{]+\{[^\}]+\}/g);
            if (!rules) {
                return { 'default': query };
            }
            var ruleList = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = rules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var rule = _step2.value;

                    var matches = rule.match(/@media([^\{]+)\{([^\}]+)\}/);
                    if (!matches) {
                        continue;
                    }

                    var _matches = _slicedToArray(matches, 3);

                    var condition = _matches[1];
                    var value = _matches[2];

                    ruleList[condition.trim()] = value.trim();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return ruleList;
        }
    }]);

    return FlexPointList;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FlexPointList;