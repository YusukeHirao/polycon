"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('core-js/fn/weak-map');
var FlexPointList_1 = require('./FlexPointList');
var SVG_LENGTHTYPE_PX = SVGLength.SVG_LENGTHTYPE_PX;
var SVG_LENGTHTYPE_PERCENTAGE = SVGLength.SVG_LENGTHTYPE_PERCENTAGE;
var rootMap = new WeakMap();
var svgMap = new WeakMap();
var polygonMap = new WeakMap();

var Polycon = function () {
    function Polycon(el) {
        _classCallCheck(this, Polycon);

        if (!(el instanceof Element)) {
            throw new TypeError('Invalid argument type');
        }
        var rect = el.getBoundingClientRect();
        this._id = createUUID();
        this._width = rect.width;
        this._height = rect.height;
        this.el = el;
        this._styleTransport();
        this._createSVG();
        this._setPoints(el.getAttribute('data-points'));
        window.addEventListener('resize', this._onResize.bind(this), false);
    }

    _createClass(Polycon, [{
        key: '_styleTransport',
        value: function _styleTransport() {
            var el = this.el;
            this._backgroundImage = getBackgroundImagePath(el);
            if (this._backgroundImage) {
                el.style.setProperty('background-image', 'none');
            }
            this._backgroundColor = getBackgroundColor(el);
            if (this._backgroundColor) {
                el.style.setProperty('background-color', 'transparent');
            }
        }
        /**
         *
         * ```html
         * <svg class="background-polygon" role="presentation">
         * 	<defs>
         * 		<filter id="bg04" filterUnits="userSpaceOnUse" x="0" y="0" width="10000" height="10000">
         * 			<feImage x="0" y="0" width="4" height="4" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../img/common/bg04.png" result="img"/>
         * 			<feTile x="0" y="0" width="100%" height="100%" in="img"/>
         * 		</filter>
         * 		<clipPath id="clip" clip-rule="evenodd">
         * 			<polygon
         * 				data-points="   0,-120 71%,0 100%,-120 100%,h+20 29%,h+80 0,h"
         * 				data-points-sp="0,-27  71%,0 100%,-27  100%,h+8  29%,h+22 0,h"
         * 			>
         * 		</clipPath>
         * 	</defs>
         * 	<rect x="0" y="0" width="10000" height="10000" filter="url(#bg04)" clip-path="url(#clip)">
         * </svg>
         * ```
         */

    }, {
        key: '_createSVG',
        value: function _createSVG() {
            var filterId = 'filter-' + this._id;
            var clipId = 'clip-' + this._id;
            var feResultId = 'fe-result-' + this._id;
            var svg = createSVGElement('svg');
            svg.setAttribute('role', 'presentation');
            svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
            svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);
            var rect = createSVGElement('rect');
            rect.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
            rect.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
            rect.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
            rect.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
            var defs = createSVGElement('defs');
            var clipPath = createSVGElement('clipPath');
            clipPath.id = clipId;
            clipPath.setAttribute('clip-rule', 'evenodd');
            var polygon = createSVGElement('polygon');
            rect.setAttribute('clip-path', 'url(#' + clipId + ')');
            clipPath.appendChild(polygon);
            defs.appendChild(clipPath);
            svg.appendChild(defs);
            svg.appendChild(rect);
            if (this._backgroundImage) {
                var filter = createSVGElement('filter');
                filter.id = filterId;
                filter.setAttribute('filterUnits', 'userSpaceOnUse');
                filter.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
                filter.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
                filter.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
                filter.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 10000);
                var feImage = createSVGElement('feImage');
                feImage.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
                feImage.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
                feImage.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 2);
                feImage.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 2);
                feImage.href.baseVal = this._backgroundImage;
                feImage.result.baseVal = feResultId;
                var feTile = createSVGElement('feTile');
                feTile.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
                feTile.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
                feTile.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PERCENTAGE, 100);
                feTile.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PERCENTAGE, 100);
                feTile.in1.baseVal = feResultId;
                rect.setAttribute('filter', 'url(#' + filterId + ')');
                filter.appendChild(feImage);
                filter.appendChild(feTile);
                defs.appendChild(filter);
            } else if (this._backgroundColor) {
                rect.setAttribute('fill', this._backgroundColor);
            }
            this.el.appendChild(svg);
            this.svg = svg;
            this.polygon = polygon;
        }
    }, {
        key: '_setPoints',
        value: function _setPoints(points) {
            this._points = new FlexPointList_1.default(points);
            var l = this._points.length;
            var pointsAttr = this.polygon.points;
            for (var i = 0; i < l; i++) {
                var _points$isUpdated = this._points.isUpdated(i, this._width, this._height);

                var newPoint = _points$isUpdated.newPoint;

                var point = this.svg.createSVGPoint();
                point.x = newPoint.x;
                point.y = newPoint.y;
                pointsAttr.appendItem(point);
            }
        }
    }, {
        key: '_update',
        value: function _update() {
            var rect = this.el.getBoundingClientRect();
            this._width = rect.width;
            this._height = rect.height;
            var svg = this.svg;
            svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
            svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);
            var l = this._points.length;
            var pointsAttr = this.polygon.points;
            for (var i = 0; i < l; i++) {
                var _points$isUpdated2 = this._points.isUpdated(i, this._width, this._height);

                var isChanged = _points$isUpdated2.isChanged;
                var newPoint = _points$isUpdated2.newPoint;

                if (isChanged) {
                    var point = this.svg.createSVGPoint();
                    point.x = newPoint.x;
                    point.y = newPoint.y;
                    pointsAttr.replaceItem(point, i);
                }
            }
        }
    }, {
        key: '_onResize',
        value: function _onResize(e) {
            if (window.requestAnimationFrame) {
                if (window.cancelAnimationFrame) {
                    cancelAnimationFrame(this._rafid);
                }
                this._rafid = window.requestAnimationFrame(this._update.bind(this));
            } else {
                this._update();
            }
        }
    }, {
        key: 'el',
        set: function set(el) {
            rootMap.set(this, el);
        },
        get: function get() {
            return rootMap.get(this);
        }
    }, {
        key: 'innerHTML',
        get: function get() {
            return this.el.innerHTML;
        }
    }, {
        key: 'svg',
        set: function set(svg) {
            svgMap.set(this, svg);
        },
        get: function get() {
            return svgMap.get(this);
        }
    }, {
        key: 'polygon',
        set: function set(polygon) {
            polygonMap.set(this, polygon);
        },
        get: function get() {
            return polygonMap.get(this);
        }
    }], [{
        key: 'new',
        value: function _new(selector) {
            var nodeList = void 0;
            if (selector instanceof Node) {
                return new Polycon(selector);
            } else if (typeof selector === 'string') {
                nodeList = document.querySelectorAll(selector);
            } else if (selector instanceof NodeList) {
                nodeList = selector;
            } else {
                throw new TypeError('Invalid argument type');
            }
            var polycons = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = nodeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var el = _step.value;

                    polycons.push(new Polycon(el));
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

            return polycons;
        }
    }]);

    return Polycon;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Polycon;
function createSVGElement(qualifiedName) {
    'use strict';

    return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);
}
function createUUID() {
    'use strict';

    return Math.round(Date.now() * Math.random()).toString(36);
}
function getBackgroundImagePath(el) {
    'use strict';

    var style = window.getComputedStyle(el);
    var styleValue = style.getPropertyValue('background-image');
    if (!styleValue) {
        return '';
    }
    var matchArray = styleValue.match(/url\(("|')?([^\)]*)\1\)/);
    if (!matchArray) {
        return '';
    }

    var _matchArray = _slicedToArray(matchArray, 3);

    var path = _matchArray[2];

    return path || '';
}
function getBackgroundColor(el) {
    'use strict';

    var style = window.getComputedStyle(el);
    var colorCode = style.getPropertyValue('background-color');
    return colorCode || '';
}