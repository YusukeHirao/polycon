/**!
* polycon - v0.2.2
* revision: bfd36b2e7625e991075600089c8d71739f504154
* update: 2016-11-15
* Author: Yusuke Hirao [http://yusukehirao.github.io/polycon/]
* Github: https://github.com/YusukeHirao/polycon.git
* License: Licensed under the MIT License
*/

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 84);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var store      = __webpack_require__(27)('wks')
  , uid        = __webpack_require__(14)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ },
/* 1 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 3 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , hide      = __webpack_require__(6)
  , has       = __webpack_require__(3)
  , SRC       = __webpack_require__(14)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(8).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(11)
  , createDesc = __webpack_require__(18);
module.exports = __webpack_require__(9) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(23)
  , defined = __webpack_require__(36);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 8 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(39)
  , toPrimitive    = __webpack_require__(30)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = {};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(44)
  , enumBugKeys = __webpack_require__(21);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 14 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(54);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var META     = __webpack_require__(14)('meta')
  , isObject = __webpack_require__(2)
  , has      = __webpack_require__(3)
  , setDesc  = __webpack_require__(11).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(10)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ },
/* 17 */
/***/ function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f
  , has = __webpack_require__(3)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ },
/* 20 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 21 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(8)
  , hide      = __webpack_require__(6)
  , redefine  = __webpack_require__(5)
  , ctx       = __webpack_require__(15)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = false;

/***/ },
/* 25 */
/***/ function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(27)('keys')
  , uid    = __webpack_require__(14);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(36);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1)
  , core           = __webpack_require__(8)
  , LIBRARY        = __webpack_require__(24)
  , wksExt         = __webpack_require__(47)
  , defineProperty = __webpack_require__(11).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(48);
__webpack_require__(83);
__webpack_require__(80);
module.exports = __webpack_require__(8).WeakMap;

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(15)
  , IObject  = __webpack_require__(23)
  , toObject = __webpack_require__(29)
  , toLength = __webpack_require__(28)
  , asc      = __webpack_require__(58);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ },
/* 36 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(15)
  , call        = __webpack_require__(65)
  , isArrayIter = __webpack_require__(64)
  , anObject    = __webpack_require__(4)
  , toLength    = __webpack_require__(28)
  , getIterFn   = __webpack_require__(77)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(37)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(4)
  , dPs         = __webpack_require__(72)
  , enumBugKeys = __webpack_require__(21)
  , IE_PROTO    = __webpack_require__(26)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(37)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(62).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(17)
  , createDesc     = __webpack_require__(18)
  , toIObject      = __webpack_require__(7)
  , toPrimitive    = __webpack_require__(30)
  , has            = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(39)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(44)
  , hiddenKeys = __webpack_require__(21).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(3)
  , toIObject    = __webpack_require__(7)
  , arrayIndexOf = __webpack_require__(56)(false)
  , IE_PROTO     = __webpack_require__(26)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(5);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ },
/* 46 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(0);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(35)
  , test    = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(5)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(32);
var FlexPointList_1 = __webpack_require__(52);
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

/***/ },
/* 50 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlexNumber = function () {
    /**
     * Object that represents the number of any of the absolute value, rate, relative (offset) value.
     *
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
            var matchedValue = anyValue.match(/^[a-z]+(?:\s*([\-\+])\s*(-?[0-9]*\.?[0-9]+))?$/i);

            var _matchedValue = _slicedToArray(matchedValue, 3),
                sign = _matchedValue[1],
                numericValue = _matchedValue[2];

            var value = parseFloat(numericValue) || 0;
            if (sign === '-') {
                this._offset = value * -1;
            } else {
                this._offset = value;
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

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlexNumber_1 = __webpack_require__(50);

var FlexPoint = function () {
    /**
     * Flexible two-dimensional coordinates
     *
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

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(53);
__webpack_require__(32);
var FlexPoint_1 = __webpack_require__(51);

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
        key: "update",

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
                    window.console.warn("[" + index + "]th point is undefined");
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
        key: "_parse",
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

                            var _point$split = point.split(','),
                                _point$split2 = _slicedToArray(_point$split, 2),
                                x = _point$split2[0],
                                y = _point$split2[1];

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
        key: "length",

        /**
         * The number of points(vertices)
         */
        get: function get() {
            return this._flexPoints['default'].length;
        }
    }], [{
        key: "_mediaQueryParse",
        value: function _mediaQueryParse(query) {
            var rules = query.match(/@media[^\{]+\{[^\}]+\}/g);
            if (!rules) {
                return { default: query };
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

                    var _matches = _slicedToArray(matches, 3),
                        condition = _matches[1],
                        value = _matches[2];

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

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(48);
__webpack_require__(81);
__webpack_require__(82);
module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 54 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(6)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7)
  , toLength  = __webpack_require__(28)
  , toIndex   = __webpack_require__(76);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2)
  , isArray  = __webpack_require__(40)
  , SPECIES  = __webpack_require__(0)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(57);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var redefineAll       = __webpack_require__(45)
  , getWeak           = __webpack_require__(16).getWeak
  , anObject          = __webpack_require__(4)
  , isObject          = __webpack_require__(2)
  , anInstance        = __webpack_require__(33)
  , forOf             = __webpack_require__(38)
  , createArrayMethod = __webpack_require__(34)
  , $has              = __webpack_require__(3)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var global            = __webpack_require__(1)
  , $export           = __webpack_require__(22)
  , redefine          = __webpack_require__(5)
  , redefineAll       = __webpack_require__(45)
  , meta              = __webpack_require__(16)
  , forOf             = __webpack_require__(38)
  , anInstance        = __webpack_require__(33)
  , isObject          = __webpack_require__(2)
  , fails             = __webpack_require__(10)
  , $iterDetect       = __webpack_require__(68)
  , setToStringTag    = __webpack_require__(19)
  , inheritIfRequired = __webpack_require__(63);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(13)
  , gOPS    = __webpack_require__(25)
  , pIE     = __webpack_require__(17);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(2)
  , setPrototypeOf = __webpack_require__(75).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(12)
  , ITERATOR   = __webpack_require__(0)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var create         = __webpack_require__(41)
  , descriptor     = __webpack_require__(18)
  , setToStringTag = __webpack_require__(19)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var LIBRARY        = __webpack_require__(24)
  , $export        = __webpack_require__(22)
  , redefine       = __webpack_require__(5)
  , hide           = __webpack_require__(6)
  , has            = __webpack_require__(3)
  , Iterators      = __webpack_require__(12)
  , $iterCreate    = __webpack_require__(66)
  , setToStringTag = __webpack_require__(19)
  , getPrototypeOf = __webpack_require__(74)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(0)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ },
/* 69 */
/***/ function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(13)
  , toIObject = __webpack_require__(7);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(13)
  , gOPS     = __webpack_require__(25)
  , pIE      = __webpack_require__(17)
  , toObject = __webpack_require__(29)
  , IObject  = __webpack_require__(23)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(11)
  , anObject = __webpack_require__(4)
  , getKeys  = __webpack_require__(13);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(7)
  , gOPN      = __webpack_require__(43).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(3)
  , toObject    = __webpack_require__(29)
  , IE_PROTO    = __webpack_require__(26)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(2)
  , anObject = __webpack_require__(4);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(15)(Function.call, __webpack_require__(42).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(35)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(12);
module.exports = __webpack_require__(8).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var addToUnscopables = __webpack_require__(55)
  , step             = __webpack_require__(69)
  , Iterators        = __webpack_require__(12)
  , toIObject        = __webpack_require__(7);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(67)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// ECMAScript 6 symbols shim
var global         = __webpack_require__(1)
  , has            = __webpack_require__(3)
  , DESCRIPTORS    = __webpack_require__(9)
  , $export        = __webpack_require__(22)
  , redefine       = __webpack_require__(5)
  , META           = __webpack_require__(16).KEY
  , $fails         = __webpack_require__(10)
  , shared         = __webpack_require__(27)
  , setToStringTag = __webpack_require__(19)
  , uid            = __webpack_require__(14)
  , wks            = __webpack_require__(0)
  , wksExt         = __webpack_require__(47)
  , wksDefine      = __webpack_require__(31)
  , keyOf          = __webpack_require__(70)
  , enumKeys       = __webpack_require__(61)
  , isArray        = __webpack_require__(40)
  , anObject       = __webpack_require__(4)
  , toIObject      = __webpack_require__(7)
  , toPrimitive    = __webpack_require__(30)
  , createDesc     = __webpack_require__(18)
  , _create        = __webpack_require__(41)
  , gOPNExt        = __webpack_require__(73)
  , $GOPD          = __webpack_require__(42)
  , $DP            = __webpack_require__(11)
  , $keys          = __webpack_require__(13)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(43).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(17).f  = $propertyIsEnumerable;
  __webpack_require__(25).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(24)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var each         = __webpack_require__(34)(0)
  , redefine     = __webpack_require__(5)
  , meta         = __webpack_require__(16)
  , assign       = __webpack_require__(71)
  , weak         = __webpack_require__(59)
  , isObject     = __webpack_require__(2)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(60)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(31)('asyncIterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(31)('observable');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(78)
  , redefine      = __webpack_require__(5)
  , global        = __webpack_require__(1)
  , hide          = __webpack_require__(6)
  , Iterators     = __webpack_require__(12)
  , wks           = __webpack_require__(0)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Polycon_1 = __webpack_require__(49);
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

/***/ }
/******/ ]);