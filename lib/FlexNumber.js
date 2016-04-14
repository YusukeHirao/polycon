"use strict";
/**
 * Object that represents the number of any of the absolute value, rate, relative (offset) value.
 *
 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlexNumber = function () {
    /**
     * @param anyValue any value
     */

    function FlexNumber(anyValue) {
        _classCallCheck(this, FlexNumber);

        /**
         * absolute value
         */
        this._abs = 0;
        /**
         * rate (%)
         */
        this._rate = 100;
        /**
         * relative (offset) value
         */
        this._offset = 0;
        if (anyValue === undefined) {
            throw new TypeError('Missing arguments for method');
        }
        // to string and remove spaces
        anyValue = ('' + anyValue).trim().replace(/-\s+/, '-');
        if (/^-?[0-9]*\.?[0-9]+$/.test(anyValue)) {
            this._abs = parseFloat(anyValue);
            this._type = 'abs';
        } else if (/^-?[0-9]*\.?[0-9]+\s*%$/.test(anyValue)) {
            this._rate = parseFloat(anyValue.replace('%', ''));
            this._type = 'rate';
        } else if (/^[a-z]+(?:\s*[\-\+]\s*-?\s*[0-9]*\.?[0-9]+)?\s*$/i.test(anyValue)) {
            var _anyValue$match = anyValue.match(/^[a-z]+(?:\s*([\-\+])\s*(-?[0-9]*\.?[0-9]+))?$/i);

            var _anyValue$match2 = _slicedToArray(_anyValue$match, 3);

            var sign = _anyValue$match2[1];
            var _n = _anyValue$match2[2];

            var n = parseFloat(_n) || 0;
            if (sign === '-') {
                this._offset = n * -1;
            } else {
                this._offset = n;
            }
            this._type = 'offset';
        } else {
            throw new TypeError('Invalid value "' + anyValue + '", in FlexNumber constructor');
        }
    }
    /**
     * evaluate from base number
     *
     * @param base base number
     * @return result
     */


    _createClass(FlexNumber, [{
        key: 'evaluate',
        value: function evaluate(base) {
            switch (this._type) {
                case 'abs':
                    return this._abs;
                case 'rate':
                    return base * this._rate / 100;
                case 'offset':
                    return base + this._offset;
                default:
                    throw new Error('An unexpected error. A Type of FlexNumber instance is undefined');
            }
        }
    }]);

    return FlexNumber;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FlexNumber;