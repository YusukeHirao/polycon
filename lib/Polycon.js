"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("core-js/fn/weak-map");
var FlexPointList_1 = require("./FlexPointList");
var NS_SVG = 'http://www.w3.org/2000/svg';
var ATTRIBUTE_NAME = 'data-polycon-node';
var STYLE_NODE_NAME = 'style';
var ROOT_NODE_NAME = 'root';
var BACKGROUND_NODE_NAME = 'background';
var STYLE_SELECTOR = "[" + ATTRIBUTE_NAME + "=\"" + STYLE_NODE_NAME + "\"]";
var ROOT_SELECTOR = "[" + ATTRIBUTE_NAME + "=\"" + ROOT_NODE_NAME + "\"]";
var BACKGROUND_SELECTOR = "[" + ATTRIBUTE_NAME + "=\"" + BACKGROUND_NODE_NAME + "\"]";
var SVG_LENGTHTYPE_PX = SVGLength.SVG_LENGTHTYPE_PX;
var rootMap = new WeakMap();
var svgMap = new WeakMap();
var polygonMap = new WeakMap();

var Polycon = function () {
    /**
     * create a `Polycon` element
     *
     * @param el An element
     */
    function Polycon(el) {
        _classCallCheck(this, Polycon);

        if (!(el instanceof Element)) {
            throw new TypeError("Invalid argument type");
        }
        var rect = el.getBoundingClientRect();
        var points = el.getAttribute('data-points') || '';
        this._id = Polycon._createUUID();
        this._width = rect.width;
        this._height = rect.height;
        this.el = el;
        this._styleTransport();
        this._createSVG();
        this._setPoints(points);
        Polycon._setStyle();
        el.setAttribute(ATTRIBUTE_NAME, ROOT_NODE_NAME);
        window.addEventListener('resize', this._onResize.bind(this), false);
    }
    /**
     * Create a new instance or instance list
     *
     * @param selector A selector string or an element or element List
     */


    _createClass(Polycon, [{
        key: "_styleTransport",

        /**
         * Inheritance of styles
         *
         */
        value: function _styleTransport() {
            var el = this.el;
            this._backgroundImage = Polycon._getBackgroundImagePath(el);
            this._backgroundColor = Polycon._getBackgroundColor(el);
        }
        /**
         * Create a SVG element for psuedo-background
         *
         * ```html
         * <svg data-polycon-node="background" role="presentation" width="..." height="...">
         * 	<polygon points="......" fill="..." />
         * 	<defs>
         * 		<pattern id="..." patternUnits="userSpaceOnUse" x="0" y="0" width="..." height="...">
         * 			<image x="0" y="0" width="..." height="..." xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="..."/>
         * 		</pattern>
         * 	</defs>
         * </svg>
         * ```
         */

    }, {
        key: "_createSVG",
        value: function _createSVG() {
            var svg = document.createElementNS(NS_SVG, 'svg');
            svg.setAttribute('role', 'presentation');
            svg.setAttribute(ATTRIBUTE_NAME, BACKGROUND_NODE_NAME);
            svg.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._width);
            svg.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, this._height);
            var polygon = document.createElementNS(NS_SVG, 'polygon');
            svg.appendChild(polygon);
            var fill = '';
            if (this._backgroundImage) {
                var fillId = "fill-" + this._id;
                this._patternImage(svg, fillId);
                fill = "url(#" + fillId + ")";
            } else if (this._backgroundColor) {
                fill = this._backgroundColor;
            }
            if (fill) {
                polygon.setAttribute('fill', fill);
            }
            this.el.appendChild(svg);
            this.svg = svg;
            this.polygon = polygon;
        }
        /**
         * Create a pattern for background image
         */

    }, {
        key: "_patternImage",
        value: function _patternImage(svg, id) {
            var defs = document.createElementNS(NS_SVG, 'defs');
            var pattern = document.createElementNS(NS_SVG, 'pattern');
            pattern.id = id;
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');
            pattern.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
            pattern.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
            var image = document.createElementNS(NS_SVG, 'image');
            image.x.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
            image.y.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, 0);
            image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this._backgroundImage);
            pattern.appendChild(image);
            defs.appendChild(pattern);
            svg.appendChild(defs);
            var img = new Image();
            img.onload = this._onLoadedImage.bind(this, img, pattern, image);
            img.src = this._backgroundImage;
        }
        /**
         * Set image sizes when loaded image
         *
         * @param width Width of loaded background image
         * @param height Height of loaded background image
         * @param pattern `<pattern>` element for background image
         * @param image `<image>` element for background image
         */

    }, {
        key: "_onLoadedImage",
        value: function _onLoadedImage(_ref, pattern, image) {
            var width = _ref.width,
                height = _ref.height;

            var ratio = window.devicePixelRatio || 1;
            pattern.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, width / ratio);
            pattern.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, height / ratio);
            image.width.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, width / ratio);
            image.height.baseVal.newValueSpecifiedUnits(SVG_LENGTHTYPE_PX, height / ratio);
        }
        /**
         * Set points(vertices) at first time
         */

    }, {
        key: "_setPoints",
        value: function _setPoints(points) {
            this._points = new FlexPointList_1.default(points);
            var l = this._points.length;
            var pointsAttr = this.polygon.points;
            for (var i = 0; i < l; i++) {
                var _points$update = this._points.update(i, this._width, this._height),
                    newPoint = _points$update.newPoint;

                if (newPoint) {
                    var point = this.svg.createSVGPoint();
                    point.x = newPoint.x;
                    point.y = newPoint.y;
                    pointsAttr.appendItem(point);
                }
            }
        }
        /**
         * Update points(vertices)
         */

    }, {
        key: "_update",
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
                var _points$update2 = this._points.update(i, this._width, this._height),
                    isChanged = _points$update2.isChanged,
                    newPoint = _points$update2.newPoint;

                if (isChanged && newPoint) {
                    var point = this.svg.createSVGPoint();
                    point.x = newPoint.x;
                    point.y = newPoint.y;
                    pointsAttr.replaceItem(point, i);
                }
            }
        }
        /**
         * A resize handler
         */

    }, {
        key: "_onResize",
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
        key: "el",

        /**
         * A corresponding element
         */
        set: function set(el) {
            rootMap.set(this, el);
        },
        get: function get() {
            return rootMap.get(this);
        }
        /**
         * An innerHTML string of corresponding element
         *
         * @readonly
         */

    }, {
        key: "innerHTML",
        get: function get() {
            return this.el.innerHTML;
        }
        /**
         * A polygonal SVG element
         */

    }, {
        key: "svg",
        set: function set(svg) {
            svgMap.set(this, svg);
        },
        get: function get() {
            return svgMap.get(this);
        }
        /**
         * An element of `<polygon>` in SVG element
         */

    }, {
        key: "polygon",
        set: function set(polygon) {
            polygonMap.set(this, polygon);
        },
        get: function get() {
            return polygonMap.get(this);
        }
    }], [{
        key: "new",
        value: function _new(selector) {
            var nodeList = void 0;
            if (selector instanceof Node) {
                return new Polycon(selector);
            } else if (typeof selector === 'string') {
                nodeList = document.querySelectorAll(selector);
            } else if (selector instanceof NodeList) {
                nodeList = selector;
            } else {
                throw new TypeError("Invalid argument type");
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
        /**
         * Create string of UUID
         */

    }, {
        key: "_createUUID",
        value: function _createUUID() {
            return Math.round(Date.now() * Math.random()).toString(36);
        }
        /**
         * Get path of background image from an element
         */

    }, {
        key: "_getBackgroundImagePath",
        value: function _getBackgroundImagePath(el) {
            var style = window.getComputedStyle(el);
            var styleValue = style.getPropertyValue('background-image');
            if (!styleValue) {
                return '';
            }
            var matchArray = styleValue.match(/url\(("|')?([^\)]*)\1\)/);
            if (!matchArray) {
                return '';
            }

            var _matchArray = _slicedToArray(matchArray, 3),
                path = _matchArray[2];

            return path || '';
        }
        /**
         * Get color of background from an element
         */

    }, {
        key: "_getBackgroundColor",
        value: function _getBackgroundColor(el) {
            var style = window.getComputedStyle(el);
            var colorCode = style.getPropertyValue('background-color');
            return colorCode || '';
        }
        /**
         * Create a `<style>` element "only once" for `Polycon` elements
         */

    }, {
        key: "_setStyle",
        value: function _setStyle() {
            var style = document.querySelector(STYLE_SELECTOR);
            if (!style) {
                var head = document.getElementsByTagName('head')[0];
                style = document.createElement('style');
                style.setAttribute(ATTRIBUTE_NAME, STYLE_NODE_NAME);
                head.appendChild(style);
                var sheet = style.sheet;
                sheet.insertRule(ROOT_SELECTOR + " { position: relative; background: none !important; }", sheet.rules.length);
                sheet.insertRule(ROOT_SELECTOR + " > * { position: relative; z-index: 1; }", sheet.rules.length);
                sheet.insertRule(ROOT_SELECTOR + " > " + BACKGROUND_SELECTOR + " { position: absolute; z-index: 0; top: 0; left: 0; }", sheet.rules.length);
            }
        }
    }]);

    return Polycon;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Polycon;