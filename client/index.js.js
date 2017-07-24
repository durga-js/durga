/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports = module.exports = __webpack_require__(12);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

function useColors() {
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

function log() {
  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

exports.enable(load());

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

EventEmitter.defaultMaxListeners = 10;

EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er;
      } else {
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type]) this._events[type] = listener;else if (isObject(this._events[type])) this._events[type].push(listener);else this._events[type] = [this._events[type], listener];

  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global, process) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (undefined) {

  var objectTypes = {
    'function': true,
    'object': true
  };

  function checkGlobal(value) {
    return value && value.Object === Object ? value : null;
  }

  var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : null;
  var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : null;
  var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global);
  var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);
  var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);
  var moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : null;
  var thisGlobal = checkGlobal(objectTypes[_typeof(this)] && this);
  var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

  var Rx = {
    internals: {},
    config: {
      Promise: root.Promise
    },
    helpers: {}
  };

  var noop = Rx.helpers.noop = function () {},
      identity = Rx.helpers.identity = function (x) {
    return x;
  },
      defaultNow = Rx.helpers.defaultNow = Date.now,
      defaultComparer = Rx.helpers.defaultComparer = function (x, y) {
    return isEqual(x, y);
  },
      defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) {
    return x > y ? 1 : x < y ? -1 : 0;
  },
      defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) {
    return x.toString();
  },
      defaultError = Rx.helpers.defaultError = function (err) {
    throw err;
  },
      isPromise = Rx.helpers.isPromise = function (p) {
    return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function';
  },
      isFunction = Rx.helpers.isFunction = function () {

    var isFn = function isFn(value) {
      return typeof value == 'function' || false;
    };

    if (isFn(/x/)) {
      isFn = function isFn(value) {
        return typeof value == 'function' && toString.call(value) == '[object Function]';
      };
    }

    return isFn;
  }();

  function cloneArray(arr) {
    for (var a = [], i = 0, len = arr.length; i < len; i++) {
      a.push(arr[i]);
    }return a;
  }

  var errorObj = { e: {} };

  function tryCatcherGen(tryCatchTarget) {
    return function tryCatcher() {
      try {
        return tryCatchTarget.apply(this, arguments);
      } catch (e) {
        errorObj.e = e;
        return errorObj;
      }
    };
  }

  var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
    if (!isFunction(fn)) {
      throw new TypeError('fn must be a function');
    }
    return tryCatcherGen(fn);
  };

  function thrower(e) {
    throw e;
  }

  Rx.config.longStackSupport = false;
  var hasStacks = false,
      stacks = tryCatch(function () {
    throw new Error();
  })();
  hasStacks = !!stacks.e && !!stacks.e.stack;

  var rStartingLine = captureLine(),
      rFileName;

  var STACK_JUMP_SEPARATOR = 'From previous event:';

  function makeStackTraceLong(error, observable) {
    if (hasStacks && observable.stack && (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
      var stacks = [];
      for (var o = observable; !!o; o = o.source) {
        if (o.stack) {
          stacks.unshift(o.stack);
        }
      }
      stacks.unshift(error.stack);

      var concatedStacks = stacks.join('\n' + STACK_JUMP_SEPARATOR + '\n');
      error.stack = filterStackString(concatedStacks);
    }
  }

  function filterStackString(stackString) {
    var lines = stackString.split('\n'),
        desiredLines = [];
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];

      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
        desiredLines.push(line);
      }
    }
    return desiredLines.join('\n');
  }

  function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
    if (!fileNameAndLineNumber) {
      return false;
    }
    var fileName = fileNameAndLineNumber[0],
        lineNumber = fileNameAndLineNumber[1];

    return fileName === rFileName && lineNumber >= rStartingLine && lineNumber <= rEndingLine;
  }

  function isNodeFrame(stackLine) {
    return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
  }

  function captureLine() {
    if (!hasStacks) {
      return;
    }

    try {
      throw new Error();
    } catch (e) {
      var lines = e.stack.split('\n');
      var firstLine = lines[0].indexOf('@') > 0 ? lines[1] : lines[2];
      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
      if (!fileNameAndLineNumber) {
        return;
      }

      rFileName = fileNameAndLineNumber[0];
      return fileNameAndLineNumber[1];
    }
  }

  function getFileNameAndLineNumber(stackLine) {
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
      return [attempt1[1], Number(attempt1[2])];
    }

    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
      return [attempt2[1], Number(attempt2[2])];
    }

    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
      return [attempt3[1], Number(attempt3[2])];
    }
  }

  var EmptyError = Rx.EmptyError = function () {
    this.message = 'Sequence contains no elements.';
    Error.call(this);
  };
  EmptyError.prototype = Object.create(Error.prototype);
  EmptyError.prototype.name = 'EmptyError';

  var ObjectDisposedError = Rx.ObjectDisposedError = function () {
    this.message = 'Object has been disposed';
    Error.call(this);
  };
  ObjectDisposedError.prototype = Object.create(Error.prototype);
  ObjectDisposedError.prototype.name = 'ObjectDisposedError';

  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
    this.message = 'Argument out of range';
    Error.call(this);
  };
  ArgumentOutOfRangeError.prototype = Object.create(Error.prototype);
  ArgumentOutOfRangeError.prototype.name = 'ArgumentOutOfRangeError';

  var NotSupportedError = Rx.NotSupportedError = function (message) {
    this.message = message || 'This operation is not supported';
    Error.call(this);
  };
  NotSupportedError.prototype = Object.create(Error.prototype);
  NotSupportedError.prototype.name = 'NotSupportedError';

  var NotImplementedError = Rx.NotImplementedError = function (message) {
    this.message = message || 'This operation is not implemented';
    Error.call(this);
  };
  NotImplementedError.prototype = Object.create(Error.prototype);
  NotImplementedError.prototype.name = 'NotImplementedError';

  var notImplemented = Rx.helpers.notImplemented = function () {
    throw new NotImplementedError();
  };

  var notSupported = Rx.helpers.notSupported = function () {
    throw new NotSupportedError();
  };

  var $iterator$ = typeof Symbol === 'function' && Symbol.iterator || '_es6shim_iterator_';

  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
    $iterator$ = '@@iterator';
  }

  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };

  var isIterable = Rx.helpers.isIterable = function (o) {
    return o && o[$iterator$] !== undefined;
  };

  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
    return o && o.length !== undefined;
  };

  Rx.helpers.iterator = $iterator$;

  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
    if (typeof thisArg === 'undefined') {
      return func;
    }
    switch (argCount) {
      case 0:
        return function () {
          return func.call(thisArg);
        };
      case 1:
        return function (arg) {
          return func.call(thisArg, arg);
        };
      case 2:
        return function (value, index) {
          return func.call(thisArg, value, index);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
    }

    return function () {
      return func.apply(thisArg, arguments);
    };
  };

  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
      dontEnumsLength = dontEnums.length;

  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  var objectProto = Object.prototype,
      hasOwnProperty = objectProto.hasOwnProperty,
      objToString = objectProto.toString,
      MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  var keys = Object.keys || function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [],
          prop,
          i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }();

  function equalObjects(object, other, equalFunc, isLoose, stackA, stackB) {
    var objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;

    if (objLength !== othLength && !isLoose) {
      return false;
    }
    var index = objLength,
        key;
    while (index--) {
      key = objProps[index];
      if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var skipCtor = isLoose;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key],
          result;

      if (!(result === undefined ? equalFunc(objValue, othValue, isLoose, stackA, stackB) : result)) {
        return false;
      }
      skipCtor || (skipCtor = key === 'constructor');
    }
    if (!skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      if (objCtor !== othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor === 'function' && objCtor instanceof objCtor && typeof othCtor === 'function' && othCtor instanceof othCtor)) {
        return false;
      }
    }
    return true;
  }

  function equalByTag(object, other, tag) {
    switch (tag) {
      case boolTag:
      case dateTag:
        return +object === +other;

      case errorTag:
        return object.name === other.name && object.message === other.message;

      case numberTag:
        return object !== +object ? other !== +other : object === +other;

      case regexpTag:
      case stringTag:
        return object === other + '';
    }
    return false;
  }

  var isObject = Rx.internals.isObject = function (value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return !!value && (type === 'object' || type === 'function');
  };

  function isObjectLike(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
  }

  function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
  }

  var isHostObject = function () {
    try {
      Object({ 'toString': 0 } + '');
    } catch (e) {
      return function () {
        return false;
      };
    }
    return function (value) {
      return typeof value.toString !== 'function' && typeof (value + '') === 'string';
    };
  }();

  function isTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
  }

  var isArray = Array.isArray || function (value) {
    return isObjectLike(value) && isLength(value.length) && objToString.call(value) === arrayTag;
  };

  function arraySome(array, predicate) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  function equalArrays(array, other, equalFunc, isLoose, stackA, stackB) {
    var index = -1,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength !== othLength && !(isLoose && othLength > arrLength)) {
      return false;
    }

    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index],
          result;

      if (result !== undefined) {
        if (result) {
          continue;
        }
        return false;
      }

      if (isLoose) {
        if (!arraySome(other, function (othValue) {
          return arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB);
        })) {
          return false;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB))) {
        return false;
      }
    }
    return true;
  }

  function baseIsEqualDeep(object, other, equalFunc, isLoose, stackA, stackB) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = arrayTag,
        othTag = arrayTag;

    if (!objIsArr) {
      objTag = objToString.call(object);
      if (objTag === argsTag) {
        objTag = objectTag;
      } else if (objTag !== objectTag) {
        objIsArr = isTypedArray(object);
      }
    }
    if (!othIsArr) {
      othTag = objToString.call(other);
      if (othTag === argsTag) {
        othTag = objectTag;
      }
    }
    var objIsObj = objTag === objectTag && !isHostObject(object),
        othIsObj = othTag === objectTag && !isHostObject(other),
        isSameTag = objTag === othTag;

    if (isSameTag && !(objIsArr || objIsObj)) {
      return equalByTag(object, other, objTag);
    }
    if (!isLoose) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, isLoose, stackA, stackB);
      }
    }
    if (!isSameTag) {
      return false;
    }

    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] === object) {
        return stackB[length] === other;
      }
    }

    stackA.push(object);
    stackB.push(other);

    var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, isLoose, stackA, stackB);

    stackA.pop();
    stackB.pop();

    return result;
  }

  function baseIsEqual(value, other, isLoose, stackA, stackB) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, baseIsEqual, isLoose, stackA, stackB);
  }

  var isEqual = Rx.internals.isEqual = function (value, other) {
    return baseIsEqual(value, other);
  };

  var hasProp = {}.hasOwnProperty,
      slice = Array.prototype.slice;

  var inherits = Rx.internals.inherits = function (child, parent) {
    function __() {
      this.constructor = child;
    }
    __.prototype = parent.prototype;
    child.prototype = new __();
  };

  var addProperties = Rx.internals.addProperties = function (obj) {
    for (var sources = [], i = 1, len = arguments.length; i < len; i++) {
      sources.push(arguments[i]);
    }
    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
      var source = sources[idx];
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  };

  var addRef = Rx.internals.addRef = function (xs, r) {
    return new AnonymousObservable(function (observer) {
      return new BinaryDisposable(r.getDisposable(), xs.subscribe(observer));
    });
  };

  function arrayInitialize(count, factory) {
    var a = new Array(count);
    for (var i = 0; i < count; i++) {
      a[i] = factory();
    }
    return a;
  }

  function IndexedItem(id, value) {
    this.id = id;
    this.value = value;
  }

  IndexedItem.prototype.compareTo = function (other) {
    var c = this.value.compareTo(other.value);
    c === 0 && (c = this.id - other.id);
    return c;
  };

  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
    this.items = new Array(capacity);
    this.length = 0;
  };

  var priorityProto = PriorityQueue.prototype;
  priorityProto.isHigherPriority = function (left, right) {
    return this.items[left].compareTo(this.items[right]) < 0;
  };

  priorityProto.percolate = function (index) {
    if (index >= this.length || index < 0) {
      return;
    }
    var parent = index - 1 >> 1;
    if (parent < 0 || parent === index) {
      return;
    }
    if (this.isHigherPriority(index, parent)) {
      var temp = this.items[index];
      this.items[index] = this.items[parent];
      this.items[parent] = temp;
      this.percolate(parent);
    }
  };

  priorityProto.heapify = function (index) {
    +index || (index = 0);
    if (index >= this.length || index < 0) {
      return;
    }
    var left = 2 * index + 1,
        right = 2 * index + 2,
        first = index;
    if (left < this.length && this.isHigherPriority(left, first)) {
      first = left;
    }
    if (right < this.length && this.isHigherPriority(right, first)) {
      first = right;
    }
    if (first !== index) {
      var temp = this.items[index];
      this.items[index] = this.items[first];
      this.items[first] = temp;
      this.heapify(first);
    }
  };

  priorityProto.peek = function () {
    return this.items[0].value;
  };

  priorityProto.removeAt = function (index) {
    this.items[index] = this.items[--this.length];
    this.items[this.length] = undefined;
    this.heapify();
  };

  priorityProto.dequeue = function () {
    var result = this.peek();
    this.removeAt(0);
    return result;
  };

  priorityProto.enqueue = function (item) {
    var index = this.length++;
    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
    this.percolate(index);
  };

  priorityProto.remove = function (item) {
    for (var i = 0; i < this.length; i++) {
      if (this.items[i].value === item) {
        this.removeAt(i);
        return true;
      }
    }
    return false;
  };
  PriorityQueue.count = 0;

  var CompositeDisposable = Rx.CompositeDisposable = function () {
    var args = [],
        i,
        len;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      len = arguments.length;
      args = new Array(len);
      for (i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
    }
    this.disposables = args;
    this.isDisposed = false;
    this.length = args.length;
  };

  var CompositeDisposablePrototype = CompositeDisposable.prototype;

  CompositeDisposablePrototype.add = function (item) {
    if (this.isDisposed) {
      item.dispose();
    } else {
      this.disposables.push(item);
      this.length++;
    }
  };

  CompositeDisposablePrototype.remove = function (item) {
    var shouldDispose = false;
    if (!this.isDisposed) {
      var idx = this.disposables.indexOf(item);
      if (idx !== -1) {
        shouldDispose = true;
        this.disposables.splice(idx, 1);
        this.length--;
        item.dispose();
      }
    }
    return shouldDispose;
  };

  CompositeDisposablePrototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var len = this.disposables.length,
          currentDisposables = new Array(len);
      for (var i = 0; i < len; i++) {
        currentDisposables[i] = this.disposables[i];
      }
      this.disposables = [];
      this.length = 0;

      for (i = 0; i < len; i++) {
        currentDisposables[i].dispose();
      }
    }
  };

  var Disposable = Rx.Disposable = function (action) {
    this.isDisposed = false;
    this.action = action || noop;
  };

  Disposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.action();
      this.isDisposed = true;
    }
  };

  var disposableCreate = Disposable.create = function (action) {
    return new Disposable(action);
  };

  var disposableEmpty = Disposable.empty = { dispose: noop };

  var isDisposable = Disposable.isDisposable = function (d) {
    return d && isFunction(d.dispose);
  };

  var checkDisposed = Disposable.checkDisposed = function (disposable) {
    if (disposable.isDisposed) {
      throw new ObjectDisposedError();
    }
  };

  var disposableFixup = Disposable._fixup = function (result) {
    return isDisposable(result) ? result : disposableEmpty;
  };

  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SingleAssignmentDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
    if (this.current) {
      throw new Error('Disposable has already been assigned');
    }
    var shouldDispose = this.isDisposed;
    !shouldDispose && (this.current = value);
    shouldDispose && value && value.dispose();
  };
  SingleAssignmentDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
      old && old.dispose();
    }
  };

  var SerialDisposable = Rx.SerialDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SerialDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SerialDisposable.prototype.setDisposable = function (value) {
    var shouldDispose = this.isDisposed;
    if (!shouldDispose) {
      var old = this.current;
      this.current = value;
    }
    old && old.dispose();
    shouldDispose && value && value.dispose();
  };
  SerialDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  var BinaryDisposable = Rx.BinaryDisposable = function (first, second) {
    this._first = first;
    this._second = second;
    this.isDisposed = false;
  };

  BinaryDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old1 = this._first;
      this._first = null;
      old1 && old1.dispose();
      var old2 = this._second;
      this._second = null;
      old2 && old2.dispose();
    }
  };

  var NAryDisposable = Rx.NAryDisposable = function (disposables) {
    this._disposables = disposables;
    this.isDisposed = false;
  };

  NAryDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      for (var i = 0, len = this._disposables.length; i < len; i++) {
        this._disposables[i].dispose();
      }
      this._disposables.length = 0;
    }
  };

  var RefCountDisposable = Rx.RefCountDisposable = function () {

    function InnerDisposable(disposable) {
      this.disposable = disposable;
      this.disposable.count++;
      this.isInnerDisposed = false;
    }

    InnerDisposable.prototype.dispose = function () {
      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
        this.isInnerDisposed = true;
        this.disposable.count--;
        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
          this.disposable.isDisposed = true;
          this.disposable.underlyingDisposable.dispose();
        }
      }
    };

    function RefCountDisposable(disposable) {
      this.underlyingDisposable = disposable;
      this.isDisposed = false;
      this.isPrimaryDisposed = false;
      this.count = 0;
    }

    RefCountDisposable.prototype.dispose = function () {
      if (!this.isDisposed && !this.isPrimaryDisposed) {
        this.isPrimaryDisposed = true;
        if (this.count === 0) {
          this.isDisposed = true;
          this.underlyingDisposable.dispose();
        }
      }
    };

    RefCountDisposable.prototype.getDisposable = function () {
      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
    };

    return RefCountDisposable;
  }();

  function ScheduledDisposable(scheduler, disposable) {
    this.scheduler = scheduler;
    this.disposable = disposable;
    this.isDisposed = false;
  }

  function scheduleItem(s, self) {
    if (!self.isDisposed) {
      self.isDisposed = true;
      self.disposable.dispose();
    }
  }

  ScheduledDisposable.prototype.dispose = function () {
    this.scheduler.schedule(this, scheduleItem);
  };

  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
    this.scheduler = scheduler;
    this.state = state;
    this.action = action;
    this.dueTime = dueTime;
    this.comparer = comparer || defaultSubComparer;
    this.disposable = new SingleAssignmentDisposable();
  };

  ScheduledItem.prototype.invoke = function () {
    this.disposable.setDisposable(this.invokeCore());
  };

  ScheduledItem.prototype.compareTo = function (other) {
    return this.comparer(this.dueTime, other.dueTime);
  };

  ScheduledItem.prototype.isCancelled = function () {
    return this.disposable.isDisposed;
  };

  ScheduledItem.prototype.invokeCore = function () {
    return disposableFixup(this.action(this.scheduler, this.state));
  };

  var Scheduler = Rx.Scheduler = function () {

    function Scheduler() {}

    Scheduler.isScheduler = function (s) {
      return s instanceof Scheduler;
    };

    var schedulerProto = Scheduler.prototype;

    schedulerProto.schedule = function (state, action) {
      throw new NotImplementedError();
    };

    schedulerProto.scheduleFuture = function (state, dueTime, action) {
      var dt = dueTime;
      dt instanceof Date && (dt = dt - this.now());
      dt = Scheduler.normalize(dt);

      if (dt === 0) {
        return this.schedule(state, action);
      }

      return this._scheduleFuture(state, dt, action);
    };

    schedulerProto._scheduleFuture = function (state, dueTime, action) {
      throw new NotImplementedError();
    };

    Scheduler.now = defaultNow;

    Scheduler.prototype.now = defaultNow;

    Scheduler.normalize = function (timeSpan) {
      timeSpan < 0 && (timeSpan = 0);
      return timeSpan;
    };

    return Scheduler;
  }();

  var normalizeTime = Scheduler.normalize,
      isScheduler = Scheduler.isScheduler;

  (function (schedulerProto) {

    function invokeRecImmediate(scheduler, pair) {
      var state = pair[0],
          action = pair[1],
          group = new CompositeDisposable();
      action(state, innerAction);
      return group;

      function innerAction(state2) {
        var isAdded = false,
            isDone = false;

        var d = scheduler.schedule(state2, scheduleWork);
        if (!isDone) {
          group.add(d);
          isAdded = true;
        }

        function scheduleWork(_, state3) {
          if (isAdded) {
            group.remove(d);
          } else {
            isDone = true;
          }
          action(state3, innerAction);
          return disposableEmpty;
        }
      }
    }

    function invokeRecDate(scheduler, pair) {
      var state = pair[0],
          action = pair[1],
          group = new CompositeDisposable();
      action(state, innerAction);
      return group;

      function innerAction(state2, dueTime1) {
        var isAdded = false,
            isDone = false;

        var d = scheduler.scheduleFuture(state2, dueTime1, scheduleWork);
        if (!isDone) {
          group.add(d);
          isAdded = true;
        }

        function scheduleWork(_, state3) {
          if (isAdded) {
            group.remove(d);
          } else {
            isDone = true;
          }
          action(state3, innerAction);
          return disposableEmpty;
        }
      }
    }

    schedulerProto.scheduleRecursive = function (state, action) {
      return this.schedule([state, action], invokeRecImmediate);
    };

    schedulerProto.scheduleRecursiveFuture = function (state, dueTime, action) {
      return this.scheduleFuture([state, action], dueTime, invokeRecDate);
    };
  })(Scheduler.prototype);

  (function (schedulerProto) {
    schedulerProto.schedulePeriodic = function (state, period, action) {
      if (typeof root.setInterval === 'undefined') {
        throw new NotSupportedError();
      }
      period = normalizeTime(period);
      var s = state,
          id = root.setInterval(function () {
        s = action(s);
      }, period);
      return disposableCreate(function () {
        root.clearInterval(id);
      });
    };
  })(Scheduler.prototype);

  (function (schedulerProto) {
    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
      return new CatchScheduler(this, handler);
    };
  })(Scheduler.prototype);

  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = function () {
    function createTick(self) {
      return function tick(command, recurse) {
        recurse(0, self._period);
        var state = tryCatch(self._action)(self._state);
        if (state === errorObj) {
          self._cancel.dispose();
          thrower(state.e);
        }
        self._state = state;
      };
    }

    function SchedulePeriodicRecursive(scheduler, state, period, action) {
      this._scheduler = scheduler;
      this._state = state;
      this._period = period;
      this._action = action;
    }

    SchedulePeriodicRecursive.prototype.start = function () {
      var d = new SingleAssignmentDisposable();
      this._cancel = d;
      d.setDisposable(this._scheduler.scheduleRecursiveFuture(0, this._period, createTick(this)));

      return d;
    };

    return SchedulePeriodicRecursive;
  }();

  var ImmediateScheduler = function (__super__) {
    inherits(ImmediateScheduler, __super__);
    function ImmediateScheduler() {
      __super__.call(this);
    }

    ImmediateScheduler.prototype.schedule = function (state, action) {
      return disposableFixup(action(this, state));
    };

    return ImmediateScheduler;
  }(Scheduler);

  var immediateScheduler = Scheduler.immediate = new ImmediateScheduler();

  var CurrentThreadScheduler = function (__super__) {
    var queue;

    function runTrampoline() {
      while (queue.length > 0) {
        var item = queue.dequeue();
        !item.isCancelled() && item.invoke();
      }
    }

    inherits(CurrentThreadScheduler, __super__);
    function CurrentThreadScheduler() {
      __super__.call(this);
    }

    CurrentThreadScheduler.prototype.schedule = function (state, action) {
      var si = new ScheduledItem(this, state, action, this.now());

      if (!queue) {
        queue = new PriorityQueue(4);
        queue.enqueue(si);

        var result = tryCatch(runTrampoline)();
        queue = null;
        if (result === errorObj) {
          thrower(result.e);
        }
      } else {
        queue.enqueue(si);
      }
      return si.disposable;
    };

    CurrentThreadScheduler.prototype.scheduleRequired = function () {
      return !queue;
    };

    return CurrentThreadScheduler;
  }(Scheduler);

  var currentThreadScheduler = Scheduler.currentThread = new CurrentThreadScheduler();

  var scheduleMethod, clearMethod;

  var localTimer = function () {
    var localSetTimeout,
        localClearTimeout = noop;
    if (!!root.setTimeout) {
      localSetTimeout = root.setTimeout;
      localClearTimeout = root.clearTimeout;
    } else if (!!root.WScript) {
      localSetTimeout = function localSetTimeout(fn, time) {
        root.WScript.Sleep(time);
        fn();
      };
    } else {
      throw new NotSupportedError();
    }

    return {
      setTimeout: localSetTimeout,
      clearTimeout: localClearTimeout
    };
  }();
  var localSetTimeout = localTimer.setTimeout,
      localClearTimeout = localTimer.clearTimeout;

  (function () {

    var nextHandle = 1,
        tasksByHandle = {},
        currentlyRunning = false;

    clearMethod = function clearMethod(handle) {
      delete tasksByHandle[handle];
    };

    function runTask(handle) {
      if (currentlyRunning) {
        localSetTimeout(function () {
          runTask(handle);
        }, 0);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunning = true;
          var result = tryCatch(task)();
          clearMethod(handle);
          currentlyRunning = false;
          if (result === errorObj) {
            thrower(result.e);
          }
        }
      }
    }

    var reNative = new RegExp('^' + String(toString).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/toString| for [^\]]+/g, '.*?') + '$');

    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' && !reNative.test(setImmediate) && setImmediate;

    function postMessageSupported() {
      if (!root.postMessage || root.importScripts) {
        return false;
      }
      var isAsync = false,
          oldHandler = root.onmessage;

      root.onmessage = function () {
        isAsync = true;
      };
      root.postMessage('', '*');
      root.onmessage = oldHandler;

      return isAsync;
    }

    if (isFunction(setImmediate)) {
      scheduleMethod = function scheduleMethod(action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        setImmediate(function () {
          runTask(id);
        });

        return id;
      };
    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
      scheduleMethod = function scheduleMethod(action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        process.nextTick(function () {
          runTask(id);
        });

        return id;
      };
    } else if (postMessageSupported()) {
      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

      var onGlobalPostMessage = function onGlobalPostMessage(event) {
        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
          runTask(event.data.substring(MSG_PREFIX.length));
        }
      };

      root.addEventListener('message', onGlobalPostMessage, false);

      scheduleMethod = function scheduleMethod(action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        root.postMessage(MSG_PREFIX + id, '*');
        return id;
      };
    } else if (!!root.MessageChannel) {
      var channel = new root.MessageChannel();

      channel.port1.onmessage = function (e) {
        runTask(e.data);
      };

      scheduleMethod = function scheduleMethod(action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        channel.port2.postMessage(id);
        return id;
      };
    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

      scheduleMethod = function scheduleMethod(action) {
        var scriptElement = root.document.createElement('script');
        var id = nextHandle++;
        tasksByHandle[id] = action;

        scriptElement.onreadystatechange = function () {
          runTask(id);
          scriptElement.onreadystatechange = null;
          scriptElement.parentNode.removeChild(scriptElement);
          scriptElement = null;
        };
        root.document.documentElement.appendChild(scriptElement);
        return id;
      };
    } else {
      scheduleMethod = function scheduleMethod(action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        localSetTimeout(function () {
          runTask(id);
        }, 0);

        return id;
      };
    }
  })();

  var DefaultScheduler = function (__super__) {
    inherits(DefaultScheduler, __super__);
    function DefaultScheduler() {
      __super__.call(this);
    }

    function scheduleAction(disposable, action, scheduler, state) {
      return function schedule() {
        disposable.setDisposable(Disposable._fixup(action(scheduler, state)));
      };
    }

    function ClearDisposable(id) {
      this._id = id;
      this.isDisposed = false;
    }

    ClearDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        clearMethod(this._id);
      }
    };

    function LocalClearDisposable(id) {
      this._id = id;
      this.isDisposed = false;
    }

    LocalClearDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        localClearTimeout(this._id);
      }
    };

    DefaultScheduler.prototype.schedule = function (state, action) {
      var disposable = new SingleAssignmentDisposable(),
          id = scheduleMethod(scheduleAction(disposable, action, this, state));
      return new BinaryDisposable(disposable, new ClearDisposable(id));
    };

    DefaultScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
      if (dueTime === 0) {
        return this.schedule(state, action);
      }
      var disposable = new SingleAssignmentDisposable(),
          id = localSetTimeout(scheduleAction(disposable, action, this, state), dueTime);
      return new BinaryDisposable(disposable, new LocalClearDisposable(id));
    };

    function scheduleLongRunning(state, action, disposable) {
      return function () {
        action(state, disposable);
      };
    }

    DefaultScheduler.prototype.scheduleLongRunning = function (state, action) {
      var disposable = disposableCreate(noop);
      scheduleMethod(scheduleLongRunning(state, action, disposable));
      return disposable;
    };

    return DefaultScheduler;
  }(Scheduler);

  var defaultScheduler = Scheduler['default'] = Scheduler.async = new DefaultScheduler();

  var CatchScheduler = function (__super__) {
    inherits(CatchScheduler, __super__);

    function CatchScheduler(scheduler, handler) {
      this._scheduler = scheduler;
      this._handler = handler;
      this._recursiveOriginal = null;
      this._recursiveWrapper = null;
      __super__.call(this);
    }

    CatchScheduler.prototype.schedule = function (state, action) {
      return this._scheduler.schedule(state, this._wrap(action));
    };

    CatchScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
      return this._scheduler.schedule(state, dueTime, this._wrap(action));
    };

    CatchScheduler.prototype.now = function () {
      return this._scheduler.now();
    };

    CatchScheduler.prototype._clone = function (scheduler) {
      return new CatchScheduler(scheduler, this._handler);
    };

    CatchScheduler.prototype._wrap = function (action) {
      var parent = this;
      return function (self, state) {
        var res = tryCatch(action)(parent._getRecursiveWrapper(self), state);
        if (res === errorObj) {
          if (!parent._handler(res.e)) {
            thrower(res.e);
          }
          return disposableEmpty;
        }
        return disposableFixup(res);
      };
    };

    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
      if (this._recursiveOriginal !== scheduler) {
        this._recursiveOriginal = scheduler;
        var wrapper = this._clone(scheduler);
        wrapper._recursiveOriginal = scheduler;
        wrapper._recursiveWrapper = wrapper;
        this._recursiveWrapper = wrapper;
      }
      return this._recursiveWrapper;
    };

    CatchScheduler.prototype.schedulePeriodic = function (state, period, action) {
      var self = this,
          failed = false,
          d = new SingleAssignmentDisposable();

      d.setDisposable(this._scheduler.schedulePeriodic(state, period, function (state1) {
        if (failed) {
          return null;
        }
        var res = tryCatch(action)(state1);
        if (res === errorObj) {
          failed = true;
          if (!self._handler(res.e)) {
            thrower(res.e);
          }
          d.dispose();
          return null;
        }
        return res;
      }));

      return d;
    };

    return CatchScheduler;
  }(Scheduler);

  var Notification = Rx.Notification = function () {
    function Notification() {}

    Notification.prototype._accept = function (onNext, onError, onCompleted) {
      throw new NotImplementedError();
    };

    Notification.prototype._acceptObserver = function (onNext, onError, onCompleted) {
      throw new NotImplementedError();
    };

    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
      return observerOrOnNext && (typeof observerOrOnNext === 'undefined' ? 'undefined' : _typeof(observerOrOnNext)) === 'object' ? this._acceptObserver(observerOrOnNext) : this._accept(observerOrOnNext, onError, onCompleted);
    };

    Notification.prototype.toObservable = function (scheduler) {
      var self = this;
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function (o) {
        return scheduler.schedule(self, function (_, notification) {
          notification._acceptObserver(o);
          notification.kind === 'N' && o.onCompleted();
        });
      });
    };

    return Notification;
  }();

  var OnNextNotification = function (__super__) {
    inherits(OnNextNotification, __super__);
    function OnNextNotification(value) {
      this.value = value;
      this.kind = 'N';
    }

    OnNextNotification.prototype._accept = function (onNext) {
      return onNext(this.value);
    };

    OnNextNotification.prototype._acceptObserver = function (o) {
      return o.onNext(this.value);
    };

    OnNextNotification.prototype.toString = function () {
      return 'OnNext(' + this.value + ')';
    };

    return OnNextNotification;
  }(Notification);

  var OnErrorNotification = function (__super__) {
    inherits(OnErrorNotification, __super__);
    function OnErrorNotification(error) {
      this.error = error;
      this.kind = 'E';
    }

    OnErrorNotification.prototype._accept = function (onNext, onError) {
      return onError(this.error);
    };

    OnErrorNotification.prototype._acceptObserver = function (o) {
      return o.onError(this.error);
    };

    OnErrorNotification.prototype.toString = function () {
      return 'OnError(' + this.error + ')';
    };

    return OnErrorNotification;
  }(Notification);

  var OnCompletedNotification = function (__super__) {
    inherits(OnCompletedNotification, __super__);
    function OnCompletedNotification() {
      this.kind = 'C';
    }

    OnCompletedNotification.prototype._accept = function (onNext, onError, onCompleted) {
      return onCompleted();
    };

    OnCompletedNotification.prototype._acceptObserver = function (o) {
      return o.onCompleted();
    };

    OnCompletedNotification.prototype.toString = function () {
      return 'OnCompleted()';
    };

    return OnCompletedNotification;
  }(Notification);

  var notificationCreateOnNext = Notification.createOnNext = function (value) {
    return new OnNextNotification(value);
  };

  var notificationCreateOnError = Notification.createOnError = function (error) {
    return new OnErrorNotification(error);
  };

  var notificationCreateOnCompleted = Notification.createOnCompleted = function () {
    return new OnCompletedNotification();
  };

  var Observer = Rx.Observer = function () {};

  Observer.prototype.toNotifier = function () {
    var observer = this;
    return function (n) {
      return n.accept(observer);
    };
  };

  Observer.prototype.asObserver = function () {
    var self = this;
    return new AnonymousObserver(function (x) {
      self.onNext(x);
    }, function (err) {
      self.onError(err);
    }, function () {
      self.onCompleted();
    });
  };

  Observer.prototype.checked = function () {
    return new CheckedObserver(this);
  };

  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
    onNext || (onNext = noop);
    onError || (onError = defaultError);
    onCompleted || (onCompleted = noop);
    return new AnonymousObserver(onNext, onError, onCompleted);
  };

  Observer.fromNotifier = function (handler, thisArg) {
    var cb = bindCallback(handler, thisArg, 1);
    return new AnonymousObserver(function (x) {
      return cb(notificationCreateOnNext(x));
    }, function (e) {
      return cb(notificationCreateOnError(e));
    }, function () {
      return cb(notificationCreateOnCompleted());
    });
  };

  Observer.prototype.notifyOn = function (scheduler) {
    return new ObserveOnObserver(scheduler, this);
  };

  Observer.prototype.makeSafe = function (disposable) {
    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
  };

  var AbstractObserver = Rx.internals.AbstractObserver = function (__super__) {
    inherits(AbstractObserver, __super__);

    function AbstractObserver() {
      this.isStopped = false;
    }

    AbstractObserver.prototype.next = notImplemented;
    AbstractObserver.prototype.error = notImplemented;
    AbstractObserver.prototype.completed = notImplemented;

    AbstractObserver.prototype.onNext = function (value) {
      !this.isStopped && this.next(value);
    };

    AbstractObserver.prototype.onError = function (error) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(error);
      }
    };

    AbstractObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.completed();
      }
    };

    AbstractObserver.prototype.dispose = function () {
      this.isStopped = true;
    };

    AbstractObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(e);
        return true;
      }

      return false;
    };

    return AbstractObserver;
  }(Observer);

  var AnonymousObserver = Rx.AnonymousObserver = function (__super__) {
    inherits(AnonymousObserver, __super__);

    function AnonymousObserver(onNext, onError, onCompleted) {
      __super__.call(this);
      this._onNext = onNext;
      this._onError = onError;
      this._onCompleted = onCompleted;
    }

    AnonymousObserver.prototype.next = function (value) {
      this._onNext(value);
    };

    AnonymousObserver.prototype.error = function (error) {
      this._onError(error);
    };

    AnonymousObserver.prototype.completed = function () {
      this._onCompleted();
    };

    return AnonymousObserver;
  }(AbstractObserver);

  var CheckedObserver = function (__super__) {
    inherits(CheckedObserver, __super__);

    function CheckedObserver(observer) {
      __super__.call(this);
      this._observer = observer;
      this._state = 0;
    }

    var CheckedObserverPrototype = CheckedObserver.prototype;

    CheckedObserverPrototype.onNext = function (value) {
      this.checkAccess();
      var res = tryCatch(this._observer.onNext).call(this._observer, value);
      this._state = 0;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onError = function (err) {
      this.checkAccess();
      var res = tryCatch(this._observer.onError).call(this._observer, err);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onCompleted = function () {
      this.checkAccess();
      var res = tryCatch(this._observer.onCompleted).call(this._observer);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.checkAccess = function () {
      if (this._state === 1) {
        throw new Error('Re-entrancy detected');
      }
      if (this._state === 2) {
        throw new Error('Observer completed');
      }
      if (this._state === 0) {
        this._state = 1;
      }
    };

    return CheckedObserver;
  }(Observer);

  var ScheduledObserver = Rx.internals.ScheduledObserver = function (__super__) {
    inherits(ScheduledObserver, __super__);

    function ScheduledObserver(scheduler, observer) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.observer = observer;
      this.isAcquired = false;
      this.hasFaulted = false;
      this.queue = [];
      this.disposable = new SerialDisposable();
    }

    function enqueueNext(observer, x) {
      return function () {
        observer.onNext(x);
      };
    }
    function enqueueError(observer, e) {
      return function () {
        observer.onError(e);
      };
    }
    function enqueueCompleted(observer) {
      return function () {
        observer.onCompleted();
      };
    }

    ScheduledObserver.prototype.next = function (x) {
      this.queue.push(enqueueNext(this.observer, x));
    };

    ScheduledObserver.prototype.error = function (e) {
      this.queue.push(enqueueError(this.observer, e));
    };

    ScheduledObserver.prototype.completed = function () {
      this.queue.push(enqueueCompleted(this.observer));
    };

    function scheduleMethod(state, recurse) {
      var work;
      if (state.queue.length > 0) {
        work = state.queue.shift();
      } else {
        state.isAcquired = false;
        return;
      }
      var res = tryCatch(work)();
      if (res === errorObj) {
        state.queue = [];
        state.hasFaulted = true;
        return thrower(res.e);
      }
      recurse(state);
    }

    ScheduledObserver.prototype.ensureActive = function () {
      var isOwner = false;
      if (!this.hasFaulted && this.queue.length > 0) {
        isOwner = !this.isAcquired;
        this.isAcquired = true;
      }
      isOwner && this.disposable.setDisposable(this.scheduler.scheduleRecursive(this, scheduleMethod));
    };

    ScheduledObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.disposable.dispose();
    };

    return ScheduledObserver;
  }(AbstractObserver);

  var ObserveOnObserver = function (__super__) {
    inherits(ObserveOnObserver, __super__);

    function ObserveOnObserver(scheduler, observer, cancel) {
      __super__.call(this, scheduler, observer);
      this._cancel = cancel;
    }

    ObserveOnObserver.prototype.next = function (value) {
      __super__.prototype.next.call(this, value);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.error = function (e) {
      __super__.prototype.error.call(this, e);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.completed = function () {
      __super__.prototype.completed.call(this);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this._cancel && this._cancel.dispose();
      this._cancel = null;
    };

    return ObserveOnObserver;
  }(ScheduledObserver);

  var observableProto;

  var Observable = Rx.Observable = function () {

    function makeSubscribe(self, subscribe) {
      return function (o) {
        var oldOnError = o.onError;
        o.onError = function (e) {
          makeStackTraceLong(e, self);
          oldOnError.call(o, e);
        };

        return subscribe.call(self, o);
      };
    }

    function Observable() {
      if (Rx.config.longStackSupport && hasStacks) {
        var oldSubscribe = this._subscribe;
        var e = tryCatch(thrower)(new Error()).e;
        this.stack = e.stack.substring(e.stack.indexOf('\n') + 1);
        this._subscribe = makeSubscribe(this, oldSubscribe);
      }
    }

    observableProto = Observable.prototype;

    Observable.isObservable = function (o) {
      return o && isFunction(o.subscribe);
    };

    observableProto.subscribe = observableProto.forEach = function (oOrOnNext, onError, onCompleted) {
      return this._subscribe((typeof oOrOnNext === 'undefined' ? 'undefined' : _typeof(oOrOnNext)) === 'object' ? oOrOnNext : observerCreate(oOrOnNext, onError, onCompleted));
    };

    observableProto.subscribeOnNext = function (onNext, thisArg) {
      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function (x) {
        onNext.call(thisArg, x);
      } : onNext));
    };

    observableProto.subscribeOnError = function (onError, thisArg) {
      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function (e) {
        onError.call(thisArg, e);
      } : onError));
    };

    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function () {
        onCompleted.call(thisArg);
      } : onCompleted));
    };

    return Observable;
  }();

  var ObservableBase = Rx.ObservableBase = function (__super__) {
    inherits(ObservableBase, __super__);

    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber : isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0],
          self = state[1];
      var sub = tryCatch(self.subscribeCore).call(self, ado);
      if (sub === errorObj && !ado.fail(errorObj.e)) {
        thrower(errorObj.e);
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function ObservableBase() {
      __super__.call(this);
    }

    ObservableBase.prototype._subscribe = function (o) {
      var ado = new AutoDetachObserver(o),
          state = [ado, this];

      if (currentThreadScheduler.scheduleRequired()) {
        currentThreadScheduler.schedule(state, setDisposable);
      } else {
        setDisposable(null, state);
      }
      return ado;
    };

    ObservableBase.prototype.subscribeCore = notImplemented;

    return ObservableBase;
  }(Observable);

  var FlatMapObservable = Rx.FlatMapObservable = function (__super__) {

    inherits(FlatMapObservable, __super__);

    function FlatMapObservable(source, selector, resultSelector, thisArg) {
      this.resultSelector = isFunction(resultSelector) ? resultSelector : null;
      this.selector = bindCallback(isFunction(selector) ? selector : function () {
        return selector;
      }, thisArg, 3);
      this.source = source;
      __super__.call(this);
    }

    FlatMapObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.selector, this.resultSelector, this));
    };

    inherits(InnerObserver, AbstractObserver);
    function InnerObserver(observer, selector, resultSelector, source) {
      this.i = 0;
      this.selector = selector;
      this.resultSelector = resultSelector;
      this.source = source;
      this.o = observer;
      AbstractObserver.call(this);
    }

    InnerObserver.prototype._wrapResult = function (result, x, i) {
      return this.resultSelector ? result.map(function (y, i2) {
        return this.resultSelector(x, y, i, i2);
      }, this) : result;
    };

    InnerObserver.prototype.next = function (x) {
      var i = this.i++;
      var result = tryCatch(this.selector)(x, i, this.source);
      if (result === errorObj) {
        return this.o.onError(result.e);
      }

      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = Observable.from(result));
      this.o.onNext(this._wrapResult(result, x, i));
    };

    InnerObserver.prototype.error = function (e) {
      this.o.onError(e);
    };

    InnerObserver.prototype.completed = function () {
      this.o.onCompleted();
    };

    return FlatMapObservable;
  }(ObservableBase);

  var Enumerable = Rx.internals.Enumerable = function () {};

  function IsDisposedDisposable(state) {
    this._s = state;
    this.isDisposed = false;
  }

  IsDisposedDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      this._s.isDisposed = true;
    }
  };

  var ConcatEnumerableObservable = function (__super__) {
    inherits(ConcatEnumerableObservable, __super__);
    function ConcatEnumerableObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }

    function scheduleMethod(state, recurse) {
      if (state.isDisposed) {
        return;
      }
      var currentItem = tryCatch(state.e.next).call(state.e);
      if (currentItem === errorObj) {
        return state.o.onError(currentItem.e);
      }
      if (currentItem.done) {
        return state.o.onCompleted();
      }

      var currentValue = currentItem.value;
      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

      var d = new SingleAssignmentDisposable();
      state.subscription.setDisposable(d);
      d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
    }

    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
      var subscription = new SerialDisposable();
      var state = {
        isDisposed: false,
        o: o,
        subscription: subscription,
        e: this.sources[$iterator$]()
      };

      var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
      return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
    };

    function InnerObserver(state, recurse) {
      this._state = state;
      this._recurse = recurse;
      AbstractObserver.call(this);
    }

    inherits(InnerObserver, AbstractObserver);

    InnerObserver.prototype.next = function (x) {
      this._state.o.onNext(x);
    };
    InnerObserver.prototype.error = function (e) {
      this._state.o.onError(e);
    };
    InnerObserver.prototype.completed = function () {
      this._recurse(this._state);
    };

    return ConcatEnumerableObservable;
  }(ObservableBase);

  Enumerable.prototype.concat = function () {
    return new ConcatEnumerableObservable(this);
  };

  var CatchErrorObservable = function (__super__) {
    function CatchErrorObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }

    inherits(CatchErrorObservable, __super__);

    function scheduleMethod(state, recurse) {
      if (state.isDisposed) {
        return;
      }
      var currentItem = tryCatch(state.e.next).call(state.e);
      if (currentItem === errorObj) {
        return state.o.onError(currentItem.e);
      }
      if (currentItem.done) {
        return state.lastError !== null ? state.o.onError(state.lastError) : state.o.onCompleted();
      }

      var currentValue = currentItem.value;
      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

      var d = new SingleAssignmentDisposable();
      state.subscription.setDisposable(d);
      d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
    }

    CatchErrorObservable.prototype.subscribeCore = function (o) {
      var subscription = new SerialDisposable();
      var state = {
        isDisposed: false,
        e: this.sources[$iterator$](),
        subscription: subscription,
        lastError: null,
        o: o
      };

      var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
      return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
    };

    function InnerObserver(state, recurse) {
      this._state = state;
      this._recurse = recurse;
      AbstractObserver.call(this);
    }

    inherits(InnerObserver, AbstractObserver);

    InnerObserver.prototype.next = function (x) {
      this._state.o.onNext(x);
    };
    InnerObserver.prototype.error = function (e) {
      this._state.lastError = e;this._recurse(this._state);
    };
    InnerObserver.prototype.completed = function () {
      this._state.o.onCompleted();
    };

    return CatchErrorObservable;
  }(ObservableBase);

  Enumerable.prototype.catchError = function () {
    return new CatchErrorObservable(this);
  };

  var RepeatEnumerable = function (__super__) {
    inherits(RepeatEnumerable, __super__);
    function RepeatEnumerable(v, c) {
      this.v = v;
      this.c = c == null ? -1 : c;
    }

    RepeatEnumerable.prototype[$iterator$] = function () {
      return new RepeatEnumerator(this);
    };

    function RepeatEnumerator(p) {
      this.v = p.v;
      this.l = p.c;
    }

    RepeatEnumerator.prototype.next = function () {
      if (this.l === 0) {
        return doneEnumerator;
      }
      if (this.l > 0) {
        this.l--;
      }
      return { done: false, value: this.v };
    };

    return RepeatEnumerable;
  }(Enumerable);

  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
    return new RepeatEnumerable(value, repeatCount);
  };

  var OfEnumerable = function (__super__) {
    inherits(OfEnumerable, __super__);
    function OfEnumerable(s, fn, thisArg) {
      this.s = s;
      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
    }
    OfEnumerable.prototype[$iterator$] = function () {
      return new OfEnumerator(this);
    };

    function OfEnumerator(p) {
      this.i = -1;
      this.s = p.s;
      this.l = this.s.length;
      this.fn = p.fn;
    }

    OfEnumerator.prototype.next = function () {
      return ++this.i < this.l ? { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } : doneEnumerator;
    };

    return OfEnumerable;
  }(Enumerable);

  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
    return new OfEnumerable(source, selector, thisArg);
  };

  var ObserveOnObservable = function (__super__) {
    inherits(ObserveOnObservable, __super__);
    function ObserveOnObservable(source, s) {
      this.source = source;
      this._s = s;
      __super__.call(this);
    }

    ObserveOnObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new ObserveOnObserver(this._s, o));
    };

    return ObserveOnObservable;
  }(ObservableBase);

  observableProto.observeOn = function (scheduler) {
    return new ObserveOnObservable(this, scheduler);
  };

  var SubscribeOnObservable = function (__super__) {
    inherits(SubscribeOnObservable, __super__);
    function SubscribeOnObservable(source, s) {
      this.source = source;
      this._s = s;
      __super__.call(this);
    }

    function scheduleMethod(scheduler, state) {
      var source = state[0],
          d = state[1],
          o = state[2];
      d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(o)));
    }

    SubscribeOnObservable.prototype.subscribeCore = function (o) {
      var m = new SingleAssignmentDisposable(),
          d = new SerialDisposable();
      d.setDisposable(m);
      m.setDisposable(this._s.schedule([this.source, d, o], scheduleMethod));
      return d;
    };

    return SubscribeOnObservable;
  }(ObservableBase);

  observableProto.subscribeOn = function (scheduler) {
    return new SubscribeOnObservable(this, scheduler);
  };

  var FromPromiseObservable = function (__super__) {
    inherits(FromPromiseObservable, __super__);
    function FromPromiseObservable(p, s) {
      this._p = p;
      this._s = s;
      __super__.call(this);
    }

    function scheduleNext(s, state) {
      var o = state[0],
          data = state[1];
      o.onNext(data);
      o.onCompleted();
    }

    function scheduleError(s, state) {
      var o = state[0],
          err = state[1];
      o.onError(err);
    }

    FromPromiseObservable.prototype.subscribeCore = function (o) {
      var sad = new SingleAssignmentDisposable(),
          self = this,
          p = this._p;

      if (isFunction(p)) {
        p = tryCatch(p)();
        if (p === errorObj) {
          o.onError(p.e);
          return sad;
        }
      }

      p.then(function (data) {
        sad.setDisposable(self._s.schedule([o, data], scheduleNext));
      }, function (err) {
        sad.setDisposable(self._s.schedule([o, err], scheduleError));
      });

      return sad;
    };

    return FromPromiseObservable;
  }(ObservableBase);

  var observableFromPromise = Observable.fromPromise = function (promise, scheduler) {
    scheduler || (scheduler = defaultScheduler);
    return new FromPromiseObservable(promise, scheduler);
  };

  observableProto.toPromise = function (promiseCtor) {
    promiseCtor || (promiseCtor = Rx.config.Promise);
    if (!promiseCtor) {
      throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise');
    }
    var source = this;
    return new promiseCtor(function (resolve, reject) {
      var value;
      source.subscribe(function (v) {
        value = v;
      }, reject, function () {
        resolve(value);
      });
    });
  };

  var ToArrayObservable = function (__super__) {
    inherits(ToArrayObservable, __super__);
    function ToArrayObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    ToArrayObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o));
    };

    inherits(InnerObserver, AbstractObserver);
    function InnerObserver(o) {
      this.o = o;
      this.a = [];
      AbstractObserver.call(this);
    }

    InnerObserver.prototype.next = function (x) {
      this.a.push(x);
    };
    InnerObserver.prototype.error = function (e) {
      this.o.onError(e);
    };
    InnerObserver.prototype.completed = function () {
      this.o.onNext(this.a);this.o.onCompleted();
    };

    return ToArrayObservable;
  }(ObservableBase);

  observableProto.toArray = function () {
    return new ToArrayObservable(this);
  };

  Observable.create = function (subscribe, parent) {
    return new AnonymousObservable(subscribe, parent);
  };

  var Defer = function (__super__) {
    inherits(Defer, __super__);
    function Defer(factory) {
      this._f = factory;
      __super__.call(this);
    }

    Defer.prototype.subscribeCore = function (o) {
      var result = tryCatch(this._f)();
      if (result === errorObj) {
        return observableThrow(result.e).subscribe(o);
      }
      isPromise(result) && (result = observableFromPromise(result));
      return result.subscribe(o);
    };

    return Defer;
  }(ObservableBase);

  var observableDefer = Observable.defer = function (observableFactory) {
    return new Defer(observableFactory);
  };

  var EmptyObservable = function (__super__) {
    inherits(EmptyObservable, __super__);
    function EmptyObservable(scheduler) {
      this.scheduler = scheduler;
      __super__.call(this);
    }

    EmptyObservable.prototype.subscribeCore = function (observer) {
      var sink = new EmptySink(observer, this.scheduler);
      return sink.run();
    };

    function EmptySink(observer, scheduler) {
      this.observer = observer;
      this.scheduler = scheduler;
    }

    function scheduleItem(s, state) {
      state.onCompleted();
      return disposableEmpty;
    }

    EmptySink.prototype.run = function () {
      var state = this.observer;
      return this.scheduler === immediateScheduler ? scheduleItem(null, state) : this.scheduler.schedule(state, scheduleItem);
    };

    return EmptyObservable;
  }(ObservableBase);

  var EMPTY_OBSERVABLE = new EmptyObservable(immediateScheduler);

  var observableEmpty = Observable.empty = function (scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return scheduler === immediateScheduler ? EMPTY_OBSERVABLE : new EmptyObservable(scheduler);
  };

  var FromObservable = function (__super__) {
    inherits(FromObservable, __super__);
    function FromObservable(iterable, fn, scheduler) {
      this._iterable = iterable;
      this._fn = fn;
      this._scheduler = scheduler;
      __super__.call(this);
    }

    function createScheduleMethod(o, it, fn) {
      return function loopRecursive(i, recurse) {
        var next = tryCatch(it.next).call(it);
        if (next === errorObj) {
          return o.onError(next.e);
        }
        if (next.done) {
          return o.onCompleted();
        }

        var result = next.value;

        if (isFunction(fn)) {
          result = tryCatch(fn)(result, i);
          if (result === errorObj) {
            return o.onError(result.e);
          }
        }

        o.onNext(result);
        recurse(i + 1);
      };
    }

    FromObservable.prototype.subscribeCore = function (o) {
      var list = Object(this._iterable),
          it = getIterable(list);

      return this._scheduler.scheduleRecursive(0, createScheduleMethod(o, it, this._fn));
    };

    return FromObservable;
  }(ObservableBase);

  var maxSafeInteger = Math.pow(2, 53) - 1;

  function StringIterable(s) {
    this._s = s;
  }

  StringIterable.prototype[$iterator$] = function () {
    return new StringIterator(this._s);
  };

  function StringIterator(s) {
    this._s = s;
    this._l = s.length;
    this._i = 0;
  }

  StringIterator.prototype[$iterator$] = function () {
    return this;
  };

  StringIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
  };

  function ArrayIterable(a) {
    this._a = a;
  }

  ArrayIterable.prototype[$iterator$] = function () {
    return new ArrayIterator(this._a);
  };

  function ArrayIterator(a) {
    this._a = a;
    this._l = toLength(a);
    this._i = 0;
  }

  ArrayIterator.prototype[$iterator$] = function () {
    return this;
  };

  ArrayIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
  };

  function numberIsFinite(value) {
    return typeof value === 'number' && root.isFinite(value);
  }

  function isNan(n) {
    return n !== n;
  }

  function getIterable(o) {
    var i = o[$iterator$],
        it;
    if (!i && typeof o === 'string') {
      it = new StringIterable(o);
      return it[$iterator$]();
    }
    if (!i && o.length !== undefined) {
      it = new ArrayIterable(o);
      return it[$iterator$]();
    }
    if (!i) {
      throw new TypeError('Object is not iterable');
    }
    return o[$iterator$]();
  }

  function sign(value) {
    var number = +value;
    if (number === 0) {
      return number;
    }
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? -1 : 1;
  }

  function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
      return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
      return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
      return 0;
    }
    if (len > maxSafeInteger) {
      return maxSafeInteger;
    }
    return len;
  }

  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
    if (iterable == null) {
      throw new Error('iterable cannot be null.');
    }
    if (mapFn && !isFunction(mapFn)) {
      throw new Error('mapFn when provided must be a function');
    }
    if (mapFn) {
      var mapper = bindCallback(mapFn, thisArg, 2);
    }
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromObservable(iterable, mapper, scheduler);
  };

  var FromArrayObservable = function (__super__) {
    inherits(FromArrayObservable, __super__);
    function FromArrayObservable(args, scheduler) {
      this._args = args;
      this._scheduler = scheduler;
      __super__.call(this);
    }

    function scheduleMethod(o, args) {
      var len = args.length;
      return function loopRecursive(i, recurse) {
        if (i < len) {
          o.onNext(args[i]);
          recurse(i + 1);
        } else {
          o.onCompleted();
        }
      };
    }

    FromArrayObservable.prototype.subscribeCore = function (o) {
      return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._args));
    };

    return FromArrayObservable;
  }(ObservableBase);

  var observableFromArray = Observable.fromArray = function (array, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler);
  };

  var GenerateObservable = function (__super__) {
    inherits(GenerateObservable, __super__);
    function GenerateObservable(state, cndFn, itrFn, resFn, s) {
      this._initialState = state;
      this._cndFn = cndFn;
      this._itrFn = itrFn;
      this._resFn = resFn;
      this._s = s;
      __super__.call(this);
    }

    function scheduleRecursive(state, recurse) {
      if (state.first) {
        state.first = false;
      } else {
        state.newState = tryCatch(state.self._itrFn)(state.newState);
        if (state.newState === errorObj) {
          return state.o.onError(state.newState.e);
        }
      }
      var hasResult = tryCatch(state.self._cndFn)(state.newState);
      if (hasResult === errorObj) {
        return state.o.onError(hasResult.e);
      }
      if (hasResult) {
        var result = tryCatch(state.self._resFn)(state.newState);
        if (result === errorObj) {
          return state.o.onError(result.e);
        }
        state.o.onNext(result);
        recurse(state);
      } else {
        state.o.onCompleted();
      }
    }

    GenerateObservable.prototype.subscribeCore = function (o) {
      var state = {
        o: o,
        self: this,
        first: true,
        newState: this._initialState
      };
      return this._s.scheduleRecursive(state, scheduleRecursive);
    };

    return GenerateObservable;
  }(ObservableBase);

  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new GenerateObservable(initialState, condition, iterate, resultSelector, scheduler);
  };

  function observableOf(scheduler, array) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler);
  }

  Observable.of = function () {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    return new FromArrayObservable(args, currentThreadScheduler);
  };

  Observable.ofWithScheduler = function (scheduler) {
    var len = arguments.length,
        args = new Array(len - 1);
    for (var i = 1; i < len; i++) {
      args[i - 1] = arguments[i];
    }
    return new FromArrayObservable(args, scheduler);
  };

  Observable.ofArrayChanges = function (array) {
    if (!Array.isArray(array)) {
      throw new TypeError('Array.observe only accepts arrays.');
    }
    if (typeof Array.observe !== 'function' && typeof Array.unobserve !== 'function') {
      throw new TypeError('Array.observe is not supported on your platform');
    }
    return new AnonymousObservable(function (observer) {
      function observerFn(changes) {
        for (var i = 0, len = changes.length; i < len; i++) {
          observer.onNext(changes[i]);
        }
      }

      Array.observe(array, observerFn);

      return function () {
        Array.unobserve(array, observerFn);
      };
    });
  };

  Observable.ofObjectChanges = function (obj) {
    if (obj == null) {
      throw new TypeError('object must not be null or undefined.');
    }
    if (typeof Object.observe !== 'function' && typeof Object.unobserve !== 'function') {
      throw new TypeError('Object.observe is not supported on your platform');
    }
    return new AnonymousObservable(function (observer) {
      function observerFn(changes) {
        for (var i = 0, len = changes.length; i < len; i++) {
          observer.onNext(changes[i]);
        }
      }

      Object.observe(obj, observerFn);

      return function () {
        Object.unobserve(obj, observerFn);
      };
    });
  };

  var NeverObservable = function (__super__) {
    inherits(NeverObservable, __super__);
    function NeverObservable() {
      __super__.call(this);
    }

    NeverObservable.prototype.subscribeCore = function (observer) {
      return disposableEmpty;
    };

    return NeverObservable;
  }(ObservableBase);

  var NEVER_OBSERVABLE = new NeverObservable();

  var observableNever = Observable.never = function () {
    return NEVER_OBSERVABLE;
  };

  var PairsObservable = function (__super__) {
    inherits(PairsObservable, __super__);
    function PairsObservable(o, scheduler) {
      this._o = o;
      this._keys = Object.keys(o);
      this._scheduler = scheduler;
      __super__.call(this);
    }

    function scheduleMethod(o, obj, keys) {
      return function loopRecursive(i, recurse) {
        if (i < keys.length) {
          var key = keys[i];
          o.onNext([key, obj[key]]);
          recurse(i + 1);
        } else {
          o.onCompleted();
        }
      };
    }

    PairsObservable.prototype.subscribeCore = function (o) {
      return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._o, this._keys));
    };

    return PairsObservable;
  }(ObservableBase);

  Observable.pairs = function (obj, scheduler) {
    scheduler || (scheduler = currentThreadScheduler);
    return new PairsObservable(obj, scheduler);
  };

  var RangeObservable = function (__super__) {
    inherits(RangeObservable, __super__);
    function RangeObservable(start, count, scheduler) {
      this.start = start;
      this.rangeCount = count;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    function loopRecursive(start, count, o) {
      return function loop(i, recurse) {
        if (i < count) {
          o.onNext(start + i);
          recurse(i + 1);
        } else {
          o.onCompleted();
        }
      };
    }

    RangeObservable.prototype.subscribeCore = function (o) {
      return this.scheduler.scheduleRecursive(0, loopRecursive(this.start, this.rangeCount, o));
    };

    return RangeObservable;
  }(ObservableBase);

  Observable.range = function (start, count, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RangeObservable(start, count, scheduler);
  };

  var RepeatObservable = function (__super__) {
    inherits(RepeatObservable, __super__);
    function RepeatObservable(value, repeatCount, scheduler) {
      this.value = value;
      this.repeatCount = repeatCount == null ? -1 : repeatCount;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RepeatObservable.prototype.subscribeCore = function (observer) {
      var sink = new RepeatSink(observer, this);
      return sink.run();
    };

    return RepeatObservable;
  }(ObservableBase);

  function RepeatSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  RepeatSink.prototype.run = function () {
    var observer = this.observer,
        value = this.parent.value;
    function loopRecursive(i, recurse) {
      if (i === -1 || i > 0) {
        observer.onNext(value);
        i > 0 && i--;
      }
      if (i === 0) {
        return observer.onCompleted();
      }
      recurse(i);
    }

    return this.parent.scheduler.scheduleRecursive(this.parent.repeatCount, loopRecursive);
  };

  Observable.repeat = function (value, repeatCount, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RepeatObservable(value, repeatCount, scheduler);
  };

  var JustObservable = function (__super__) {
    inherits(JustObservable, __super__);
    function JustObservable(value, scheduler) {
      this._value = value;
      this._scheduler = scheduler;
      __super__.call(this);
    }

    JustObservable.prototype.subscribeCore = function (o) {
      var state = [this._value, o];
      return this._scheduler === immediateScheduler ? scheduleItem(null, state) : this._scheduler.schedule(state, scheduleItem);
    };

    function scheduleItem(s, state) {
      var value = state[0],
          observer = state[1];
      observer.onNext(value);
      observer.onCompleted();
      return disposableEmpty;
    }

    return JustObservable;
  }(ObservableBase);

  var observableReturn = Observable['return'] = Observable.just = function (value, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new JustObservable(value, scheduler);
  };

  var ThrowObservable = function (__super__) {
    inherits(ThrowObservable, __super__);
    function ThrowObservable(error, scheduler) {
      this._error = error;
      this._scheduler = scheduler;
      __super__.call(this);
    }

    ThrowObservable.prototype.subscribeCore = function (o) {
      var state = [this._error, o];
      return this._scheduler === immediateScheduler ? scheduleItem(null, state) : this._scheduler.schedule(state, scheduleItem);
    };

    function scheduleItem(s, state) {
      var e = state[0],
          o = state[1];
      o.onError(e);
      return disposableEmpty;
    }

    return ThrowObservable;
  }(ObservableBase);

  var observableThrow = Observable['throw'] = function (error, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new ThrowObservable(error, scheduler);
  };

  var UsingObservable = function (__super__) {
    inherits(UsingObservable, __super__);
    function UsingObservable(resFn, obsFn) {
      this._resFn = resFn;
      this._obsFn = obsFn;
      __super__.call(this);
    }

    UsingObservable.prototype.subscribeCore = function (o) {
      var disposable = disposableEmpty;
      var resource = tryCatch(this._resFn)();
      if (resource === errorObj) {
        return new BinaryDisposable(observableThrow(resource.e).subscribe(o), disposable);
      }
      resource && (disposable = resource);
      var source = tryCatch(this._obsFn)(resource);
      if (source === errorObj) {
        return new BinaryDisposable(observableThrow(source.e).subscribe(o), disposable);
      }
      return new BinaryDisposable(source.subscribe(o), disposable);
    };

    return UsingObservable;
  }(ObservableBase);

  Observable.using = function (resourceFactory, observableFactory) {
    return new UsingObservable(resourceFactory, observableFactory);
  };

  observableProto.amb = function (rightSource) {
    var leftSource = this;
    return new AnonymousObservable(function (observer) {
      var choice,
          leftChoice = 'L',
          rightChoice = 'R',
          leftSubscription = new SingleAssignmentDisposable(),
          rightSubscription = new SingleAssignmentDisposable();

      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));

      function choiceL() {
        if (!choice) {
          choice = leftChoice;
          rightSubscription.dispose();
        }
      }

      function choiceR() {
        if (!choice) {
          choice = rightChoice;
          leftSubscription.dispose();
        }
      }

      var leftSubscribe = observerCreate(function (left) {
        choiceL();
        choice === leftChoice && observer.onNext(left);
      }, function (e) {
        choiceL();
        choice === leftChoice && observer.onError(e);
      }, function () {
        choiceL();
        choice === leftChoice && observer.onCompleted();
      });
      var rightSubscribe = observerCreate(function (right) {
        choiceR();
        choice === rightChoice && observer.onNext(right);
      }, function (e) {
        choiceR();
        choice === rightChoice && observer.onError(e);
      }, function () {
        choiceR();
        choice === rightChoice && observer.onCompleted();
      });

      leftSubscription.setDisposable(leftSource.subscribe(leftSubscribe));
      rightSubscription.setDisposable(rightSource.subscribe(rightSubscribe));

      return new BinaryDisposable(leftSubscription, rightSubscription);
    });
  };

  function amb(p, c) {
    return p.amb(c);
  }

  Observable.amb = function () {
    var acc = observableNever(),
        items;
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      var len = arguments.length;
      items = new Array(items);
      for (var i = 0; i < len; i++) {
        items[i] = arguments[i];
      }
    }
    for (var i = 0, len = items.length; i < len; i++) {
      acc = amb(acc, items[i]);
    }
    return acc;
  };

  var CatchObservable = function (__super__) {
    inherits(CatchObservable, __super__);
    function CatchObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    CatchObservable.prototype.subscribeCore = function (o) {
      var d1 = new SingleAssignmentDisposable(),
          subscription = new SerialDisposable();
      subscription.setDisposable(d1);
      d1.setDisposable(this.source.subscribe(new CatchObserver(o, subscription, this._fn)));
      return subscription;
    };

    return CatchObservable;
  }(ObservableBase);

  var CatchObserver = function (__super__) {
    inherits(CatchObserver, __super__);
    function CatchObserver(o, s, fn) {
      this._o = o;
      this._s = s;
      this._fn = fn;
      __super__.call(this);
    }

    CatchObserver.prototype.next = function (x) {
      this._o.onNext(x);
    };
    CatchObserver.prototype.completed = function () {
      return this._o.onCompleted();
    };
    CatchObserver.prototype.error = function (e) {
      var result = tryCatch(this._fn)(e);
      if (result === errorObj) {
        return this._o.onError(result.e);
      }
      isPromise(result) && (result = observableFromPromise(result));

      var d = new SingleAssignmentDisposable();
      this._s.setDisposable(d);
      d.setDisposable(result.subscribe(this._o));
    };

    return CatchObserver;
  }(AbstractObserver);

  observableProto['catch'] = function (handlerOrSecond) {
    return isFunction(handlerOrSecond) ? new CatchObservable(this, handlerOrSecond) : observableCatch([this, handlerOrSecond]);
  };

  var observableCatch = Observable['catch'] = function () {
    var items;
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      var len = arguments.length;
      items = new Array(len);
      for (var i = 0; i < len; i++) {
        items[i] = arguments[i];
      }
    }
    return enumerableOf(items).catchError();
  };

  observableProto.combineLatest = function () {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    if (Array.isArray(args[0])) {
      args[0].unshift(this);
    } else {
      args.unshift(this);
    }
    return combineLatest.apply(this, args);
  };

  function falseFactory() {
    return false;
  }
  function argumentsToArray() {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    return args;
  }

  var CombineLatestObservable = function (__super__) {
    inherits(CombineLatestObservable, __super__);
    function CombineLatestObservable(params, cb) {
      this._params = params;
      this._cb = cb;
      __super__.call(this);
    }

    CombineLatestObservable.prototype.subscribeCore = function (observer) {
      var len = this._params.length,
          subscriptions = new Array(len);

      var state = {
        hasValue: arrayInitialize(len, falseFactory),
        hasValueAll: false,
        isDone: arrayInitialize(len, falseFactory),
        values: new Array(len)
      };

      for (var i = 0; i < len; i++) {
        var source = this._params[i],
            sad = new SingleAssignmentDisposable();
        subscriptions[i] = sad;
        isPromise(source) && (source = observableFromPromise(source));
        sad.setDisposable(source.subscribe(new CombineLatestObserver(observer, i, this._cb, state)));
      }

      return new NAryDisposable(subscriptions);
    };

    return CombineLatestObservable;
  }(ObservableBase);

  var CombineLatestObserver = function (__super__) {
    inherits(CombineLatestObserver, __super__);
    function CombineLatestObserver(o, i, cb, state) {
      this._o = o;
      this._i = i;
      this._cb = cb;
      this._state = state;
      __super__.call(this);
    }

    function notTheSame(i) {
      return function (x, j) {
        return j !== i;
      };
    }

    CombineLatestObserver.prototype.next = function (x) {
      this._state.values[this._i] = x;
      this._state.hasValue[this._i] = true;
      if (this._state.hasValueAll || (this._state.hasValueAll = this._state.hasValue.every(identity))) {
        var res = tryCatch(this._cb).apply(null, this._state.values);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }
        this._o.onNext(res);
      } else if (this._state.isDone.filter(notTheSame(this._i)).every(identity)) {
        this._o.onCompleted();
      }
    };

    CombineLatestObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    CombineLatestObserver.prototype.completed = function () {
      this._state.isDone[this._i] = true;
      this._state.isDone.every(identity) && this._o.onCompleted();
    };

    return CombineLatestObserver;
  }(AbstractObserver);

  var combineLatest = Observable.combineLatest = function () {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
    Array.isArray(args[0]) && (args = args[0]);
    return new CombineLatestObservable(args, resultSelector);
  };

  observableProto.concat = function () {
    for (var args = [], i = 0, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }
    args.unshift(this);
    return observableConcat.apply(null, args);
  };

  var ConcatObserver = function (__super__) {
    inherits(ConcatObserver, __super__);
    function ConcatObserver(s, fn) {
      this._s = s;
      this._fn = fn;
      __super__.call(this);
    }

    ConcatObserver.prototype.next = function (x) {
      this._s.o.onNext(x);
    };
    ConcatObserver.prototype.error = function (e) {
      this._s.o.onError(e);
    };
    ConcatObserver.prototype.completed = function () {
      this._s.i++;this._fn(this._s);
    };

    return ConcatObserver;
  }(AbstractObserver);

  var ConcatObservable = function (__super__) {
    inherits(ConcatObservable, __super__);
    function ConcatObservable(sources) {
      this._sources = sources;
      __super__.call(this);
    }

    function scheduleRecursive(state, recurse) {
      if (state.disposable.isDisposed) {
        return;
      }
      if (state.i === state.sources.length) {
        return state.o.onCompleted();
      }

      var currentValue = state.sources[state.i];
      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

      var d = new SingleAssignmentDisposable();
      state.subscription.setDisposable(d);
      d.setDisposable(currentValue.subscribe(new ConcatObserver(state, recurse)));
    }

    ConcatObservable.prototype.subscribeCore = function (o) {
      var subscription = new SerialDisposable();
      var disposable = disposableCreate(noop);
      var state = {
        o: o,
        i: 0,
        subscription: subscription,
        disposable: disposable,
        sources: this._sources
      };

      var cancelable = immediateScheduler.scheduleRecursive(state, scheduleRecursive);
      return new NAryDisposable([subscription, disposable, cancelable]);
    };

    return ConcatObservable;
  }(ObservableBase);

  var observableConcat = Observable.concat = function () {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      args = new Array(arguments.length);
      for (var i = 0, len = arguments.length; i < len; i++) {
        args[i] = arguments[i];
      }
    }
    return new ConcatObservable(args);
  };

  observableProto.concatAll = function () {
    return this.merge(1);
  };

  var MergeObservable = function (__super__) {
    inherits(MergeObservable, __super__);

    function MergeObservable(source, maxConcurrent) {
      this.source = source;
      this.maxConcurrent = maxConcurrent;
      __super__.call(this);
    }

    MergeObservable.prototype.subscribeCore = function (observer) {
      var g = new CompositeDisposable();
      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
      return g;
    };

    return MergeObservable;
  }(ObservableBase);

  var MergeObserver = function (__super__) {
    function MergeObserver(o, max, g) {
      this.o = o;
      this.max = max;
      this.g = g;
      this.done = false;
      this.q = [];
      this.activeCount = 0;
      __super__.call(this);
    }

    inherits(MergeObserver, __super__);

    MergeObserver.prototype.handleSubscribe = function (xs) {
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);
      isPromise(xs) && (xs = observableFromPromise(xs));
      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
    };

    MergeObserver.prototype.next = function (innerSource) {
      if (this.activeCount < this.max) {
        this.activeCount++;
        this.handleSubscribe(innerSource);
      } else {
        this.q.push(innerSource);
      }
    };
    MergeObserver.prototype.error = function (e) {
      this.o.onError(e);
    };
    MergeObserver.prototype.completed = function () {
      this.done = true;this.activeCount === 0 && this.o.onCompleted();
    };

    function InnerObserver(parent, sad) {
      this.parent = parent;
      this.sad = sad;
      __super__.call(this);
    }

    inherits(InnerObserver, __super__);

    InnerObserver.prototype.next = function (x) {
      this.parent.o.onNext(x);
    };
    InnerObserver.prototype.error = function (e) {
      this.parent.o.onError(e);
    };
    InnerObserver.prototype.completed = function () {
      this.parent.g.remove(this.sad);
      if (this.parent.q.length > 0) {
        this.parent.handleSubscribe(this.parent.q.shift());
      } else {
        this.parent.activeCount--;
        this.parent.done && this.parent.activeCount === 0 && this.parent.o.onCompleted();
      }
    };

    return MergeObserver;
  }(AbstractObserver);

  observableProto.merge = function (maxConcurrentOrOther) {
    return typeof maxConcurrentOrOther !== 'number' ? observableMerge(this, maxConcurrentOrOther) : new MergeObservable(this, maxConcurrentOrOther);
  };

  var observableMerge = Observable.merge = function () {
    var scheduler,
        sources = [],
        i,
        len = arguments.length;
    if (!arguments[0]) {
      scheduler = immediateScheduler;
      for (i = 1; i < len; i++) {
        sources.push(arguments[i]);
      }
    } else if (isScheduler(arguments[0])) {
      scheduler = arguments[0];
      for (i = 1; i < len; i++) {
        sources.push(arguments[i]);
      }
    } else {
      scheduler = immediateScheduler;
      for (i = 0; i < len; i++) {
        sources.push(arguments[i]);
      }
    }
    if (Array.isArray(sources[0])) {
      sources = sources[0];
    }
    return observableOf(scheduler, sources).mergeAll();
  };

  var MergeAllObservable = function (__super__) {
    inherits(MergeAllObservable, __super__);

    function MergeAllObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    MergeAllObservable.prototype.subscribeCore = function (o) {
      var g = new CompositeDisposable(),
          m = new SingleAssignmentDisposable();
      g.add(m);
      m.setDisposable(this.source.subscribe(new MergeAllObserver(o, g)));
      return g;
    };

    return MergeAllObservable;
  }(ObservableBase);

  var MergeAllObserver = function (__super__) {
    function MergeAllObserver(o, g) {
      this.o = o;
      this.g = g;
      this.done = false;
      __super__.call(this);
    }

    inherits(MergeAllObserver, __super__);

    MergeAllObserver.prototype.next = function (innerSource) {
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);
      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, sad)));
    };

    MergeAllObserver.prototype.error = function (e) {
      this.o.onError(e);
    };

    MergeAllObserver.prototype.completed = function () {
      this.done = true;
      this.g.length === 1 && this.o.onCompleted();
    };

    function InnerObserver(parent, sad) {
      this.parent = parent;
      this.sad = sad;
      __super__.call(this);
    }

    inherits(InnerObserver, __super__);

    InnerObserver.prototype.next = function (x) {
      this.parent.o.onNext(x);
    };
    InnerObserver.prototype.error = function (e) {
      this.parent.o.onError(e);
    };
    InnerObserver.prototype.completed = function () {
      this.parent.g.remove(this.sad);
      this.parent.done && this.parent.g.length === 1 && this.parent.o.onCompleted();
    };

    return MergeAllObserver;
  }(AbstractObserver);

  observableProto.mergeAll = function () {
    return new MergeAllObservable(this);
  };

  var CompositeError = Rx.CompositeError = function (errors) {
    this.innerErrors = errors;
    this.message = 'This contains multiple errors. Check the innerErrors';
    Error.call(this);
  };
  CompositeError.prototype = Object.create(Error.prototype);
  CompositeError.prototype.name = 'CompositeError';

  var MergeDelayErrorObservable = function (__super__) {
    inherits(MergeDelayErrorObservable, __super__);
    function MergeDelayErrorObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    MergeDelayErrorObservable.prototype.subscribeCore = function (o) {
      var group = new CompositeDisposable(),
          m = new SingleAssignmentDisposable(),
          state = { isStopped: false, errors: [], o: o };

      group.add(m);
      m.setDisposable(this.source.subscribe(new MergeDelayErrorObserver(group, state)));

      return group;
    };

    return MergeDelayErrorObservable;
  }(ObservableBase);

  var MergeDelayErrorObserver = function (__super__) {
    inherits(MergeDelayErrorObserver, __super__);
    function MergeDelayErrorObserver(group, state) {
      this._group = group;
      this._state = state;
      __super__.call(this);
    }

    function setCompletion(o, errors) {
      if (errors.length === 0) {
        o.onCompleted();
      } else if (errors.length === 1) {
        o.onError(errors[0]);
      } else {
        o.onError(new CompositeError(errors));
      }
    }

    MergeDelayErrorObserver.prototype.next = function (x) {
      var inner = new SingleAssignmentDisposable();
      this._group.add(inner);

      isPromise(x) && (x = observableFromPromise(x));
      inner.setDisposable(x.subscribe(new InnerObserver(inner, this._group, this._state)));
    };

    MergeDelayErrorObserver.prototype.error = function (e) {
      this._state.errors.push(e);
      this._state.isStopped = true;
      this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
    };

    MergeDelayErrorObserver.prototype.completed = function () {
      this._state.isStopped = true;
      this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
    };

    inherits(InnerObserver, __super__);
    function InnerObserver(inner, group, state) {
      this._inner = inner;
      this._group = group;
      this._state = state;
      __super__.call(this);
    }

    InnerObserver.prototype.next = function (x) {
      this._state.o.onNext(x);
    };
    InnerObserver.prototype.error = function (e) {
      this._state.errors.push(e);
      this._group.remove(this._inner);
      this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
    };
    InnerObserver.prototype.completed = function () {
      this._group.remove(this._inner);
      this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
    };

    return MergeDelayErrorObserver;
  }(AbstractObserver);

  Observable.mergeDelayError = function () {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      var len = arguments.length;
      args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
    }
    var source = observableOf(null, args);
    return new MergeDelayErrorObservable(source);
  };

  observableProto.onErrorResumeNext = function (second) {
    if (!second) {
      throw new Error('Second observable is required');
    }
    return onErrorResumeNext([this, second]);
  };

  var OnErrorResumeNextObservable = function (__super__) {
    inherits(OnErrorResumeNextObservable, __super__);
    function OnErrorResumeNextObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }

    function scheduleMethod(state, recurse) {
      if (state.pos < state.sources.length) {
        var current = state.sources[state.pos++];
        isPromise(current) && (current = observableFromPromise(current));
        var d = new SingleAssignmentDisposable();
        state.subscription.setDisposable(d);
        d.setDisposable(current.subscribe(new OnErrorResumeNextObserver(state, recurse)));
      } else {
        state.o.onCompleted();
      }
    }

    OnErrorResumeNextObservable.prototype.subscribeCore = function (o) {
      var subscription = new SerialDisposable(),
          state = { pos: 0, subscription: subscription, o: o, sources: this.sources },
          cancellable = immediateScheduler.scheduleRecursive(state, scheduleMethod);

      return new BinaryDisposable(subscription, cancellable);
    };

    return OnErrorResumeNextObservable;
  }(ObservableBase);

  var OnErrorResumeNextObserver = function (__super__) {
    inherits(OnErrorResumeNextObserver, __super__);
    function OnErrorResumeNextObserver(state, recurse) {
      this._state = state;
      this._recurse = recurse;
      __super__.call(this);
    }

    OnErrorResumeNextObserver.prototype.next = function (x) {
      this._state.o.onNext(x);
    };
    OnErrorResumeNextObserver.prototype.error = function () {
      this._recurse(this._state);
    };
    OnErrorResumeNextObserver.prototype.completed = function () {
      this._recurse(this._state);
    };

    return OnErrorResumeNextObserver;
  }(AbstractObserver);

  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
    var sources = [];
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      var len = arguments.length;
      sources = new Array(len);
      for (var i = 0; i < len; i++) {
        sources[i] = arguments[i];
      }
    }
    return new OnErrorResumeNextObservable(sources);
  };

  var SkipUntilObservable = function (__super__) {
    inherits(SkipUntilObservable, __super__);

    function SkipUntilObservable(source, other) {
      this._s = source;
      this._o = isPromise(other) ? observableFromPromise(other) : other;
      this._open = false;
      __super__.call(this);
    }

    SkipUntilObservable.prototype.subscribeCore = function (o) {
      var leftSubscription = new SingleAssignmentDisposable();
      leftSubscription.setDisposable(this._s.subscribe(new SkipUntilSourceObserver(o, this)));

      isPromise(this._o) && (this._o = observableFromPromise(this._o));

      var rightSubscription = new SingleAssignmentDisposable();
      rightSubscription.setDisposable(this._o.subscribe(new SkipUntilOtherObserver(o, this, rightSubscription)));

      return new BinaryDisposable(leftSubscription, rightSubscription);
    };

    return SkipUntilObservable;
  }(ObservableBase);

  var SkipUntilSourceObserver = function (__super__) {
    inherits(SkipUntilSourceObserver, __super__);
    function SkipUntilSourceObserver(o, p) {
      this._o = o;
      this._p = p;
      __super__.call(this);
    }

    SkipUntilSourceObserver.prototype.next = function (x) {
      this._p._open && this._o.onNext(x);
    };

    SkipUntilSourceObserver.prototype.error = function (err) {
      this._o.onError(err);
    };

    SkipUntilSourceObserver.prototype.onCompleted = function () {
      this._p._open && this._o.onCompleted();
    };

    return SkipUntilSourceObserver;
  }(AbstractObserver);

  var SkipUntilOtherObserver = function (__super__) {
    inherits(SkipUntilOtherObserver, __super__);
    function SkipUntilOtherObserver(o, p, r) {
      this._o = o;
      this._p = p;
      this._r = r;
      __super__.call(this);
    }

    SkipUntilOtherObserver.prototype.next = function () {
      this._p._open = true;
      this._r.dispose();
    };

    SkipUntilOtherObserver.prototype.error = function (err) {
      this._o.onError(err);
    };

    SkipUntilOtherObserver.prototype.onCompleted = function () {
      this._r.dispose();
    };

    return SkipUntilOtherObserver;
  }(AbstractObserver);

  observableProto.skipUntil = function (other) {
    return new SkipUntilObservable(this, other);
  };

  var SwitchObservable = function (__super__) {
    inherits(SwitchObservable, __super__);
    function SwitchObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    SwitchObservable.prototype.subscribeCore = function (o) {
      var inner = new SerialDisposable(),
          s = this.source.subscribe(new SwitchObserver(o, inner));
      return new BinaryDisposable(s, inner);
    };

    inherits(SwitchObserver, AbstractObserver);
    function SwitchObserver(o, inner) {
      this.o = o;
      this.inner = inner;
      this.stopped = false;
      this.latest = 0;
      this.hasLatest = false;
      AbstractObserver.call(this);
    }

    SwitchObserver.prototype.next = function (innerSource) {
      var d = new SingleAssignmentDisposable(),
          id = ++this.latest;
      this.hasLatest = true;
      this.inner.setDisposable(d);
      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
    };

    SwitchObserver.prototype.error = function (e) {
      this.o.onError(e);
    };

    SwitchObserver.prototype.completed = function () {
      this.stopped = true;
      !this.hasLatest && this.o.onCompleted();
    };

    inherits(InnerObserver, AbstractObserver);
    function InnerObserver(parent, id) {
      this.parent = parent;
      this.id = id;
      AbstractObserver.call(this);
    }
    InnerObserver.prototype.next = function (x) {
      this.parent.latest === this.id && this.parent.o.onNext(x);
    };

    InnerObserver.prototype.error = function (e) {
      this.parent.latest === this.id && this.parent.o.onError(e);
    };

    InnerObserver.prototype.completed = function () {
      if (this.parent.latest === this.id) {
        this.parent.hasLatest = false;
        this.parent.stopped && this.parent.o.onCompleted();
      }
    };

    return SwitchObservable;
  }(ObservableBase);

  observableProto['switch'] = observableProto.switchLatest = function () {
    return new SwitchObservable(this);
  };

  var TakeUntilObservable = function (__super__) {
    inherits(TakeUntilObservable, __super__);

    function TakeUntilObservable(source, other) {
      this.source = source;
      this.other = isPromise(other) ? observableFromPromise(other) : other;
      __super__.call(this);
    }

    TakeUntilObservable.prototype.subscribeCore = function (o) {
      return new BinaryDisposable(this.source.subscribe(o), this.other.subscribe(new TakeUntilObserver(o)));
    };

    return TakeUntilObservable;
  }(ObservableBase);

  var TakeUntilObserver = function (__super__) {
    inherits(TakeUntilObserver, __super__);
    function TakeUntilObserver(o) {
      this._o = o;
      __super__.call(this);
    }

    TakeUntilObserver.prototype.next = function () {
      this._o.onCompleted();
    };

    TakeUntilObserver.prototype.error = function (err) {
      this._o.onError(err);
    };

    TakeUntilObserver.prototype.onCompleted = noop;

    return TakeUntilObserver;
  }(AbstractObserver);

  observableProto.takeUntil = function (other) {
    return new TakeUntilObservable(this, other);
  };

  function falseFactory() {
    return false;
  }
  function argumentsToArray() {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    return args;
  }

  var WithLatestFromObservable = function (__super__) {
    inherits(WithLatestFromObservable, __super__);
    function WithLatestFromObservable(source, sources, resultSelector) {
      this._s = source;
      this._ss = sources;
      this._cb = resultSelector;
      __super__.call(this);
    }

    WithLatestFromObservable.prototype.subscribeCore = function (o) {
      var len = this._ss.length;
      var state = {
        hasValue: arrayInitialize(len, falseFactory),
        hasValueAll: false,
        values: new Array(len)
      };

      var n = this._ss.length,
          subscriptions = new Array(n + 1);
      for (var i = 0; i < n; i++) {
        var other = this._ss[i],
            sad = new SingleAssignmentDisposable();
        isPromise(other) && (other = observableFromPromise(other));
        sad.setDisposable(other.subscribe(new WithLatestFromOtherObserver(o, i, state)));
        subscriptions[i] = sad;
      }

      var outerSad = new SingleAssignmentDisposable();
      outerSad.setDisposable(this._s.subscribe(new WithLatestFromSourceObserver(o, this._cb, state)));
      subscriptions[n] = outerSad;

      return new NAryDisposable(subscriptions);
    };

    return WithLatestFromObservable;
  }(ObservableBase);

  var WithLatestFromOtherObserver = function (__super__) {
    inherits(WithLatestFromOtherObserver, __super__);
    function WithLatestFromOtherObserver(o, i, state) {
      this._o = o;
      this._i = i;
      this._state = state;
      __super__.call(this);
    }

    WithLatestFromOtherObserver.prototype.next = function (x) {
      this._state.values[this._i] = x;
      this._state.hasValue[this._i] = true;
      this._state.hasValueAll = this._state.hasValue.every(identity);
    };

    WithLatestFromOtherObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    WithLatestFromOtherObserver.prototype.completed = noop;

    return WithLatestFromOtherObserver;
  }(AbstractObserver);

  var WithLatestFromSourceObserver = function (__super__) {
    inherits(WithLatestFromSourceObserver, __super__);
    function WithLatestFromSourceObserver(o, cb, state) {
      this._o = o;
      this._cb = cb;
      this._state = state;
      __super__.call(this);
    }

    WithLatestFromSourceObserver.prototype.next = function (x) {
      var allValues = [x].concat(this._state.values);
      if (!this._state.hasValueAll) {
        return;
      }
      var res = tryCatch(this._cb).apply(null, allValues);
      if (res === errorObj) {
        return this._o.onError(res.e);
      }
      this._o.onNext(res);
    };

    WithLatestFromSourceObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    WithLatestFromSourceObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return WithLatestFromSourceObserver;
  }(AbstractObserver);

  observableProto.withLatestFrom = function () {
    if (arguments.length === 0) {
      throw new Error('invalid arguments');
    }

    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
    Array.isArray(args[0]) && (args = args[0]);

    return new WithLatestFromObservable(this, args, resultSelector);
  };

  function falseFactory() {
    return false;
  }
  function emptyArrayFactory() {
    return [];
  }

  var ZipObservable = function (__super__) {
    inherits(ZipObservable, __super__);
    function ZipObservable(sources, resultSelector) {
      this._s = sources;
      this._cb = resultSelector;
      __super__.call(this);
    }

    ZipObservable.prototype.subscribeCore = function (observer) {
      var n = this._s.length,
          subscriptions = new Array(n),
          done = arrayInitialize(n, falseFactory),
          q = arrayInitialize(n, emptyArrayFactory);

      for (var i = 0; i < n; i++) {
        var source = this._s[i],
            sad = new SingleAssignmentDisposable();
        subscriptions[i] = sad;
        isPromise(source) && (source = observableFromPromise(source));
        sad.setDisposable(source.subscribe(new ZipObserver(observer, i, this, q, done)));
      }

      return new NAryDisposable(subscriptions);
    };

    return ZipObservable;
  }(ObservableBase);

  var ZipObserver = function (__super__) {
    inherits(ZipObserver, __super__);
    function ZipObserver(o, i, p, q, d) {
      this._o = o;
      this._i = i;
      this._p = p;
      this._q = q;
      this._d = d;
      __super__.call(this);
    }

    function notEmpty(x) {
      return x.length > 0;
    }
    function shiftEach(x) {
      return x.shift();
    }
    function notTheSame(i) {
      return function (x, j) {
        return j !== i;
      };
    }

    ZipObserver.prototype.next = function (x) {
      this._q[this._i].push(x);
      if (this._q.every(notEmpty)) {
        var queuedValues = this._q.map(shiftEach);
        var res = tryCatch(this._p._cb).apply(null, queuedValues);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }
        this._o.onNext(res);
      } else if (this._d.filter(notTheSame(this._i)).every(identity)) {
        this._o.onCompleted();
      }
    };

    ZipObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    ZipObserver.prototype.completed = function () {
      this._d[this._i] = true;
      this._d.every(identity) && this._o.onCompleted();
    };

    return ZipObserver;
  }(AbstractObserver);

  observableProto.zip = function () {
    if (arguments.length === 0) {
      throw new Error('invalid arguments');
    }

    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
    Array.isArray(args[0]) && (args = args[0]);

    var parent = this;
    args.unshift(parent);

    return new ZipObservable(args, resultSelector);
  };

  Observable.zip = function () {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    if (Array.isArray(args[0])) {
      args = isFunction(args[1]) ? args[0].concat(args[1]) : args[0];
    }
    var first = args.shift();
    return first.zip.apply(first, args);
  };

  function falseFactory() {
    return false;
  }
  function emptyArrayFactory() {
    return [];
  }
  function argumentsToArray() {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    return args;
  }

  var ZipIterableObservable = function (__super__) {
    inherits(ZipIterableObservable, __super__);
    function ZipIterableObservable(sources, cb) {
      this.sources = sources;
      this._cb = cb;
      __super__.call(this);
    }

    ZipIterableObservable.prototype.subscribeCore = function (o) {
      var sources = this.sources,
          len = sources.length,
          subscriptions = new Array(len);

      var state = {
        q: arrayInitialize(len, emptyArrayFactory),
        done: arrayInitialize(len, falseFactory),
        cb: this._cb,
        o: o
      };

      for (var i = 0; i < len; i++) {
        (function (i) {
          var source = sources[i],
              sad = new SingleAssignmentDisposable();
          (isArrayLike(source) || isIterable(source)) && (source = observableFrom(source));

          subscriptions[i] = sad;
          sad.setDisposable(source.subscribe(new ZipIterableObserver(state, i)));
        })(i);
      }

      return new NAryDisposable(subscriptions);
    };

    return ZipIterableObservable;
  }(ObservableBase);

  var ZipIterableObserver = function (__super__) {
    inherits(ZipIterableObserver, __super__);
    function ZipIterableObserver(s, i) {
      this._s = s;
      this._i = i;
      __super__.call(this);
    }

    function notEmpty(x) {
      return x.length > 0;
    }
    function shiftEach(x) {
      return x.shift();
    }
    function notTheSame(i) {
      return function (x, j) {
        return j !== i;
      };
    }

    ZipIterableObserver.prototype.next = function (x) {
      this._s.q[this._i].push(x);
      if (this._s.q.every(notEmpty)) {
        var queuedValues = this._s.q.map(shiftEach),
            res = tryCatch(this._s.cb).apply(null, queuedValues);
        if (res === errorObj) {
          return this._s.o.onError(res.e);
        }
        this._s.o.onNext(res);
      } else if (this._s.done.filter(notTheSame(this._i)).every(identity)) {
        this._s.o.onCompleted();
      }
    };

    ZipIterableObserver.prototype.error = function (e) {
      this._s.o.onError(e);
    };

    ZipIterableObserver.prototype.completed = function () {
      this._s.done[this._i] = true;
      this._s.done.every(identity) && this._s.o.onCompleted();
    };

    return ZipIterableObserver;
  }(AbstractObserver);

  observableProto.zipIterable = function () {
    if (arguments.length === 0) {
      throw new Error('invalid arguments');
    }

    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;

    var parent = this;
    args.unshift(parent);
    return new ZipIterableObservable(args, resultSelector);
  };

  function asObservable(source) {
    return function subscribe(o) {
      return source.subscribe(o);
    };
  }

  observableProto.asObservable = function () {
    return new AnonymousObservable(asObservable(this), this);
  };

  function toArray(x) {
    return x.toArray();
  }
  function notEmpty(x) {
    return x.length > 0;
  }

  observableProto.bufferWithCount = observableProto.bufferCount = function (count, skip) {
    typeof skip !== 'number' && (skip = count);
    return this.windowWithCount(count, skip).flatMap(toArray).filter(notEmpty);
  };

  var DematerializeObservable = function (__super__) {
    inherits(DematerializeObservable, __super__);
    function DematerializeObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    DematerializeObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new DematerializeObserver(o));
    };

    return DematerializeObservable;
  }(ObservableBase);

  var DematerializeObserver = function (__super__) {
    inherits(DematerializeObserver, __super__);

    function DematerializeObserver(o) {
      this._o = o;
      __super__.call(this);
    }

    DematerializeObserver.prototype.next = function (x) {
      x.accept(this._o);
    };
    DematerializeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    DematerializeObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return DematerializeObserver;
  }(AbstractObserver);

  observableProto.dematerialize = function () {
    return new DematerializeObservable(this);
  };

  var DistinctUntilChangedObservable = function (__super__) {
    inherits(DistinctUntilChangedObservable, __super__);
    function DistinctUntilChangedObservable(source, keyFn, comparer) {
      this.source = source;
      this.keyFn = keyFn;
      this.comparer = comparer;
      __super__.call(this);
    }

    DistinctUntilChangedObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new DistinctUntilChangedObserver(o, this.keyFn, this.comparer));
    };

    return DistinctUntilChangedObservable;
  }(ObservableBase);

  var DistinctUntilChangedObserver = function (__super__) {
    inherits(DistinctUntilChangedObserver, __super__);
    function DistinctUntilChangedObserver(o, keyFn, comparer) {
      this.o = o;
      this.keyFn = keyFn;
      this.comparer = comparer;
      this.hasCurrentKey = false;
      this.currentKey = null;
      __super__.call(this);
    }

    DistinctUntilChangedObserver.prototype.next = function (x) {
      var key = x,
          comparerEquals;
      if (isFunction(this.keyFn)) {
        key = tryCatch(this.keyFn)(x);
        if (key === errorObj) {
          return this.o.onError(key.e);
        }
      }
      if (this.hasCurrentKey) {
        comparerEquals = tryCatch(this.comparer)(this.currentKey, key);
        if (comparerEquals === errorObj) {
          return this.o.onError(comparerEquals.e);
        }
      }
      if (!this.hasCurrentKey || !comparerEquals) {
        this.hasCurrentKey = true;
        this.currentKey = key;
        this.o.onNext(x);
      }
    };
    DistinctUntilChangedObserver.prototype.error = function (e) {
      this.o.onError(e);
    };
    DistinctUntilChangedObserver.prototype.completed = function () {
      this.o.onCompleted();
    };

    return DistinctUntilChangedObserver;
  }(AbstractObserver);

  observableProto.distinctUntilChanged = function (keyFn, comparer) {
    comparer || (comparer = defaultComparer);
    return new DistinctUntilChangedObservable(this, keyFn, comparer);
  };

  var TapObservable = function (__super__) {
    inherits(TapObservable, __super__);
    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
      this.source = source;
      this._oN = observerOrOnNext;
      this._oE = onError;
      this._oC = onCompleted;
      __super__.call(this);
    }

    TapObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this));
    };

    inherits(InnerObserver, AbstractObserver);
    function InnerObserver(o, p) {
      this.o = o;
      this.t = !p._oN || isFunction(p._oN) ? observerCreate(p._oN || noop, p._oE || noop, p._oC || noop) : p._oN;
      this.isStopped = false;
      AbstractObserver.call(this);
    }
    InnerObserver.prototype.next = function (x) {
      var res = tryCatch(this.t.onNext).call(this.t, x);
      if (res === errorObj) {
        this.o.onError(res.e);
      }
      this.o.onNext(x);
    };
    InnerObserver.prototype.error = function (err) {
      var res = tryCatch(this.t.onError).call(this.t, err);
      if (res === errorObj) {
        return this.o.onError(res.e);
      }
      this.o.onError(err);
    };
    InnerObserver.prototype.completed = function () {
      var res = tryCatch(this.t.onCompleted).call(this.t);
      if (res === errorObj) {
        return this.o.onError(res.e);
      }
      this.o.onCompleted();
    };

    return TapObservable;
  }(ObservableBase);

  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
  };

  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
    return this.tap(typeof thisArg !== 'undefined' ? function (x) {
      onNext.call(thisArg, x);
    } : onNext);
  };

  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) {
      onError.call(thisArg, e);
    } : onError);
  };

  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () {
      onCompleted.call(thisArg);
    } : onCompleted);
  };

  var FinallyObservable = function (__super__) {
    inherits(FinallyObservable, __super__);
    function FinallyObservable(source, fn, thisArg) {
      this.source = source;
      this._fn = bindCallback(fn, thisArg, 0);
      __super__.call(this);
    }

    FinallyObservable.prototype.subscribeCore = function (o) {
      var d = tryCatch(this.source.subscribe).call(this.source, o);
      if (d === errorObj) {
        this._fn();
        thrower(d.e);
      }

      return new FinallyDisposable(d, this._fn);
    };

    function FinallyDisposable(s, fn) {
      this.isDisposed = false;
      this._s = s;
      this._fn = fn;
    }
    FinallyDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        var res = tryCatch(this._s.dispose).call(this._s);
        this._fn();
        res === errorObj && thrower(res.e);
      }
    };

    return FinallyObservable;
  }(ObservableBase);

  observableProto['finally'] = function (action, thisArg) {
    return new FinallyObservable(this, action, thisArg);
  };

  var IgnoreElementsObservable = function (__super__) {
    inherits(IgnoreElementsObservable, __super__);

    function IgnoreElementsObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o));
    };

    function InnerObserver(o) {
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = noop;
    InnerObserver.prototype.onError = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function () {
      this.isStopped = true;
    };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
        return true;
      }

      return false;
    };

    return IgnoreElementsObservable;
  }(ObservableBase);

  observableProto.ignoreElements = function () {
    return new IgnoreElementsObservable(this);
  };

  var MaterializeObservable = function (__super__) {
    inherits(MaterializeObservable, __super__);
    function MaterializeObservable(source, fn) {
      this.source = source;
      __super__.call(this);
    }

    MaterializeObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new MaterializeObserver(o));
    };

    return MaterializeObservable;
  }(ObservableBase);

  var MaterializeObserver = function (__super__) {
    inherits(MaterializeObserver, __super__);

    function MaterializeObserver(o) {
      this._o = o;
      __super__.call(this);
    }

    MaterializeObserver.prototype.next = function (x) {
      this._o.onNext(notificationCreateOnNext(x));
    };
    MaterializeObserver.prototype.error = function (e) {
      this._o.onNext(notificationCreateOnError(e));this._o.onCompleted();
    };
    MaterializeObserver.prototype.completed = function () {
      this._o.onNext(notificationCreateOnCompleted());this._o.onCompleted();
    };

    return MaterializeObserver;
  }(AbstractObserver);

  observableProto.materialize = function () {
    return new MaterializeObservable(this);
  };

  observableProto.repeat = function (repeatCount) {
    return enumerableRepeat(this, repeatCount).concat();
  };

  observableProto.retry = function (retryCount) {
    return enumerableRepeat(this, retryCount).catchError();
  };

  function repeat(value) {
    return {
      '@@iterator': function iterator() {
        return {
          next: function next() {
            return { done: false, value: value };
          }
        };
      }
    };
  }

  var RetryWhenObservable = function (__super__) {
    function createDisposable(state) {
      return {
        isDisposed: false,
        dispose: function dispose() {
          if (!this.isDisposed) {
            this.isDisposed = true;
            state.isDisposed = true;
          }
        }
      };
    }

    function RetryWhenObservable(source, notifier) {
      this.source = source;
      this._notifier = notifier;
      __super__.call(this);
    }

    inherits(RetryWhenObservable, __super__);

    RetryWhenObservable.prototype.subscribeCore = function (o) {
      var exceptions = new Subject(),
          notifier = new Subject(),
          handled = this._notifier(exceptions),
          notificationDisposable = handled.subscribe(notifier);

      var e = this.source['@@iterator']();

      var state = { isDisposed: false },
          lastError,
          subscription = new SerialDisposable();
      var cancelable = currentThreadScheduler.scheduleRecursive(null, function (_, recurse) {
        if (state.isDisposed) {
          return;
        }
        var currentItem = e.next();

        if (currentItem.done) {
          if (lastError) {
            o.onError(lastError);
          } else {
            o.onCompleted();
          }
          return;
        }

        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var outer = new SingleAssignmentDisposable();
        var inner = new SingleAssignmentDisposable();
        subscription.setDisposable(new BinaryDisposable(inner, outer));
        outer.setDisposable(currentValue.subscribe(function (x) {
          o.onNext(x);
        }, function (exn) {
          inner.setDisposable(notifier.subscribe(recurse, function (ex) {
            o.onError(ex);
          }, function () {
            o.onCompleted();
          }));

          exceptions.onNext(exn);
          outer.dispose();
        }, function () {
          o.onCompleted();
        }));
      });

      return new NAryDisposable([notificationDisposable, subscription, cancelable, createDisposable(state)]);
    };

    return RetryWhenObservable;
  }(ObservableBase);

  observableProto.retryWhen = function (notifier) {
    return new RetryWhenObservable(repeat(this), notifier);
  };

  function repeat(value) {
    return {
      '@@iterator': function iterator() {
        return {
          next: function next() {
            return { done: false, value: value };
          }
        };
      }
    };
  }

  var RepeatWhenObservable = function (__super__) {
    function createDisposable(state) {
      return {
        isDisposed: false,
        dispose: function dispose() {
          if (!this.isDisposed) {
            this.isDisposed = true;
            state.isDisposed = true;
          }
        }
      };
    }

    function RepeatWhenObservable(source, notifier) {
      this.source = source;
      this._notifier = notifier;
      __super__.call(this);
    }

    inherits(RepeatWhenObservable, __super__);

    RepeatWhenObservable.prototype.subscribeCore = function (o) {
      var completions = new Subject(),
          notifier = new Subject(),
          handled = this._notifier(completions),
          notificationDisposable = handled.subscribe(notifier);

      var e = this.source['@@iterator']();

      var state = { isDisposed: false },
          lastError,
          subscription = new SerialDisposable();
      var cancelable = currentThreadScheduler.scheduleRecursive(null, function (_, recurse) {
        if (state.isDisposed) {
          return;
        }
        var currentItem = e.next();

        if (currentItem.done) {
          if (lastError) {
            o.onError(lastError);
          } else {
            o.onCompleted();
          }
          return;
        }

        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var outer = new SingleAssignmentDisposable();
        var inner = new SingleAssignmentDisposable();
        subscription.setDisposable(new BinaryDisposable(inner, outer));
        outer.setDisposable(currentValue.subscribe(function (x) {
          o.onNext(x);
        }, function (exn) {
          o.onError(exn);
        }, function () {
          inner.setDisposable(notifier.subscribe(recurse, function (ex) {
            o.onError(ex);
          }, function () {
            o.onCompleted();
          }));

          completions.onNext(null);
          outer.dispose();
        }));
      });

      return new NAryDisposable([notificationDisposable, subscription, cancelable, createDisposable(state)]);
    };

    return RepeatWhenObservable;
  }(ObservableBase);

  observableProto.repeatWhen = function (notifier) {
    return new RepeatWhenObservable(repeat(this), notifier);
  };

  var ScanObservable = function (__super__) {
    inherits(ScanObservable, __super__);
    function ScanObservable(source, accumulator, hasSeed, seed) {
      this.source = source;
      this.accumulator = accumulator;
      this.hasSeed = hasSeed;
      this.seed = seed;
      __super__.call(this);
    }

    ScanObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new ScanObserver(o, this));
    };

    return ScanObservable;
  }(ObservableBase);

  var ScanObserver = function (__super__) {
    inherits(ScanObserver, __super__);
    function ScanObserver(o, parent) {
      this._o = o;
      this._p = parent;
      this._fn = parent.accumulator;
      this._hs = parent.hasSeed;
      this._s = parent.seed;
      this._ha = false;
      this._a = null;
      this._hv = false;
      this._i = 0;
      __super__.call(this);
    }

    ScanObserver.prototype.next = function (x) {
      !this._hv && (this._hv = true);
      if (this._ha) {
        this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
      } else {
        this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
        this._ha = true;
      }
      if (this._a === errorObj) {
        return this._o.onError(this._a.e);
      }
      this._o.onNext(this._a);
      this._i++;
    };

    ScanObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    ScanObserver.prototype.completed = function () {
      !this._hv && this._hs && this._o.onNext(this._s);
      this._o.onCompleted();
    };

    return ScanObserver;
  }(AbstractObserver);

  observableProto.scan = function () {
    var hasSeed = false,
        seed,
        accumulator = arguments[0];
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[1];
    }
    return new ScanObservable(this, accumulator, hasSeed, seed);
  };

  var SkipLastObservable = function (__super__) {
    inherits(SkipLastObservable, __super__);
    function SkipLastObservable(source, c) {
      this.source = source;
      this._c = c;
      __super__.call(this);
    }

    SkipLastObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SkipLastObserver(o, this._c));
    };

    return SkipLastObservable;
  }(ObservableBase);

  var SkipLastObserver = function (__super__) {
    inherits(SkipLastObserver, __super__);
    function SkipLastObserver(o, c) {
      this._o = o;
      this._c = c;
      this._q = [];
      __super__.call(this);
    }

    SkipLastObserver.prototype.next = function (x) {
      this._q.push(x);
      this._q.length > this._c && this._o.onNext(this._q.shift());
    };

    SkipLastObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    SkipLastObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return SkipLastObserver;
  }(AbstractObserver);

  observableProto.skipLast = function (count) {
    if (count < 0) {
      throw new ArgumentOutOfRangeError();
    }
    return new SkipLastObservable(this, count);
  };

  observableProto.startWith = function () {
    var values,
        scheduler,
        start = 0;
    if (!!arguments.length && isScheduler(arguments[0])) {
      scheduler = arguments[0];
      start = 1;
    } else {
      scheduler = immediateScheduler;
    }
    for (var args = [], i = start, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }
    return observableConcat.apply(null, [observableFromArray(args, scheduler), this]);
  };

  var TakeLastObserver = function (__super__) {
    inherits(TakeLastObserver, __super__);
    function TakeLastObserver(o, c) {
      this._o = o;
      this._c = c;
      this._q = [];
      __super__.call(this);
    }

    TakeLastObserver.prototype.next = function (x) {
      this._q.push(x);
      this._q.length > this._c && this._q.shift();
    };

    TakeLastObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    TakeLastObserver.prototype.completed = function () {
      while (this._q.length > 0) {
        this._o.onNext(this._q.shift());
      }
      this._o.onCompleted();
    };

    return TakeLastObserver;
  }(AbstractObserver);

  observableProto.takeLast = function (count) {
    if (count < 0) {
      throw new ArgumentOutOfRangeError();
    }
    var source = this;
    return new AnonymousObservable(function (o) {
      return source.subscribe(new TakeLastObserver(o, count));
    }, source);
  };

  var TakeLastBufferObserver = function (__super__) {
    inherits(TakeLastBufferObserver, __super__);
    function TakeLastBufferObserver(o, c) {
      this._o = o;
      this._c = c;
      this._q = [];
      __super__.call(this);
    }

    TakeLastBufferObserver.prototype.next = function (x) {
      this._q.push(x);
      this._q.length > this._c && this._q.shift();
    };

    TakeLastBufferObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    TakeLastBufferObserver.prototype.completed = function () {
      this._o.onNext(this._q);
      this._o.onCompleted();
    };

    return TakeLastBufferObserver;
  }(AbstractObserver);

  observableProto.takeLastBuffer = function (count) {
    if (count < 0) {
      throw new ArgumentOutOfRangeError();
    }
    var source = this;
    return new AnonymousObservable(function (o) {
      return source.subscribe(new TakeLastBufferObserver(o, count));
    }, source);
  };

  observableProto.windowWithCount = observableProto.windowCount = function (count, skip) {
    var source = this;
    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count <= 0) {
      throw new ArgumentOutOfRangeError();
    }
    skip == null && (skip = count);
    +skip || (skip = 0);
    Math.abs(skip) === Infinity && (skip = 0);

    if (skip <= 0) {
      throw new ArgumentOutOfRangeError();
    }
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(),
          refCountDisposable = new RefCountDisposable(m),
          n = 0,
          q = [];

      function createWindow() {
        var s = new Subject();
        q.push(s);
        observer.onNext(addRef(s, refCountDisposable));
      }

      createWindow();

      m.setDisposable(source.subscribe(function (x) {
        for (var i = 0, len = q.length; i < len; i++) {
          q[i].onNext(x);
        }
        var c = n - count + 1;
        c >= 0 && c % skip === 0 && q.shift().onCompleted();
        ++n % skip === 0 && createWindow();
      }, function (e) {
        while (q.length > 0) {
          q.shift().onError(e);
        }
        observer.onError(e);
      }, function () {
        while (q.length > 0) {
          q.shift().onCompleted();
        }
        observer.onCompleted();
      }));
      return refCountDisposable;
    }, source);
  };

  function concatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).concatAll();
  }

  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.concatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      });
    }
    return isFunction(selector) ? concatMap(this, selector, thisArg) : concatMap(this, function () {
      return selector;
    });
  };

  observableProto.concatMapObserver = observableProto.selectConcatObserver = function (onNext, onError, onCompleted, thisArg) {
    var source = this,
        onNextFunc = bindCallback(onNext, thisArg, 2),
        onErrorFunc = bindCallback(onError, thisArg, 1),
        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
    return new AnonymousObservable(function (observer) {
      var index = 0;
      return source.subscribe(function (x) {
        var result;
        try {
          result = onNextFunc(x, index++);
        } catch (e) {
          observer.onError(e);
          return;
        }
        isPromise(result) && (result = observableFromPromise(result));
        observer.onNext(result);
      }, function (err) {
        var result;
        try {
          result = onErrorFunc(err);
        } catch (e) {
          observer.onError(e);
          return;
        }
        isPromise(result) && (result = observableFromPromise(result));
        observer.onNext(result);
        observer.onCompleted();
      }, function () {
        var result;
        try {
          result = onCompletedFunc();
        } catch (e) {
          observer.onError(e);
          return;
        }
        isPromise(result) && (result = observableFromPromise(result));
        observer.onNext(result);
        observer.onCompleted();
      });
    }, this).concatAll();
  };

  var DefaultIfEmptyObserver = function (__super__) {
    inherits(DefaultIfEmptyObserver, __super__);
    function DefaultIfEmptyObserver(o, d) {
      this._o = o;
      this._d = d;
      this._f = false;
      __super__.call(this);
    }

    DefaultIfEmptyObserver.prototype.next = function (x) {
      this._f = true;
      this._o.onNext(x);
    };

    DefaultIfEmptyObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    DefaultIfEmptyObserver.prototype.completed = function () {
      !this._f && this._o.onNext(this._d);
      this._o.onCompleted();
    };

    return DefaultIfEmptyObserver;
  }(AbstractObserver);

  observableProto.defaultIfEmpty = function (defaultValue) {
    var source = this;
    defaultValue === undefined && (defaultValue = null);
    return new AnonymousObservable(function (o) {
      return source.subscribe(new DefaultIfEmptyObserver(o, defaultValue));
    }, source);
  };

  function arrayIndexOfComparer(array, item, comparer) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (comparer(array[i], item)) {
        return i;
      }
    }
    return -1;
  }

  function HashSet(comparer) {
    this.comparer = comparer;
    this.set = [];
  }
  HashSet.prototype.push = function (value) {
    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
    retValue && this.set.push(value);
    return retValue;
  };

  var DistinctObservable = function (__super__) {
    inherits(DistinctObservable, __super__);
    function DistinctObservable(source, keyFn, cmpFn) {
      this.source = source;
      this._keyFn = keyFn;
      this._cmpFn = cmpFn;
      __super__.call(this);
    }

    DistinctObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new DistinctObserver(o, this._keyFn, this._cmpFn));
    };

    return DistinctObservable;
  }(ObservableBase);

  var DistinctObserver = function (__super__) {
    inherits(DistinctObserver, __super__);
    function DistinctObserver(o, keyFn, cmpFn) {
      this._o = o;
      this._keyFn = keyFn;
      this._h = new HashSet(cmpFn);
      __super__.call(this);
    }

    DistinctObserver.prototype.next = function (x) {
      var key = x;
      if (isFunction(this._keyFn)) {
        key = tryCatch(this._keyFn)(x);
        if (key === errorObj) {
          return this._o.onError(key.e);
        }
      }
      this._h.push(key) && this._o.onNext(x);
    };

    DistinctObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    DistinctObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return DistinctObserver;
  }(AbstractObserver);

  observableProto.distinct = function (keySelector, comparer) {
    comparer || (comparer = defaultComparer);
    return new DistinctObservable(this, keySelector, comparer);
  };

  observableProto.groupBy = function (keySelector, elementSelector) {
    return this.groupByUntil(keySelector, elementSelector, observableNever);
  };

  observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var map = new Map(),
          groupDisposable = new CompositeDisposable(),
          refCountDisposable = new RefCountDisposable(groupDisposable),
          handleError = function handleError(e) {
        return function (item) {
          item.onError(e);
        };
      };

      groupDisposable.add(source.subscribe(function (x) {
        var key = tryCatch(keySelector)(x);
        if (key === errorObj) {
          map.forEach(handleError(key.e));
          return o.onError(key.e);
        }

        var fireNewMapEntry = false,
            writer = map.get(key);
        if (writer === undefined) {
          writer = new Subject();
          map.set(key, writer);
          fireNewMapEntry = true;
        }

        if (fireNewMapEntry) {
          var group = new GroupedObservable(key, writer, refCountDisposable),
              durationGroup = new GroupedObservable(key, writer);
          var duration = tryCatch(durationSelector)(durationGroup);
          if (duration === errorObj) {
            map.forEach(handleError(duration.e));
            return o.onError(duration.e);
          }

          o.onNext(group);

          var md = new SingleAssignmentDisposable();
          groupDisposable.add(md);

          md.setDisposable(duration.take(1).subscribe(noop, function (e) {
            map.forEach(handleError(e));
            o.onError(e);
          }, function () {
            if (map['delete'](key)) {
              writer.onCompleted();
            }
            groupDisposable.remove(md);
          }));
        }

        var element = x;
        if (isFunction(elementSelector)) {
          element = tryCatch(elementSelector)(x);
          if (element === errorObj) {
            map.forEach(handleError(element.e));
            return o.onError(element.e);
          }
        }

        writer.onNext(element);
      }, function (e) {
        map.forEach(handleError(e));
        o.onError(e);
      }, function () {
        map.forEach(function (item) {
          item.onCompleted();
        });
        o.onCompleted();
      }));

      return refCountDisposable;
    }, source);
  };

  var MapObservable = function (__super__) {
    inherits(MapObservable, __super__);

    function MapObservable(source, selector, thisArg) {
      this.source = source;
      this.selector = bindCallback(selector, thisArg, 3);
      __super__.call(this);
    }

    function innerMap(selector, self) {
      return function (x, i, o) {
        return selector.call(this, self.selector(x, i, o), i, o);
      };
    }

    MapObservable.prototype.internalMap = function (selector, thisArg) {
      return new MapObservable(this.source, innerMap(selector, this), thisArg);
    };

    MapObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.selector, this));
    };

    inherits(InnerObserver, AbstractObserver);
    function InnerObserver(o, selector, source) {
      this.o = o;
      this.selector = selector;
      this.source = source;
      this.i = 0;
      AbstractObserver.call(this);
    }

    InnerObserver.prototype.next = function (x) {
      var result = tryCatch(this.selector)(x, this.i++, this.source);
      if (result === errorObj) {
        return this.o.onError(result.e);
      }
      this.o.onNext(result);
    };

    InnerObserver.prototype.error = function (e) {
      this.o.onError(e);
    };

    InnerObserver.prototype.completed = function () {
      this.o.onCompleted();
    };

    return MapObservable;
  }(ObservableBase);

  observableProto.map = observableProto.select = function (selector, thisArg) {
    var selectorFn = typeof selector === 'function' ? selector : function () {
      return selector;
    };
    return this instanceof MapObservable ? this.internalMap(selectorFn, thisArg) : new MapObservable(this, selectorFn, thisArg);
  };

  function plucker(args, len) {
    return function mapper(x) {
      var currentProp = x;
      for (var i = 0; i < len; i++) {
        var p = currentProp[args[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    };
  }

  observableProto.pluck = function () {
    var len = arguments.length,
        args = new Array(len);
    if (len === 0) {
      throw new Error('List of properties cannot be empty.');
    }
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    return this.map(plucker(args, len));
  };

  observableProto.flatMap = observableProto.selectMany = observableProto.mergeMap = function (selector, resultSelector, thisArg) {
    return new FlatMapObservable(this, selector, resultSelector, thisArg).mergeAll();
  };

  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var index = 0;

      return source.subscribe(function (x) {
        var result;
        try {
          result = onNext.call(thisArg, x, index++);
        } catch (e) {
          observer.onError(e);
          return;
        }
        isPromise(result) && (result = observableFromPromise(result));
        observer.onNext(result);
      }, function (err) {
        var result;
        try {
          result = onError.call(thisArg, err);
        } catch (e) {
          observer.onError(e);
          return;
        }
        isPromise(result) && (result = observableFromPromise(result));
        observer.onNext(result);
        observer.onCompleted();
      }, function () {
        var result;
        try {
          result = onCompleted.call(thisArg);
        } catch (e) {
          observer.onError(e);
          return;
        }
        isPromise(result) && (result = observableFromPromise(result));
        observer.onNext(result);
        observer.onCompleted();
      });
    }, source).mergeAll();
  };

  observableProto.flatMapLatest = observableProto.switchMap = function (selector, resultSelector, thisArg) {
    return new FlatMapObservable(this, selector, resultSelector, thisArg).switchLatest();
  };

  var SkipObservable = function (__super__) {
    inherits(SkipObservable, __super__);
    function SkipObservable(source, count) {
      this.source = source;
      this._count = count;
      __super__.call(this);
    }

    SkipObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SkipObserver(o, this._count));
    };

    function SkipObserver(o, c) {
      this._o = o;
      this._r = c;
      AbstractObserver.call(this);
    }

    inherits(SkipObserver, AbstractObserver);

    SkipObserver.prototype.next = function (x) {
      if (this._r <= 0) {
        this._o.onNext(x);
      } else {
        this._r--;
      }
    };
    SkipObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SkipObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return SkipObservable;
  }(ObservableBase);

  observableProto.skip = function (count) {
    if (count < 0) {
      throw new ArgumentOutOfRangeError();
    }
    return new SkipObservable(this, count);
  };

  var SkipWhileObservable = function (__super__) {
    inherits(SkipWhileObservable, __super__);
    function SkipWhileObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    SkipWhileObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SkipWhileObserver(o, this));
    };

    return SkipWhileObservable;
  }(ObservableBase);

  var SkipWhileObserver = function (__super__) {
    inherits(SkipWhileObserver, __super__);

    function SkipWhileObserver(o, p) {
      this._o = o;
      this._p = p;
      this._i = 0;
      this._r = false;
      __super__.call(this);
    }

    SkipWhileObserver.prototype.next = function (x) {
      if (!this._r) {
        var res = tryCatch(this._p._fn)(x, this._i++, this._p);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }
        this._r = !res;
      }
      this._r && this._o.onNext(x);
    };
    SkipWhileObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SkipWhileObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return SkipWhileObserver;
  }(AbstractObserver);

  observableProto.skipWhile = function (predicate, thisArg) {
    var fn = bindCallback(predicate, thisArg, 3);
    return new SkipWhileObservable(this, fn);
  };

  var TakeObservable = function (__super__) {
    inherits(TakeObservable, __super__);
    function TakeObservable(source, count) {
      this.source = source;
      this._count = count;
      __super__.call(this);
    }

    TakeObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new TakeObserver(o, this._count));
    };

    function TakeObserver(o, c) {
      this._o = o;
      this._c = c;
      this._r = c;
      AbstractObserver.call(this);
    }

    inherits(TakeObserver, AbstractObserver);

    TakeObserver.prototype.next = function (x) {
      if (this._r-- > 0) {
        this._o.onNext(x);
        this._r <= 0 && this._o.onCompleted();
      }
    };

    TakeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    TakeObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return TakeObservable;
  }(ObservableBase);

  observableProto.take = function (count, scheduler) {
    if (count < 0) {
      throw new ArgumentOutOfRangeError();
    }
    if (count === 0) {
      return observableEmpty(scheduler);
    }
    return new TakeObservable(this, count);
  };

  var TakeWhileObservable = function (__super__) {
    inherits(TakeWhileObservable, __super__);
    function TakeWhileObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    TakeWhileObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new TakeWhileObserver(o, this));
    };

    return TakeWhileObservable;
  }(ObservableBase);

  var TakeWhileObserver = function (__super__) {
    inherits(TakeWhileObserver, __super__);

    function TakeWhileObserver(o, p) {
      this._o = o;
      this._p = p;
      this._i = 0;
      this._r = true;
      __super__.call(this);
    }

    TakeWhileObserver.prototype.next = function (x) {
      if (this._r) {
        this._r = tryCatch(this._p._fn)(x, this._i++, this._p);
        if (this._r === errorObj) {
          return this._o.onError(this._r.e);
        }
      }
      if (this._r) {
        this._o.onNext(x);
      } else {
        this._o.onCompleted();
      }
    };
    TakeWhileObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    TakeWhileObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return TakeWhileObserver;
  }(AbstractObserver);

  observableProto.takeWhile = function (predicate, thisArg) {
    var fn = bindCallback(predicate, thisArg, 3);
    return new TakeWhileObservable(this, fn);
  };

  var FilterObservable = function (__super__) {
    inherits(FilterObservable, __super__);

    function FilterObservable(source, predicate, thisArg) {
      this.source = source;
      this.predicate = bindCallback(predicate, thisArg, 3);
      __super__.call(this);
    }

    FilterObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
    };

    function innerPredicate(predicate, self) {
      return function (x, i, o) {
        return self.predicate(x, i, o) && predicate.call(this, x, i, o);
      };
    }

    FilterObservable.prototype.internalFilter = function (predicate, thisArg) {
      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
    };

    inherits(InnerObserver, AbstractObserver);
    function InnerObserver(o, predicate, source) {
      this.o = o;
      this.predicate = predicate;
      this.source = source;
      this.i = 0;
      AbstractObserver.call(this);
    }

    InnerObserver.prototype.next = function (x) {
      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
      if (shouldYield === errorObj) {
        return this.o.onError(shouldYield.e);
      }
      shouldYield && this.o.onNext(x);
    };

    InnerObserver.prototype.error = function (e) {
      this.o.onError(e);
    };

    InnerObserver.prototype.completed = function () {
      this.o.onCompleted();
    };

    return FilterObservable;
  }(ObservableBase);

  observableProto.filter = observableProto.where = function (predicate, thisArg) {
    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) : new FilterObservable(this, predicate, thisArg);
  };

  var ExtremaByObservable = function (__super__) {
    inherits(ExtremaByObservable, __super__);
    function ExtremaByObservable(source, k, c) {
      this.source = source;
      this._k = k;
      this._c = c;
      __super__.call(this);
    }

    ExtremaByObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new ExtremaByObserver(o, this._k, this._c));
    };

    return ExtremaByObservable;
  }(ObservableBase);

  var ExtremaByObserver = function (__super__) {
    inherits(ExtremaByObserver, __super__);
    function ExtremaByObserver(o, k, c) {
      this._o = o;
      this._k = k;
      this._c = c;
      this._v = null;
      this._hv = false;
      this._l = [];
      __super__.call(this);
    }

    ExtremaByObserver.prototype.next = function (x) {
      var key = tryCatch(this._k)(x);
      if (key === errorObj) {
        return this._o.onError(key.e);
      }
      var comparison = 0;
      if (!this._hv) {
        this._hv = true;
        this._v = key;
      } else {
        comparison = tryCatch(this._c)(key, this._v);
        if (comparison === errorObj) {
          return this._o.onError(comparison.e);
        }
      }
      if (comparison > 0) {
        this._v = key;
        this._l = [];
      }
      if (comparison >= 0) {
        this._l.push(x);
      }
    };

    ExtremaByObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    ExtremaByObserver.prototype.completed = function () {
      this._o.onNext(this._l);
      this._o.onCompleted();
    };

    return ExtremaByObserver;
  }(AbstractObserver);

  function firstOnly(x) {
    if (x.length === 0) {
      throw new EmptyError();
    }
    return x[0];
  }

  var ReduceObservable = function (__super__) {
    inherits(ReduceObservable, __super__);
    function ReduceObservable(source, accumulator, hasSeed, seed) {
      this.source = source;
      this.accumulator = accumulator;
      this.hasSeed = hasSeed;
      this.seed = seed;
      __super__.call(this);
    }

    ReduceObservable.prototype.subscribeCore = function (observer) {
      return this.source.subscribe(new ReduceObserver(observer, this));
    };

    return ReduceObservable;
  }(ObservableBase);

  var ReduceObserver = function (__super__) {
    inherits(ReduceObserver, __super__);
    function ReduceObserver(o, parent) {
      this._o = o;
      this._p = parent;
      this._fn = parent.accumulator;
      this._hs = parent.hasSeed;
      this._s = parent.seed;
      this._ha = false;
      this._a = null;
      this._hv = false;
      this._i = 0;
      __super__.call(this);
    }

    ReduceObserver.prototype.next = function (x) {
      !this._hv && (this._hv = true);
      if (this._ha) {
        this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
      } else {
        this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
        this._ha = true;
      }
      if (this._a === errorObj) {
        return this._o.onError(this._a.e);
      }
      this._i++;
    };

    ReduceObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    ReduceObserver.prototype.completed = function () {
      this._hv && this._o.onNext(this._a);
      !this._hv && this._hs && this._o.onNext(this._s);
      !this._hv && !this._hs && this._o.onError(new EmptyError());
      this._o.onCompleted();
    };

    return ReduceObserver;
  }(AbstractObserver);

  observableProto.reduce = function () {
    var hasSeed = false,
        seed,
        accumulator = arguments[0];
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[1];
    }
    return new ReduceObservable(this, accumulator, hasSeed, seed);
  };

  var SomeObservable = function (__super__) {
    inherits(SomeObservable, __super__);
    function SomeObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    SomeObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SomeObserver(o, this._fn, this.source));
    };

    return SomeObservable;
  }(ObservableBase);

  var SomeObserver = function (__super__) {
    inherits(SomeObserver, __super__);

    function SomeObserver(o, fn, s) {
      this._o = o;
      this._fn = fn;
      this._s = s;
      this._i = 0;
      __super__.call(this);
    }

    SomeObserver.prototype.next = function (x) {
      var result = tryCatch(this._fn)(x, this._i++, this._s);
      if (result === errorObj) {
        return this._o.onError(result.e);
      }
      if (Boolean(result)) {
        this._o.onNext(true);
        this._o.onCompleted();
      }
    };
    SomeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SomeObserver.prototype.completed = function () {
      this._o.onNext(false);
      this._o.onCompleted();
    };

    return SomeObserver;
  }(AbstractObserver);

  observableProto.some = function (predicate, thisArg) {
    var fn = bindCallback(predicate, thisArg, 3);
    return new SomeObservable(this, fn);
  };

  var IsEmptyObservable = function (__super__) {
    inherits(IsEmptyObservable, __super__);
    function IsEmptyObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    IsEmptyObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new IsEmptyObserver(o));
    };

    return IsEmptyObservable;
  }(ObservableBase);

  var IsEmptyObserver = function (__super__) {
    inherits(IsEmptyObserver, __super__);
    function IsEmptyObserver(o) {
      this._o = o;
      __super__.call(this);
    }

    IsEmptyObserver.prototype.next = function () {
      this._o.onNext(false);
      this._o.onCompleted();
    };
    IsEmptyObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    IsEmptyObserver.prototype.completed = function () {
      this._o.onNext(true);
      this._o.onCompleted();
    };

    return IsEmptyObserver;
  }(AbstractObserver);

  observableProto.isEmpty = function () {
    return new IsEmptyObservable(this);
  };

  var EveryObservable = function (__super__) {
    inherits(EveryObservable, __super__);
    function EveryObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    EveryObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new EveryObserver(o, this._fn, this.source));
    };

    return EveryObservable;
  }(ObservableBase);

  var EveryObserver = function (__super__) {
    inherits(EveryObserver, __super__);

    function EveryObserver(o, fn, s) {
      this._o = o;
      this._fn = fn;
      this._s = s;
      this._i = 0;
      __super__.call(this);
    }

    EveryObserver.prototype.next = function (x) {
      var result = tryCatch(this._fn)(x, this._i++, this._s);
      if (result === errorObj) {
        return this._o.onError(result.e);
      }
      if (!Boolean(result)) {
        this._o.onNext(false);
        this._o.onCompleted();
      }
    };
    EveryObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    EveryObserver.prototype.completed = function () {
      this._o.onNext(true);
      this._o.onCompleted();
    };

    return EveryObserver;
  }(AbstractObserver);

  observableProto.every = function (predicate, thisArg) {
    var fn = bindCallback(predicate, thisArg, 3);
    return new EveryObservable(this, fn);
  };

  var IncludesObservable = function (__super__) {
    inherits(IncludesObservable, __super__);
    function IncludesObservable(source, elem, idx) {
      var n = +idx || 0;
      Math.abs(n) === Infinity && (n = 0);

      this.source = source;
      this._elem = elem;
      this._n = n;
      __super__.call(this);
    }

    IncludesObservable.prototype.subscribeCore = function (o) {
      if (this._n < 0) {
        o.onNext(false);
        o.onCompleted();
        return disposableEmpty;
      }

      return this.source.subscribe(new IncludesObserver(o, this._elem, this._n));
    };

    return IncludesObservable;
  }(ObservableBase);

  var IncludesObserver = function (__super__) {
    inherits(IncludesObserver, __super__);
    function IncludesObserver(o, elem, n) {
      this._o = o;
      this._elem = elem;
      this._n = n;
      this._i = 0;
      __super__.call(this);
    }

    function comparer(a, b) {
      return a === 0 && b === 0 || a === b || isNaN(a) && isNaN(b);
    }

    IncludesObserver.prototype.next = function (x) {
      if (this._i++ >= this._n && comparer(x, this._elem)) {
        this._o.onNext(true);
        this._o.onCompleted();
      }
    };
    IncludesObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    IncludesObserver.prototype.completed = function () {
      this._o.onNext(false);this._o.onCompleted();
    };

    return IncludesObserver;
  }(AbstractObserver);

  observableProto.includes = function (searchElement, fromIndex) {
    return new IncludesObservable(this, searchElement, fromIndex);
  };

  var CountObservable = function (__super__) {
    inherits(CountObservable, __super__);
    function CountObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    CountObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new CountObserver(o, this._fn, this.source));
    };

    return CountObservable;
  }(ObservableBase);

  var CountObserver = function (__super__) {
    inherits(CountObserver, __super__);

    function CountObserver(o, fn, s) {
      this._o = o;
      this._fn = fn;
      this._s = s;
      this._i = 0;
      this._c = 0;
      __super__.call(this);
    }

    CountObserver.prototype.next = function (x) {
      if (this._fn) {
        var result = tryCatch(this._fn)(x, this._i++, this._s);
        if (result === errorObj) {
          return this._o.onError(result.e);
        }
        Boolean(result) && this._c++;
      } else {
        this._c++;
      }
    };
    CountObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    CountObserver.prototype.completed = function () {
      this._o.onNext(this._c);
      this._o.onCompleted();
    };

    return CountObserver;
  }(AbstractObserver);

  observableProto.count = function (predicate, thisArg) {
    var fn = bindCallback(predicate, thisArg, 3);
    return new CountObservable(this, fn);
  };

  var IndexOfObservable = function (__super__) {
    inherits(IndexOfObservable, __super__);
    function IndexOfObservable(source, e, n) {
      this.source = source;
      this._e = e;
      this._n = n;
      __super__.call(this);
    }

    IndexOfObservable.prototype.subscribeCore = function (o) {
      if (this._n < 0) {
        o.onNext(-1);
        o.onCompleted();
        return disposableEmpty;
      }

      return this.source.subscribe(new IndexOfObserver(o, this._e, this._n));
    };

    return IndexOfObservable;
  }(ObservableBase);

  var IndexOfObserver = function (__super__) {
    inherits(IndexOfObserver, __super__);
    function IndexOfObserver(o, e, n) {
      this._o = o;
      this._e = e;
      this._n = n;
      this._i = 0;
      __super__.call(this);
    }

    IndexOfObserver.prototype.next = function (x) {
      if (this._i >= this._n && x === this._e) {
        this._o.onNext(this._i);
        this._o.onCompleted();
      }
      this._i++;
    };
    IndexOfObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    IndexOfObserver.prototype.completed = function () {
      this._o.onNext(-1);this._o.onCompleted();
    };

    return IndexOfObserver;
  }(AbstractObserver);

  observableProto.indexOf = function (searchElement, fromIndex) {
    var n = +fromIndex || 0;
    Math.abs(n) === Infinity && (n = 0);
    return new IndexOfObservable(this, searchElement, n);
  };

  var SumObservable = function (__super__) {
    inherits(SumObservable, __super__);
    function SumObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    SumObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SumObserver(o, this._fn, this.source));
    };

    return SumObservable;
  }(ObservableBase);

  var SumObserver = function (__super__) {
    inherits(SumObserver, __super__);

    function SumObserver(o, fn, s) {
      this._o = o;
      this._fn = fn;
      this._s = s;
      this._i = 0;
      this._c = 0;
      __super__.call(this);
    }

    SumObserver.prototype.next = function (x) {
      if (this._fn) {
        var result = tryCatch(this._fn)(x, this._i++, this._s);
        if (result === errorObj) {
          return this._o.onError(result.e);
        }
        this._c += result;
      } else {
        this._c += x;
      }
    };
    SumObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SumObserver.prototype.completed = function () {
      this._o.onNext(this._c);
      this._o.onCompleted();
    };

    return SumObserver;
  }(AbstractObserver);

  observableProto.sum = function (keySelector, thisArg) {
    var fn = bindCallback(keySelector, thisArg, 3);
    return new SumObservable(this, fn);
  };

  observableProto.minBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return new ExtremaByObservable(this, keySelector, function (x, y) {
      return comparer(x, y) * -1;
    });
  };

  observableProto.min = function (comparer) {
    return this.minBy(identity, comparer).map(firstOnly);
  };

  observableProto.maxBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return new ExtremaByObservable(this, keySelector, comparer);
  };

  observableProto.max = function (comparer) {
    return this.maxBy(identity, comparer).map(firstOnly);
  };

  var AverageObservable = function (__super__) {
    inherits(AverageObservable, __super__);
    function AverageObservable(source, fn) {
      this.source = source;
      this._fn = fn;
      __super__.call(this);
    }

    AverageObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new AverageObserver(o, this._fn, this.source));
    };

    return AverageObservable;
  }(ObservableBase);

  var AverageObserver = function (__super__) {
    inherits(AverageObserver, __super__);
    function AverageObserver(o, fn, s) {
      this._o = o;
      this._fn = fn;
      this._s = s;
      this._c = 0;
      this._t = 0;
      __super__.call(this);
    }

    AverageObserver.prototype.next = function (x) {
      if (this._fn) {
        var r = tryCatch(this._fn)(x, this._c++, this._s);
        if (r === errorObj) {
          return this._o.onError(r.e);
        }
        this._t += r;
      } else {
        this._c++;
        this._t += x;
      }
    };
    AverageObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    AverageObserver.prototype.completed = function () {
      if (this._c === 0) {
        return this._o.onError(new EmptyError());
      }
      this._o.onNext(this._t / this._c);
      this._o.onCompleted();
    };

    return AverageObserver;
  }(AbstractObserver);

  observableProto.average = function (keySelector, thisArg) {
    var source = this,
        fn;
    if (isFunction(keySelector)) {
      fn = bindCallback(keySelector, thisArg, 3);
    }
    return new AverageObservable(source, fn);
  };

  observableProto.sequenceEqual = function (second, comparer) {
    var first = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var donel = false,
          doner = false,
          ql = [],
          qr = [];
      var subscription1 = first.subscribe(function (x) {
        if (qr.length > 0) {
          var v = qr.shift();
          var equal = tryCatch(comparer)(v, x);
          if (equal === errorObj) {
            return o.onError(equal.e);
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (doner) {
          o.onNext(false);
          o.onCompleted();
        } else {
          ql.push(x);
        }
      }, function (e) {
        o.onError(e);
      }, function () {
        donel = true;
        if (ql.length === 0) {
          if (qr.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (doner) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });

      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
      isPromise(second) && (second = observableFromPromise(second));
      var subscription2 = second.subscribe(function (x) {
        if (ql.length > 0) {
          var v = ql.shift();
          var equal = tryCatch(comparer)(v, x);
          if (equal === errorObj) {
            return o.onError(equal.e);
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (donel) {
          o.onNext(false);
          o.onCompleted();
        } else {
          qr.push(x);
        }
      }, function (e) {
        o.onError(e);
      }, function () {
        doner = true;
        if (qr.length === 0) {
          if (ql.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (donel) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });
      return new BinaryDisposable(subscription1, subscription2);
    }, first);
  };

  var ElementAtObservable = function (__super__) {
    inherits(ElementAtObservable, __super__);
    function ElementAtObservable(source, i, d) {
      this.source = source;
      this._i = i;
      this._d = d;
      __super__.call(this);
    }

    ElementAtObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new ElementAtObserver(o, this._i, this._d));
    };

    return ElementAtObservable;
  }(ObservableBase);

  var ElementAtObserver = function (__super__) {
    inherits(ElementAtObserver, __super__);

    function ElementAtObserver(o, i, d) {
      this._o = o;
      this._i = i;
      this._d = d;
      __super__.call(this);
    }

    ElementAtObserver.prototype.next = function (x) {
      if (this._i-- === 0) {
        this._o.onNext(x);
        this._o.onCompleted();
      }
    };
    ElementAtObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    ElementAtObserver.prototype.completed = function () {
      if (this._d === undefined) {
        this._o.onError(new ArgumentOutOfRangeError());
      } else {
        this._o.onNext(this._d);
        this._o.onCompleted();
      }
    };

    return ElementAtObserver;
  }(AbstractObserver);

  observableProto.elementAt = function (index, defaultValue) {
    if (index < 0) {
      throw new ArgumentOutOfRangeError();
    }
    return new ElementAtObservable(this, index, defaultValue);
  };

  var SingleObserver = function (__super__) {
    inherits(SingleObserver, __super__);
    function SingleObserver(o, obj, s) {
      this._o = o;
      this._obj = obj;
      this._s = s;
      this._i = 0;
      this._hv = false;
      this._v = null;
      __super__.call(this);
    }

    SingleObserver.prototype.next = function (x) {
      var shouldYield = false;
      if (this._obj.predicate) {
        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }
        Boolean(res) && (shouldYield = true);
      } else if (!this._obj.predicate) {
        shouldYield = true;
      }
      if (shouldYield) {
        if (this._hv) {
          return this._o.onError(new Error('Sequence contains more than one matching element'));
        }
        this._hv = true;
        this._v = x;
      }
    };
    SingleObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SingleObserver.prototype.completed = function () {
      if (this._hv) {
        this._o.onNext(this._v);
        this._o.onCompleted();
      } else if (this._obj.defaultValue === undefined) {
        this._o.onError(new EmptyError());
      } else {
        this._o.onNext(this._obj.defaultValue);
        this._o.onCompleted();
      }
    };

    return SingleObserver;
  }(AbstractObserver);

  observableProto.single = function (predicate, thisArg) {
    var obj = {},
        source = this;
    if (_typeof(arguments[0]) === 'object') {
      obj = arguments[0];
    } else {
      obj = {
        predicate: arguments[0],
        thisArg: arguments[1],
        defaultValue: arguments[2]
      };
    }
    if (isFunction(obj.predicate)) {
      var fn = obj.predicate;
      obj.predicate = bindCallback(fn, obj.thisArg, 3);
    }
    return new AnonymousObservable(function (o) {
      return source.subscribe(new SingleObserver(o, obj, source));
    }, source);
  };

  var FirstObservable = function (__super__) {
    inherits(FirstObservable, __super__);
    function FirstObservable(source, obj) {
      this.source = source;
      this._obj = obj;
      __super__.call(this);
    }

    FirstObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new FirstObserver(o, this._obj, this.source));
    };

    return FirstObservable;
  }(ObservableBase);

  var FirstObserver = function (__super__) {
    inherits(FirstObserver, __super__);
    function FirstObserver(o, obj, s) {
      this._o = o;
      this._obj = obj;
      this._s = s;
      this._i = 0;
      __super__.call(this);
    }

    FirstObserver.prototype.next = function (x) {
      if (this._obj.predicate) {
        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }
        if (Boolean(res)) {
          this._o.onNext(x);
          this._o.onCompleted();
        }
      } else if (!this._obj.predicate) {
        this._o.onNext(x);
        this._o.onCompleted();
      }
    };
    FirstObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    FirstObserver.prototype.completed = function () {
      if (this._obj.defaultValue === undefined) {
        this._o.onError(new EmptyError());
      } else {
        this._o.onNext(this._obj.defaultValue);
        this._o.onCompleted();
      }
    };

    return FirstObserver;
  }(AbstractObserver);

  observableProto.first = function () {
    var obj = {},
        source = this;
    if (_typeof(arguments[0]) === 'object') {
      obj = arguments[0];
    } else {
      obj = {
        predicate: arguments[0],
        thisArg: arguments[1],
        defaultValue: arguments[2]
      };
    }
    if (isFunction(obj.predicate)) {
      var fn = obj.predicate;
      obj.predicate = bindCallback(fn, obj.thisArg, 3);
    }
    return new FirstObservable(this, obj);
  };

  var LastObservable = function (__super__) {
    inherits(LastObservable, __super__);
    function LastObservable(source, obj) {
      this.source = source;
      this._obj = obj;
      __super__.call(this);
    }

    LastObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new LastObserver(o, this._obj, this.source));
    };

    return LastObservable;
  }(ObservableBase);

  var LastObserver = function (__super__) {
    inherits(LastObserver, __super__);
    function LastObserver(o, obj, s) {
      this._o = o;
      this._obj = obj;
      this._s = s;
      this._i = 0;
      this._hv = false;
      this._v = null;
      __super__.call(this);
    }

    LastObserver.prototype.next = function (x) {
      var shouldYield = false;
      if (this._obj.predicate) {
        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }
        Boolean(res) && (shouldYield = true);
      } else if (!this._obj.predicate) {
        shouldYield = true;
      }
      if (shouldYield) {
        this._hv = true;
        this._v = x;
      }
    };
    LastObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    LastObserver.prototype.completed = function () {
      if (this._hv) {
        this._o.onNext(this._v);
        this._o.onCompleted();
      } else if (this._obj.defaultValue === undefined) {
        this._o.onError(new EmptyError());
      } else {
        this._o.onNext(this._obj.defaultValue);
        this._o.onCompleted();
      }
    };

    return LastObserver;
  }(AbstractObserver);

  observableProto.last = function () {
    var obj = {},
        source = this;
    if (_typeof(arguments[0]) === 'object') {
      obj = arguments[0];
    } else {
      obj = {
        predicate: arguments[0],
        thisArg: arguments[1],
        defaultValue: arguments[2]
      };
    }
    if (isFunction(obj.predicate)) {
      var fn = obj.predicate;
      obj.predicate = bindCallback(fn, obj.thisArg, 3);
    }
    return new LastObservable(this, obj);
  };

  var FindValueObserver = function (__super__) {
    inherits(FindValueObserver, __super__);
    function FindValueObserver(observer, source, callback, yieldIndex) {
      this._o = observer;
      this._s = source;
      this._cb = callback;
      this._y = yieldIndex;
      this._i = 0;
      __super__.call(this);
    }

    FindValueObserver.prototype.next = function (x) {
      var shouldRun = tryCatch(this._cb)(x, this._i, this._s);
      if (shouldRun === errorObj) {
        return this._o.onError(shouldRun.e);
      }
      if (shouldRun) {
        this._o.onNext(this._y ? this._i : x);
        this._o.onCompleted();
      } else {
        this._i++;
      }
    };

    FindValueObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    FindValueObserver.prototype.completed = function () {
      this._y && this._o.onNext(-1);
      this._o.onCompleted();
    };

    return FindValueObserver;
  }(AbstractObserver);

  function findValue(source, predicate, thisArg, yieldIndex) {
    var callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      return source.subscribe(new FindValueObserver(o, source, callback, yieldIndex));
    }, source);
  }

  observableProto.find = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, false);
  };

  observableProto.findIndex = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, true);
  };

  var ToSetObservable = function (__super__) {
    inherits(ToSetObservable, __super__);
    function ToSetObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    ToSetObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new ToSetObserver(o));
    };

    return ToSetObservable;
  }(ObservableBase);

  var ToSetObserver = function (__super__) {
    inherits(ToSetObserver, __super__);
    function ToSetObserver(o) {
      this._o = o;
      this._s = new root.Set();
      __super__.call(this);
    }

    ToSetObserver.prototype.next = function (x) {
      this._s.add(x);
    };

    ToSetObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    ToSetObserver.prototype.completed = function () {
      this._o.onNext(this._s);
      this._o.onCompleted();
    };

    return ToSetObserver;
  }(AbstractObserver);

  observableProto.toSet = function () {
    if (typeof root.Set === 'undefined') {
      throw new TypeError();
    }
    return new ToSetObservable(this);
  };

  var ToMapObservable = function (__super__) {
    inherits(ToMapObservable, __super__);
    function ToMapObservable(source, k, e) {
      this.source = source;
      this._k = k;
      this._e = e;
      __super__.call(this);
    }

    ToMapObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new ToMapObserver(o, this._k, this._e));
    };

    return ToMapObservable;
  }(ObservableBase);

  var ToMapObserver = function (__super__) {
    inherits(ToMapObserver, __super__);
    function ToMapObserver(o, k, e) {
      this._o = o;
      this._k = k;
      this._e = e;
      this._m = new root.Map();
      __super__.call(this);
    }

    ToMapObserver.prototype.next = function (x) {
      var key = tryCatch(this._k)(x);
      if (key === errorObj) {
        return this._o.onError(key.e);
      }
      var elem = x;
      if (this._e) {
        elem = tryCatch(this._e)(x);
        if (elem === errorObj) {
          return this._o.onError(elem.e);
        }
      }

      this._m.set(key, elem);
    };

    ToMapObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    ToMapObserver.prototype.completed = function () {
      this._o.onNext(this._m);
      this._o.onCompleted();
    };

    return ToMapObserver;
  }(AbstractObserver);

  observableProto.toMap = function (keySelector, elementSelector) {
    if (typeof root.Map === 'undefined') {
      throw new TypeError();
    }
    return new ToMapObservable(this, keySelector, elementSelector);
  };

  var SliceObservable = function (__super__) {
    inherits(SliceObservable, __super__);
    function SliceObservable(source, b, e) {
      this.source = source;
      this._b = b;
      this._e = e;
      __super__.call(this);
    }

    SliceObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SliceObserver(o, this._b, this._e));
    };

    return SliceObservable;
  }(ObservableBase);

  var SliceObserver = function (__super__) {
    inherits(SliceObserver, __super__);

    function SliceObserver(o, b, e) {
      this._o = o;
      this._b = b;
      this._e = e;
      this._i = 0;
      __super__.call(this);
    }

    SliceObserver.prototype.next = function (x) {
      if (this._i >= this._b) {
        if (this._e === this._i) {
          this._o.onCompleted();
        } else {
          this._o.onNext(x);
        }
      }
      this._i++;
    };
    SliceObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SliceObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return SliceObserver;
  }(AbstractObserver);

  observableProto.slice = function (begin, end) {
    var start = begin || 0;
    if (start < 0) {
      throw new Rx.ArgumentOutOfRangeError();
    }
    if (typeof end === 'number' && end < start) {
      throw new Rx.ArgumentOutOfRangeError();
    }
    return new SliceObservable(this, start, end);
  };

  var LastIndexOfObservable = function (__super__) {
    inherits(LastIndexOfObservable, __super__);
    function LastIndexOfObservable(source, e, n) {
      this.source = source;
      this._e = e;
      this._n = n;
      __super__.call(this);
    }

    LastIndexOfObservable.prototype.subscribeCore = function (o) {
      if (this._n < 0) {
        o.onNext(-1);
        o.onCompleted();
        return disposableEmpty;
      }

      return this.source.subscribe(new LastIndexOfObserver(o, this._e, this._n));
    };

    return LastIndexOfObservable;
  }(ObservableBase);

  var LastIndexOfObserver = function (__super__) {
    inherits(LastIndexOfObserver, __super__);
    function LastIndexOfObserver(o, e, n) {
      this._o = o;
      this._e = e;
      this._n = n;
      this._v = 0;
      this._hv = false;
      this._i = 0;
      __super__.call(this);
    }

    LastIndexOfObserver.prototype.next = function (x) {
      if (this._i >= this._n && x === this._e) {
        this._hv = true;
        this._v = this._i;
      }
      this._i++;
    };
    LastIndexOfObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    LastIndexOfObserver.prototype.completed = function () {
      if (this._hv) {
        this._o.onNext(this._v);
      } else {
        this._o.onNext(-1);
      }
      this._o.onCompleted();
    };

    return LastIndexOfObserver;
  }(AbstractObserver);

  observableProto.lastIndexOf = function (searchElement, fromIndex) {
    var n = +fromIndex || 0;
    Math.abs(n) === Infinity && (n = 0);
    return new LastIndexOfObservable(this, searchElement, n);
  };

  Observable.wrap = function (fn) {
    function createObservable() {
      return Observable.spawn.call(this, fn.apply(this, arguments));
    }

    createObservable.__generatorFunction__ = fn;
    return createObservable;
  };

  var spawn = Observable.spawn = function () {
    var gen = arguments[0],
        self = this,
        args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }

    return new AnonymousObservable(function (o) {
      var g = new CompositeDisposable();

      if (isFunction(gen)) {
        gen = gen.apply(self, args);
      }
      if (!gen || !isFunction(gen.next)) {
        o.onNext(gen);
        return o.onCompleted();
      }

      function processGenerator(res) {
        var ret = tryCatch(gen.next).call(gen, res);
        if (ret === errorObj) {
          return o.onError(ret.e);
        }
        next(ret);
      }

      processGenerator();

      function onError(err) {
        var ret = tryCatch(gen.next).call(gen, err);
        if (ret === errorObj) {
          return o.onError(ret.e);
        }
        next(ret);
      }

      function next(ret) {
        if (ret.done) {
          o.onNext(ret.value);
          o.onCompleted();
          return;
        }
        var obs = toObservable.call(self, ret.value);
        var value = null;
        var hasValue = false;
        if (Observable.isObservable(obs)) {
          g.add(obs.subscribe(function (val) {
            hasValue = true;
            value = val;
          }, onError, function () {
            hasValue && processGenerator(value);
          }));
        } else {
          onError(new TypeError('type not supported'));
        }
      }

      return g;
    });
  };

  function toObservable(obj) {
    if (!obj) {
      return obj;
    }
    if (Observable.isObservable(obj)) {
      return obj;
    }
    if (isPromise(obj)) {
      return Observable.fromPromise(obj);
    }
    if (isGeneratorFunction(obj) || isGenerator(obj)) {
      return spawn.call(this, obj);
    }
    if (isFunction(obj)) {
      return thunkToObservable.call(this, obj);
    }
    if (isArrayLike(obj) || isIterable(obj)) {
      return arrayToObservable.call(this, obj);
    }
    if (isObject(obj)) {
      return objectToObservable.call(this, obj);
    }
    return obj;
  }

  function arrayToObservable(obj) {
    return Observable.from(obj).concatMap(function (o) {
      if (Observable.isObservable(o) || isObject(o)) {
        return toObservable.call(null, o);
      } else {
        return Rx.Observable.just(o);
      }
    }).toArray();
  }

  function objectToObservable(obj) {
    var results = new obj.constructor(),
        keys = Object.keys(obj),
        observables = [];
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      var observable = toObservable.call(this, obj[key]);

      if (observable && Observable.isObservable(observable)) {
        defer(observable, key);
      } else {
        results[key] = obj[key];
      }
    }

    return Observable.forkJoin.apply(Observable, observables).map(function () {
      return results;
    });

    function defer(observable, key) {
      results[key] = undefined;
      observables.push(observable.map(function (next) {
        results[key] = next;
      }));
    }
  }

  function thunkToObservable(fn) {
    var self = this;
    return new AnonymousObservable(function (o) {
      fn.call(self, function () {
        var err = arguments[0],
            res = arguments[1];
        if (err) {
          return o.onError(err);
        }
        if (arguments.length > 2) {
          var args = [];
          for (var i = 1, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
          }
          res = args;
        }
        o.onNext(res);
        o.onCompleted();
      });
    });
  }

  function isGenerator(obj) {
    return isFunction(obj.next) && isFunction(obj['throw']);
  }

  function isGeneratorFunction(obj) {
    var ctor = obj.constructor;
    if (!ctor) {
      return false;
    }
    if (ctor.name === 'GeneratorFunction' || ctor.displayName === 'GeneratorFunction') {
      return true;
    }
    return isGenerator(ctor.prototype);
  }

  function isObject(val) {
    return Object == val.constructor;
  }

  Observable.start = function (func, context, scheduler) {
    return observableToAsync(func, context, scheduler)();
  };

  var observableToAsync = Observable.toAsync = function (func, context, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return function () {
      var args = arguments,
          subject = new AsyncSubject();

      scheduler.schedule(null, function () {
        var result;
        try {
          result = func.apply(context, args);
        } catch (e) {
          subject.onError(e);
          return;
        }
        subject.onNext(result);
        subject.onCompleted();
      });
      return subject.asObservable();
    };
  };

  function createCbObservable(fn, ctx, selector, args) {
    var o = new AsyncSubject();

    args.push(createCbHandler(o, ctx, selector));
    fn.apply(ctx, args);

    return o.asObservable();
  }

  function createCbHandler(o, ctx, selector) {
    return function handler() {
      var len = arguments.length,
          results = new Array(len);
      for (var i = 0; i < len; i++) {
        results[i] = arguments[i];
      }

      if (isFunction(selector)) {
        results = tryCatch(selector).apply(ctx, results);
        if (results === errorObj) {
          return o.onError(results.e);
        }
        o.onNext(results);
      } else {
        if (results.length <= 1) {
          o.onNext(results[0]);
        } else {
          o.onNext(results);
        }
      }

      o.onCompleted();
    };
  }

  Observable.fromCallback = function (fn, ctx, selector) {
    return function () {
      typeof ctx === 'undefined' && (ctx = this);

      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      return createCbObservable(fn, ctx, selector, args);
    };
  };

  function createNodeObservable(fn, ctx, selector, args) {
    var o = new AsyncSubject();

    args.push(createNodeHandler(o, ctx, selector));
    fn.apply(ctx, args);

    return o.asObservable();
  }

  function createNodeHandler(o, ctx, selector) {
    return function handler() {
      var err = arguments[0];
      if (err) {
        return o.onError(err);
      }

      var len = arguments.length,
          results = [];
      for (var i = 1; i < len; i++) {
        results[i - 1] = arguments[i];
      }

      if (isFunction(selector)) {
        var results = tryCatch(selector).apply(ctx, results);
        if (results === errorObj) {
          return o.onError(results.e);
        }
        o.onNext(results);
      } else {
        if (results.length <= 1) {
          o.onNext(results[0]);
        } else {
          o.onNext(results);
        }
      }

      o.onCompleted();
    };
  }

  Observable.fromNodeCallback = function (fn, ctx, selector) {
    return function () {
      typeof ctx === 'undefined' && (ctx = this);
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      return createNodeObservable(fn, ctx, selector, args);
    };
  };

  function isNodeList(el) {
    if (root.StaticNodeList) {
      return el instanceof root.StaticNodeList || el instanceof root.NodeList;
    } else {
      return Object.prototype.toString.call(el) === '[object NodeList]';
    }
  }

  function ListenDisposable(e, n, fn) {
    this._e = e;
    this._n = n;
    this._fn = fn;
    this._e.addEventListener(this._n, this._fn, false);
    this.isDisposed = false;
  }
  ListenDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this._e.removeEventListener(this._n, this._fn, false);
      this.isDisposed = true;
    }
  };

  function createEventListener(el, eventName, handler) {
    var disposables = new CompositeDisposable();

    var elemToString = Object.prototype.toString.call(el);
    if (isNodeList(el) || elemToString === '[object HTMLCollection]') {
      for (var i = 0, len = el.length; i < len; i++) {
        disposables.add(createEventListener(el.item(i), eventName, handler));
      }
    } else if (el) {
      disposables.add(new ListenDisposable(el, eventName, handler));
    }

    return disposables;
  }

  Rx.config.useNativeEvents = false;

  var EventObservable = function (__super__) {
    inherits(EventObservable, __super__);
    function EventObservable(el, name, fn) {
      this._el = el;
      this._n = name;
      this._fn = fn;
      __super__.call(this);
    }

    function createHandler(o, fn) {
      return function handler() {
        var results = arguments[0];
        if (isFunction(fn)) {
          results = tryCatch(fn).apply(null, arguments);
          if (results === errorObj) {
            return o.onError(results.e);
          }
        }
        o.onNext(results);
      };
    }

    EventObservable.prototype.subscribeCore = function (o) {
      return createEventListener(this._el, this._n, createHandler(o, this._fn));
    };

    return EventObservable;
  }(ObservableBase);

  Observable.fromEvent = function (element, eventName, selector) {
    if (element.addListener) {
      return fromEventPattern(function (h) {
        element.addListener(eventName, h);
      }, function (h) {
        element.removeListener(eventName, h);
      }, selector);
    }

    if (!Rx.config.useNativeEvents) {
      if (typeof element.on === 'function' && typeof element.off === 'function') {
        return fromEventPattern(function (h) {
          element.on(eventName, h);
        }, function (h) {
          element.off(eventName, h);
        }, selector);
      }
    }

    return new EventObservable(element, eventName, selector).publish().refCount();
  };

  var EventPatternObservable = function (__super__) {
    inherits(EventPatternObservable, __super__);
    function EventPatternObservable(add, del, fn) {
      this._add = add;
      this._del = del;
      this._fn = fn;
      __super__.call(this);
    }

    function createHandler(o, fn) {
      return function handler() {
        var results = arguments[0];
        if (isFunction(fn)) {
          results = tryCatch(fn).apply(null, arguments);
          if (results === errorObj) {
            return o.onError(results.e);
          }
        }
        o.onNext(results);
      };
    }

    EventPatternObservable.prototype.subscribeCore = function (o) {
      var fn = createHandler(o, this._fn);
      var returnValue = this._add(fn);
      return new EventPatternDisposable(this._del, fn, returnValue);
    };

    function EventPatternDisposable(del, fn, ret) {
      this._del = del;
      this._fn = fn;
      this._ret = ret;
      this.isDisposed = false;
    }

    EventPatternDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        isFunction(this._del) && this._del(this._fn, this._ret);
        this.isDisposed = true;
      }
    };

    return EventPatternObservable;
  }(ObservableBase);

  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
    return new EventPatternObservable(addHandler, removeHandler, selector).publish().refCount();
  };

  Observable.startAsync = function (functionAsync) {
    var promise = tryCatch(functionAsync)();
    if (promise === errorObj) {
      return observableThrow(promise.e);
    }
    return observableFromPromise(promise);
  };

  var PausableObservable = function (__super__) {
    inherits(PausableObservable, __super__);
    function PausableObservable(source, pauser) {
      this.source = source;
      this.controller = new Subject();
      this.paused = true;

      if (pauser && pauser.subscribe) {
        this.pauser = this.controller.merge(pauser);
      } else {
        this.pauser = this.controller;
      }

      __super__.call(this);
    }

    PausableObservable.prototype._subscribe = function (o) {
      var conn = this.source.publish(),
          subscription = conn.subscribe(o),
          connection = disposableEmpty;

      var pausable = this.pauser.startWith(!this.paused).distinctUntilChanged().subscribe(function (b) {
        if (b) {
          connection = conn.connect();
        } else {
          connection.dispose();
          connection = disposableEmpty;
        }
      });

      return new NAryDisposable([subscription, connection, pausable]);
    };

    PausableObservable.prototype.pause = function () {
      this.paused = true;
      this.controller.onNext(false);
    };

    PausableObservable.prototype.resume = function () {
      this.paused = false;
      this.controller.onNext(true);
    };

    return PausableObservable;
  }(Observable);

  observableProto.pausable = function (pauser) {
    return new PausableObservable(this, pauser);
  };

  function combineLatestSource(source, subject, resultSelector) {
    return new AnonymousObservable(function (o) {
      var hasValue = [false, false],
          hasValueAll = false,
          isDone = false,
          values = new Array(2),
          err;

      function next(x, i) {
        values[i] = x;
        hasValue[i] = true;
        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
          if (err) {
            return o.onError(err);
          }
          var res = tryCatch(resultSelector).apply(null, values);
          if (res === errorObj) {
            return o.onError(res.e);
          }
          o.onNext(res);
        }
        isDone && values[1] && o.onCompleted();
      }

      return new BinaryDisposable(source.subscribe(function (x) {
        next(x, 0);
      }, function (e) {
        if (values[1]) {
          o.onError(e);
        } else {
          err = e;
        }
      }, function () {
        isDone = true;
        values[1] && o.onCompleted();
      }), subject.subscribe(function (x) {
        next(x, 1);
      }, function (e) {
        o.onError(e);
      }, function () {
        isDone = true;
        next(true, 1);
      }));
    }, source);
  }

  var PausableBufferedObservable = function (__super__) {
    inherits(PausableBufferedObservable, __super__);
    function PausableBufferedObservable(source, pauser) {
      this.source = source;
      this.controller = new Subject();
      this.paused = true;

      if (pauser && pauser.subscribe) {
        this.pauser = this.controller.merge(pauser);
      } else {
        this.pauser = this.controller;
      }

      __super__.call(this);
    }

    PausableBufferedObservable.prototype._subscribe = function (o) {
      var q = [],
          previousShouldFire;

      function drainQueue() {
        while (q.length > 0) {
          o.onNext(q.shift());
        }
      }

      var subscription = combineLatestSource(this.source, this.pauser.startWith(!this.paused).distinctUntilChanged(), function (data, shouldFire) {
        return { data: data, shouldFire: shouldFire };
      }).subscribe(function (results) {
        if (previousShouldFire !== undefined && results.shouldFire !== previousShouldFire) {
          previousShouldFire = results.shouldFire;

          if (results.shouldFire) {
            drainQueue();
          }
        } else {
          previousShouldFire = results.shouldFire;

          if (results.shouldFire) {
            o.onNext(results.data);
          } else {
            q.push(results.data);
          }
        }
      }, function (err) {
        drainQueue();
        o.onError(err);
      }, function () {
        drainQueue();
        o.onCompleted();
      });
      return subscription;
    };

    PausableBufferedObservable.prototype.pause = function () {
      this.paused = true;
      this.controller.onNext(false);
    };

    PausableBufferedObservable.prototype.resume = function () {
      this.paused = false;
      this.controller.onNext(true);
    };

    return PausableBufferedObservable;
  }(Observable);

  observableProto.pausableBuffered = function (pauser) {
    return new PausableBufferedObservable(this, pauser);
  };

  var ControlledObservable = function (__super__) {
    inherits(ControlledObservable, __super__);
    function ControlledObservable(source, enableQueue, scheduler) {
      __super__.call(this);
      this.subject = new ControlledSubject(enableQueue, scheduler);
      this.source = source.multicast(this.subject).refCount();
    }

    ControlledObservable.prototype._subscribe = function (o) {
      return this.source.subscribe(o);
    };

    ControlledObservable.prototype.request = function (numberOfItems) {
      return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
    };

    return ControlledObservable;
  }(Observable);

  var ControlledSubject = function (__super__) {
    inherits(ControlledSubject, __super__);
    function ControlledSubject(enableQueue, scheduler) {
      enableQueue == null && (enableQueue = true);

      __super__.call(this);
      this.subject = new Subject();
      this.enableQueue = enableQueue;
      this.queue = enableQueue ? [] : null;
      this.requestedCount = 0;
      this.requestedDisposable = null;
      this.error = null;
      this.hasFailed = false;
      this.hasCompleted = false;
      this.scheduler = scheduler || currentThreadScheduler;
    }

    addProperties(ControlledSubject.prototype, Observer, {
      _subscribe: function _subscribe(o) {
        return this.subject.subscribe(o);
      },
      onCompleted: function onCompleted() {
        this.hasCompleted = true;
        if (!this.enableQueue || this.queue.length === 0) {
          this.subject.onCompleted();
          this.disposeCurrentRequest();
        } else {
          this.queue.push(Notification.createOnCompleted());
        }
      },
      onError: function onError(error) {
        this.hasFailed = true;
        this.error = error;
        if (!this.enableQueue || this.queue.length === 0) {
          this.subject.onError(error);
          this.disposeCurrentRequest();
        } else {
          this.queue.push(Notification.createOnError(error));
        }
      },
      onNext: function onNext(value) {
        if (this.requestedCount <= 0) {
          this.enableQueue && this.queue.push(Notification.createOnNext(value));
        } else {
          this.requestedCount-- === 0 && this.disposeCurrentRequest();
          this.subject.onNext(value);
        }
      },
      _processRequest: function _processRequest(numberOfItems) {
        if (this.enableQueue) {
          while (this.queue.length > 0 && (numberOfItems > 0 || this.queue[0].kind !== 'N')) {
            var first = this.queue.shift();
            first.accept(this.subject);
            if (first.kind === 'N') {
              numberOfItems--;
            } else {
              this.disposeCurrentRequest();
              this.queue = [];
            }
          }
        }

        return numberOfItems;
      },
      request: function request(number) {
        this.disposeCurrentRequest();
        var self = this;

        this.requestedDisposable = this.scheduler.schedule(number, function (s, i) {
          var remaining = self._processRequest(i);
          var stopped = self.hasCompleted || self.hasFailed;
          if (!stopped && remaining > 0) {
            self.requestedCount = remaining;

            return disposableCreate(function () {
              self.requestedCount = 0;
            });
          }
        });

        return this.requestedDisposable;
      },
      disposeCurrentRequest: function disposeCurrentRequest() {
        if (this.requestedDisposable) {
          this.requestedDisposable.dispose();
          this.requestedDisposable = null;
        }
      }
    });

    return ControlledSubject;
  }(Observable);

  observableProto.controlled = function (enableQueue, scheduler) {

    if (enableQueue && isScheduler(enableQueue)) {
      scheduler = enableQueue;
      enableQueue = true;
    }

    if (enableQueue == null) {
      enableQueue = true;
    }
    return new ControlledObservable(this, enableQueue, scheduler);
  };

  var StopAndWaitObservable = function (__super__) {
    inherits(StopAndWaitObservable, __super__);
    function StopAndWaitObservable(source) {
      __super__.call(this);
      this.source = source;
    }

    function scheduleMethod(s, self) {
      return self.source.request(1);
    }

    StopAndWaitObservable.prototype._subscribe = function (o) {
      this.subscription = this.source.subscribe(new StopAndWaitObserver(o, this, this.subscription));
      return new BinaryDisposable(this.subscription, defaultScheduler.schedule(this, scheduleMethod));
    };

    var StopAndWaitObserver = function (__sub__) {
      inherits(StopAndWaitObserver, __sub__);
      function StopAndWaitObserver(observer, observable, cancel) {
        __sub__.call(this);
        this.observer = observer;
        this.observable = observable;
        this.cancel = cancel;
        this.scheduleDisposable = null;
      }

      StopAndWaitObserver.prototype.completed = function () {
        this.observer.onCompleted();
        this.dispose();
      };

      StopAndWaitObserver.prototype.error = function (error) {
        this.observer.onError(error);
        this.dispose();
      };

      function innerScheduleMethod(s, self) {
        return self.observable.source.request(1);
      }

      StopAndWaitObserver.prototype.next = function (value) {
        this.observer.onNext(value);
        this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod);
      };

      StopAndWaitObserver.dispose = function () {
        this.observer = null;
        if (this.cancel) {
          this.cancel.dispose();
          this.cancel = null;
        }
        if (this.scheduleDisposable) {
          this.scheduleDisposable.dispose();
          this.scheduleDisposable = null;
        }
        __sub__.prototype.dispose.call(this);
      };

      return StopAndWaitObserver;
    }(AbstractObserver);

    return StopAndWaitObservable;
  }(Observable);

  ControlledObservable.prototype.stopAndWait = function () {
    return new StopAndWaitObservable(this);
  };

  var WindowedObservable = function (__super__) {
    inherits(WindowedObservable, __super__);
    function WindowedObservable(source, windowSize) {
      __super__.call(this);
      this.source = source;
      this.windowSize = windowSize;
    }

    function scheduleMethod(s, self) {
      return self.source.request(self.windowSize);
    }

    WindowedObservable.prototype._subscribe = function (o) {
      this.subscription = this.source.subscribe(new WindowedObserver(o, this, this.subscription));
      return new BinaryDisposable(this.subscription, defaultScheduler.schedule(this, scheduleMethod));
    };

    var WindowedObserver = function (__sub__) {
      inherits(WindowedObserver, __sub__);
      function WindowedObserver(observer, observable, cancel) {
        this.observer = observer;
        this.observable = observable;
        this.cancel = cancel;
        this.received = 0;
        this.scheduleDisposable = null;
        __sub__.call(this);
      }

      WindowedObserver.prototype.completed = function () {
        this.observer.onCompleted();
        this.dispose();
      };

      WindowedObserver.prototype.error = function (error) {
        this.observer.onError(error);
        this.dispose();
      };

      function innerScheduleMethod(s, self) {
        return self.observable.source.request(self.observable.windowSize);
      }

      WindowedObserver.prototype.next = function (value) {
        this.observer.onNext(value);
        this.received = ++this.received % this.observable.windowSize;
        this.received === 0 && (this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod));
      };

      WindowedObserver.prototype.dispose = function () {
        this.observer = null;
        if (this.cancel) {
          this.cancel.dispose();
          this.cancel = null;
        }
        if (this.scheduleDisposable) {
          this.scheduleDisposable.dispose();
          this.scheduleDisposable = null;
        }
        __sub__.prototype.dispose.call(this);
      };

      return WindowedObserver;
    }(AbstractObserver);

    return WindowedObservable;
  }(Observable);

  ControlledObservable.prototype.windowed = function (windowSize) {
    return new WindowedObservable(this, windowSize);
  };

  observableProto.pipe = function (dest) {
    var source = this.pausableBuffered();

    function onDrain() {
      source.resume();
    }

    dest.addListener('drain', onDrain);

    source.subscribe(function (x) {
      !dest.write(x) && source.pause();
    }, function (err) {
      dest.emit('error', err);
    }, function () {
      !dest._isStdio && dest.end();
      dest.removeListener('drain', onDrain);
    });

    source.resume();

    return dest;
  };

  var MulticastObservable = function (__super__) {
    inherits(MulticastObservable, __super__);
    function MulticastObservable(source, fn1, fn2) {
      this.source = source;
      this._fn1 = fn1;
      this._fn2 = fn2;
      __super__.call(this);
    }

    MulticastObservable.prototype.subscribeCore = function (o) {
      var connectable = this.source.multicast(this._fn1());
      return new BinaryDisposable(this._fn2(connectable).subscribe(o), connectable.connect());
    };

    return MulticastObservable;
  }(ObservableBase);

  observableProto.multicast = function (subjectOrSubjectSelector, selector) {
    return isFunction(subjectOrSubjectSelector) ? new MulticastObservable(this, subjectOrSubjectSelector, selector) : new ConnectableObservable(this, subjectOrSubjectSelector);
  };

  observableProto.publish = function (selector) {
    return selector && isFunction(selector) ? this.multicast(function () {
      return new Subject();
    }, selector) : this.multicast(new Subject());
  };

  observableProto.share = function () {
    return this.publish().refCount();
  };

  observableProto.publishLast = function (selector) {
    return selector && isFunction(selector) ? this.multicast(function () {
      return new AsyncSubject();
    }, selector) : this.multicast(new AsyncSubject());
  };

  observableProto.publishValue = function (initialValueOrSelector, initialValue) {
    return arguments.length === 2 ? this.multicast(function () {
      return new BehaviorSubject(initialValue);
    }, initialValueOrSelector) : this.multicast(new BehaviorSubject(initialValueOrSelector));
  };

  observableProto.shareValue = function (initialValue) {
    return this.publishValue(initialValue).refCount();
  };

  observableProto.replay = function (selector, bufferSize, windowSize, scheduler) {
    return selector && isFunction(selector) ? this.multicast(function () {
      return new ReplaySubject(bufferSize, windowSize, scheduler);
    }, selector) : this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
  };

  observableProto.shareReplay = function (bufferSize, windowSize, scheduler) {
    return this.replay(null, bufferSize, windowSize, scheduler).refCount();
  };

  var InnerSubscription = function InnerSubscription(s, o) {
    this._s = s;
    this._o = o;
  };

  InnerSubscription.prototype.dispose = function () {
    if (!this._s.isDisposed && this._o !== null) {
      var idx = this._s.observers.indexOf(this._o);
      this._s.observers.splice(idx, 1);
      this._o = null;
    }
  };

  var RefCountObservable = function (__super__) {
    inherits(RefCountObservable, __super__);
    function RefCountObservable(source) {
      this.source = source;
      this._count = 0;
      this._connectableSubscription = null;
      __super__.call(this);
    }

    RefCountObservable.prototype.subscribeCore = function (o) {
      var subscription = this.source.subscribe(o);
      ++this._count === 1 && (this._connectableSubscription = this.source.connect());
      return new RefCountDisposable(this, subscription);
    };

    function RefCountDisposable(p, s) {
      this._p = p;
      this._s = s;
      this.isDisposed = false;
    }

    RefCountDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        this._s.dispose();
        --this._p._count === 0 && this._p._connectableSubscription.dispose();
      }
    };

    return RefCountObservable;
  }(ObservableBase);

  var ConnectableObservable = Rx.ConnectableObservable = function (__super__) {
    inherits(ConnectableObservable, __super__);
    function ConnectableObservable(source, subject) {
      this.source = source;
      this._connection = null;
      this._source = source.asObservable();
      this._subject = subject;
      __super__.call(this);
    }

    function ConnectDisposable(parent, subscription) {
      this._p = parent;
      this._s = subscription;
    }

    ConnectDisposable.prototype.dispose = function () {
      if (this._s) {
        this._s.dispose();
        this._s = null;
        this._p._connection = null;
      }
    };

    ConnectableObservable.prototype.connect = function () {
      if (!this._connection) {
        if (this._subject.isStopped) {
          return disposableEmpty;
        }
        var subscription = this._source.subscribe(this._subject);
        this._connection = new ConnectDisposable(this, subscription);
      }
      return this._connection;
    };

    ConnectableObservable.prototype._subscribe = function (o) {
      return this._subject.subscribe(o);
    };

    ConnectableObservable.prototype.refCount = function () {
      return new RefCountObservable(this);
    };

    return ConnectableObservable;
  }(Observable);

  observableProto.singleInstance = function () {
    var source = this,
        hasObservable = false,
        observable;

    function getObservable() {
      if (!hasObservable) {
        hasObservable = true;
        observable = source['finally'](function () {
          hasObservable = false;
        }).publish().refCount();
      }
      return observable;
    }

    return new AnonymousObservable(function (o) {
      return getObservable().subscribe(o);
    });
  };

  observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    var left = this;
    return new AnonymousObservable(function (o) {
      var group = new CompositeDisposable();
      var leftDone = false,
          rightDone = false;
      var leftId = 0,
          rightId = 0;
      var leftMap = new Map(),
          rightMap = new Map();
      var handleError = function handleError(e) {
        o.onError(e);
      };

      group.add(left.subscribe(function (value) {
        var id = leftId++,
            md = new SingleAssignmentDisposable();

        leftMap.set(id, value);
        group.add(md);

        var duration = tryCatch(leftDurationSelector)(value);
        if (duration === errorObj) {
          return o.onError(duration.e);
        }

        md.setDisposable(duration.take(1).subscribe(noop, handleError, function () {
          leftMap['delete'](id) && leftMap.size === 0 && leftDone && o.onCompleted();
          group.remove(md);
        }));

        rightMap.forEach(function (v) {
          var result = tryCatch(resultSelector)(value, v);
          if (result === errorObj) {
            return o.onError(result.e);
          }
          o.onNext(result);
        });
      }, handleError, function () {
        leftDone = true;
        (rightDone || leftMap.size === 0) && o.onCompleted();
      }));

      group.add(right.subscribe(function (value) {
        var id = rightId++,
            md = new SingleAssignmentDisposable();

        rightMap.set(id, value);
        group.add(md);

        var duration = tryCatch(rightDurationSelector)(value);
        if (duration === errorObj) {
          return o.onError(duration.e);
        }

        md.setDisposable(duration.take(1).subscribe(noop, handleError, function () {
          rightMap['delete'](id) && rightMap.size === 0 && rightDone && o.onCompleted();
          group.remove(md);
        }));

        leftMap.forEach(function (v) {
          var result = tryCatch(resultSelector)(v, value);
          if (result === errorObj) {
            return o.onError(result.e);
          }
          o.onNext(result);
        });
      }, handleError, function () {
        rightDone = true;
        (leftDone || rightMap.size === 0) && o.onCompleted();
      }));
      return group;
    }, left);
  };

  observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    var left = this;
    return new AnonymousObservable(function (o) {
      var group = new CompositeDisposable();
      var r = new RefCountDisposable(group);
      var leftMap = new Map(),
          rightMap = new Map();
      var leftId = 0,
          rightId = 0;
      var handleError = function handleError(e) {
        return function (v) {
          v.onError(e);
        };
      };

      function handleError(e) {};

      group.add(left.subscribe(function (value) {
        var s = new Subject();
        var id = leftId++;
        leftMap.set(id, s);

        var result = tryCatch(resultSelector)(value, addRef(s, r));
        if (result === errorObj) {
          leftMap.forEach(handleError(result.e));
          return o.onError(result.e);
        }
        o.onNext(result);

        rightMap.forEach(function (v) {
          s.onNext(v);
        });

        var md = new SingleAssignmentDisposable();
        group.add(md);

        var duration = tryCatch(leftDurationSelector)(value);
        if (duration === errorObj) {
          leftMap.forEach(handleError(duration.e));
          return o.onError(duration.e);
        }

        md.setDisposable(duration.take(1).subscribe(noop, function (e) {
          leftMap.forEach(handleError(e));
          o.onError(e);
        }, function () {
          leftMap['delete'](id) && s.onCompleted();
          group.remove(md);
        }));
      }, function (e) {
        leftMap.forEach(handleError(e));
        o.onError(e);
      }, function () {
        o.onCompleted();
      }));

      group.add(right.subscribe(function (value) {
        var id = rightId++;
        rightMap.set(id, value);

        var md = new SingleAssignmentDisposable();
        group.add(md);

        var duration = tryCatch(rightDurationSelector)(value);
        if (duration === errorObj) {
          leftMap.forEach(handleError(duration.e));
          return o.onError(duration.e);
        }

        md.setDisposable(duration.take(1).subscribe(noop, function (e) {
          leftMap.forEach(handleError(e));
          o.onError(e);
        }, function () {
          rightMap['delete'](id);
          group.remove(md);
        }));

        leftMap.forEach(function (v) {
          v.onNext(value);
        });
      }, function (e) {
        leftMap.forEach(handleError(e));
        o.onError(e);
      }));

      return r;
    }, left);
  };

  function toArray(x) {
    return x.toArray();
  }

  observableProto.buffer = function () {
    return this.window.apply(this, arguments).flatMap(toArray);
  };

  observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
      return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
    }
    return typeof windowOpeningsOrClosingSelector === 'function' ? observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) : observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
  };

  function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
    return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function (_, win) {
      return win;
    });
  }

  function observableWindowWithBoundaries(windowBoundaries) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var win = new Subject(),
          d = new CompositeDisposable(),
          r = new RefCountDisposable(d);

      observer.onNext(addRef(win, r));

      d.add(source.subscribe(function (x) {
        win.onNext(x);
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));

      d.add(windowBoundaries.subscribe(function (w) {
        win.onCompleted();
        win = new Subject();
        observer.onNext(addRef(win, r));
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      return r;
    }, source);
  }

  function observableWindowWithClosingSelector(windowClosingSelector) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var m = new SerialDisposable(),
          d = new CompositeDisposable(m),
          r = new RefCountDisposable(d),
          win = new Subject();
      observer.onNext(addRef(win, r));
      d.add(source.subscribe(function (x) {
        win.onNext(x);
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      function createWindowClose() {
        var windowClose;
        try {
          windowClose = windowClosingSelector();
        } catch (e) {
          observer.onError(e);
          return;
        }

        isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));

        var m1 = new SingleAssignmentDisposable();
        m.setDisposable(m1);
        m1.setDisposable(windowClose.take(1).subscribe(noop, function (err) {
          win.onError(err);
          observer.onError(err);
        }, function () {
          win.onCompleted();
          win = new Subject();
          observer.onNext(addRef(win, r));
          createWindowClose();
        }));
      }

      createWindowClose();
      return r;
    }, source);
  }

  var PairwiseObservable = function (__super__) {
    inherits(PairwiseObservable, __super__);
    function PairwiseObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    PairwiseObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new PairwiseObserver(o));
    };

    return PairwiseObservable;
  }(ObservableBase);

  var PairwiseObserver = function (__super__) {
    inherits(PairwiseObserver, __super__);
    function PairwiseObserver(o) {
      this._o = o;
      this._p = null;
      this._hp = false;
      __super__.call(this);
    }

    PairwiseObserver.prototype.next = function (x) {
      if (this._hp) {
        this._o.onNext([this._p, x]);
      } else {
        this._hp = true;
      }
      this._p = x;
    };
    PairwiseObserver.prototype.error = function (err) {
      this._o.onError(err);
    };
    PairwiseObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return PairwiseObserver;
  }(AbstractObserver);

  observableProto.pairwise = function () {
    return new PairwiseObservable(this);
  };

  observableProto.partition = function (predicate, thisArg) {
    var fn = bindCallback(predicate, thisArg, 3);
    return [this.filter(predicate, thisArg), this.filter(function (x, i, o) {
      return !fn(x, i, o);
    })];
  };

  var WhileEnumerable = function (__super__) {
    inherits(WhileEnumerable, __super__);
    function WhileEnumerable(c, s) {
      this.c = c;
      this.s = s;
    }
    WhileEnumerable.prototype[$iterator$] = function () {
      var self = this;
      return {
        next: function next() {
          return self.c() ? { done: false, value: self.s } : { done: true, value: void 0 };
        }
      };
    };
    return WhileEnumerable;
  }(Enumerable);

  function enumerableWhile(condition, source) {
    return new WhileEnumerable(condition, source);
  }

  observableProto.letBind = observableProto['let'] = function (func) {
    return func(this);
  };

  Observable['if'] = function (condition, thenSource, elseSourceOrScheduler) {
    return observableDefer(function () {
      elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());

      isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
      isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));

      typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
      return condition() ? thenSource : elseSourceOrScheduler;
    });
  };

  Observable['for'] = Observable.forIn = function (sources, resultSelector, thisArg) {
    return enumerableOf(sources, resultSelector, thisArg).concat();
  };

  var observableWhileDo = Observable['while'] = Observable.whileDo = function (condition, source) {
    isPromise(source) && (source = observableFromPromise(source));
    return enumerableWhile(condition, source).concat();
  };

  observableProto.doWhile = function (condition) {
    return observableConcat([this, observableWhileDo(condition, this)]);
  };

  Observable['case'] = function (selector, sources, defaultSourceOrScheduler) {
    return observableDefer(function () {
      isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
      defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());

      isScheduler(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));

      var result = sources[selector()];
      isPromise(result) && (result = observableFromPromise(result));

      return result || defaultSourceOrScheduler;
    });
  };

  var ExpandObservable = function (__super__) {
    inherits(ExpandObservable, __super__);
    function ExpandObservable(source, fn, scheduler) {
      this.source = source;
      this._fn = fn;
      this._scheduler = scheduler;
      __super__.call(this);
    }

    function scheduleRecursive(args, recurse) {
      var state = args[0],
          self = args[1];
      var work;
      if (state.q.length > 0) {
        work = state.q.shift();
      } else {
        state.isAcquired = false;
        return;
      }
      var m1 = new SingleAssignmentDisposable();
      state.d.add(m1);
      m1.setDisposable(work.subscribe(new ExpandObserver(state, self, m1)));
      recurse([state, self]);
    }

    ExpandObservable.prototype._ensureActive = function (state) {
      var isOwner = false;
      if (state.q.length > 0) {
        isOwner = !state.isAcquired;
        state.isAcquired = true;
      }
      isOwner && state.m.setDisposable(this._scheduler.scheduleRecursive([state, this], scheduleRecursive));
    };

    ExpandObservable.prototype.subscribeCore = function (o) {
      var m = new SerialDisposable(),
          d = new CompositeDisposable(m),
          state = {
        q: [],
        m: m,
        d: d,
        activeCount: 0,
        isAcquired: false,
        o: o
      };

      state.q.push(this.source);
      state.activeCount++;
      this._ensureActive(state);
      return d;
    };

    return ExpandObservable;
  }(ObservableBase);

  var ExpandObserver = function (__super__) {
    inherits(ExpandObserver, __super__);
    function ExpandObserver(state, parent, m1) {
      this._s = state;
      this._p = parent;
      this._m1 = m1;
      __super__.call(this);
    }

    ExpandObserver.prototype.next = function (x) {
      this._s.o.onNext(x);
      var result = tryCatch(this._p._fn)(x);
      if (result === errorObj) {
        return this._s.o.onError(result.e);
      }
      this._s.q.push(result);
      this._s.activeCount++;
      this._p._ensureActive(this._s);
    };

    ExpandObserver.prototype.error = function (e) {
      this._s.o.onError(e);
    };

    ExpandObserver.prototype.completed = function () {
      this._s.d.remove(this._m1);
      this._s.activeCount--;
      this._s.activeCount === 0 && this._s.o.onCompleted();
    };

    return ExpandObserver;
  }(AbstractObserver);

  observableProto.expand = function (selector, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new ExpandObservable(this, selector, scheduler);
  };

  function argumentsToArray() {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    return args;
  }

  var ForkJoinObservable = function (__super__) {
    inherits(ForkJoinObservable, __super__);
    function ForkJoinObservable(sources, cb) {
      this._sources = sources;
      this._cb = cb;
      __super__.call(this);
    }

    ForkJoinObservable.prototype.subscribeCore = function (o) {
      if (this._sources.length === 0) {
        o.onCompleted();
        return disposableEmpty;
      }

      var count = this._sources.length;
      var state = {
        finished: false,
        hasResults: new Array(count),
        hasCompleted: new Array(count),
        results: new Array(count)
      };

      var subscriptions = new CompositeDisposable();
      for (var i = 0, len = this._sources.length; i < len; i++) {
        var source = this._sources[i];
        isPromise(source) && (source = observableFromPromise(source));
        subscriptions.add(source.subscribe(new ForkJoinObserver(o, state, i, this._cb, subscriptions)));
      }

      return subscriptions;
    };

    return ForkJoinObservable;
  }(ObservableBase);

  var ForkJoinObserver = function (__super__) {
    inherits(ForkJoinObserver, __super__);
    function ForkJoinObserver(o, s, i, cb, subs) {
      this._o = o;
      this._s = s;
      this._i = i;
      this._cb = cb;
      this._subs = subs;
      __super__.call(this);
    }

    ForkJoinObserver.prototype.next = function (x) {
      if (!this._s.finished) {
        this._s.hasResults[this._i] = true;
        this._s.results[this._i] = x;
      }
    };

    ForkJoinObserver.prototype.error = function (e) {
      this._s.finished = true;
      this._o.onError(e);
      this._subs.dispose();
    };

    ForkJoinObserver.prototype.completed = function () {
      if (!this._s.finished) {
        if (!this._s.hasResults[this._i]) {
          return this._o.onCompleted();
        }
        this._s.hasCompleted[this._i] = true;
        for (var i = 0; i < this._s.results.length; i++) {
          if (!this._s.hasCompleted[i]) {
            return;
          }
        }
        this._s.finished = true;

        var res = tryCatch(this._cb).apply(null, this._s.results);
        if (res === errorObj) {
          return this._o.onError(res.e);
        }

        this._o.onNext(res);
        this._o.onCompleted();
      }
    };

    return ForkJoinObserver;
  }(AbstractObserver);

  Observable.forkJoin = function () {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
    Array.isArray(args[0]) && (args = args[0]);
    return new ForkJoinObservable(args, resultSelector);
  };

  observableProto.forkJoin = function () {
    var len = arguments.length,
        args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    if (Array.isArray(args[0])) {
      args[0].unshift(this);
    } else {
      args.unshift(this);
    }
    return Observable.forkJoin.apply(null, args);
  };

  observableProto.manySelect = observableProto.extend = function (selector, scheduler) {
    isScheduler(scheduler) || (scheduler = Rx.Scheduler.immediate);
    var source = this;
    return observableDefer(function () {
      var chain;

      return source.map(function (x) {
        var curr = new ChainObservable(x);

        chain && chain.onNext(x);
        chain = curr;

        return curr;
      }).tap(noop, function (e) {
        chain && chain.onError(e);
      }, function () {
        chain && chain.onCompleted();
      }).observeOn(scheduler).map(selector);
    }, source);
  };

  var ChainObservable = function (__super__) {
    inherits(ChainObservable, __super__);
    function ChainObservable(head) {
      __super__.call(this);
      this.head = head;
      this.tail = new AsyncSubject();
    }

    addProperties(ChainObservable.prototype, Observer, {
      _subscribe: function _subscribe(o) {
        var g = new CompositeDisposable();
        g.add(currentThreadScheduler.schedule(this, function (_, self) {
          o.onNext(self.head);
          g.add(self.tail.mergeAll().subscribe(o));
        }));

        return g;
      },
      onCompleted: function onCompleted() {
        this.onNext(Observable.empty());
      },
      onError: function onError(e) {
        this.onNext(Observable['throw'](e));
      },
      onNext: function onNext(v) {
        this.tail.onNext(v);
        this.tail.onCompleted();
      }
    });

    return ChainObservable;
  }(Observable);

  var Map = root.Map || function () {
    function Map() {
      this.size = 0;
      this._values = [];
      this._keys = [];
    }

    Map.prototype['delete'] = function (key) {
      var i = this._keys.indexOf(key);
      if (i === -1) {
        return false;
      }
      this._values.splice(i, 1);
      this._keys.splice(i, 1);
      this.size--;
      return true;
    };

    Map.prototype.get = function (key) {
      var i = this._keys.indexOf(key);
      return i === -1 ? undefined : this._values[i];
    };

    Map.prototype.set = function (key, value) {
      var i = this._keys.indexOf(key);
      if (i === -1) {
        this._keys.push(key);
        this._values.push(value);
        this.size++;
      } else {
        this._values[i] = value;
      }
      return this;
    };

    Map.prototype.forEach = function (cb, thisArg) {
      for (var i = 0; i < this.size; i++) {
        cb.call(thisArg, this._values[i], this._keys[i]);
      }
    };

    return Map;
  }();

  function Pattern(patterns) {
    this.patterns = patterns;
  }

  Pattern.prototype.and = function (other) {
    return new Pattern(this.patterns.concat(other));
  };

  Pattern.prototype.thenDo = function (selector) {
    return new Plan(this, selector);
  };

  function Plan(expression, selector) {
    this.expression = expression;
    this.selector = selector;
  }

  function handleOnError(o) {
    return function (e) {
      o.onError(e);
    };
  }
  function handleOnNext(self, observer) {
    return function onNext() {
      var result = tryCatch(self.selector).apply(self, arguments);
      if (result === errorObj) {
        return observer.onError(result.e);
      }
      observer.onNext(result);
    };
  }

  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
    var joinObservers = [],
        errHandler = handleOnError(observer);
    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], errHandler));
    }
    var activePlan = new ActivePlan(joinObservers, handleOnNext(this, observer), function () {
      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
        joinObservers[j].removeActivePlan(activePlan);
      }
      deactivate(activePlan);
    });
    for (i = 0, len = joinObservers.length; i < len; i++) {
      joinObservers[i].addActivePlan(activePlan);
    }
    return activePlan;
  };

  function planCreateObserver(externalSubscriptions, observable, onError) {
    var entry = externalSubscriptions.get(observable);
    if (!entry) {
      var observer = new JoinObserver(observable, onError);
      externalSubscriptions.set(observable, observer);
      return observer;
    }
    return entry;
  }

  function ActivePlan(joinObserverArray, onNext, onCompleted) {
    this.joinObserverArray = joinObserverArray;
    this.onNext = onNext;
    this.onCompleted = onCompleted;
    this.joinObservers = new Map();
    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
      var joinObserver = this.joinObserverArray[i];
      this.joinObservers.set(joinObserver, joinObserver);
    }
  }

  ActivePlan.prototype.dequeue = function () {
    this.joinObservers.forEach(function (v) {
      v.queue.shift();
    });
  };

  ActivePlan.prototype.match = function () {
    var i,
        len,
        hasValues = true;
    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
      if (this.joinObserverArray[i].queue.length === 0) {
        hasValues = false;
        break;
      }
    }
    if (hasValues) {
      var firstValues = [],
          isCompleted = false;
      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
        firstValues.push(this.joinObserverArray[i].queue[0]);
        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
      }
      if (isCompleted) {
        this.onCompleted();
      } else {
        this.dequeue();
        var values = [];
        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
          values.push(firstValues[i].value);
        }
        this.onNext.apply(this, values);
      }
    }
  };

  var JoinObserver = function (__super__) {
    inherits(JoinObserver, __super__);

    function JoinObserver(source, onError) {
      __super__.call(this);
      this.source = source;
      this.onError = onError;
      this.queue = [];
      this.activePlans = [];
      this.subscription = new SingleAssignmentDisposable();
      this.isDisposed = false;
    }

    var JoinObserverPrototype = JoinObserver.prototype;

    JoinObserverPrototype.next = function (notification) {
      if (!this.isDisposed) {
        if (notification.kind === 'E') {
          return this.onError(notification.error);
        }
        this.queue.push(notification);
        var activePlans = this.activePlans.slice(0);
        for (var i = 0, len = activePlans.length; i < len; i++) {
          activePlans[i].match();
        }
      }
    };

    JoinObserverPrototype.error = noop;
    JoinObserverPrototype.completed = noop;

    JoinObserverPrototype.addActivePlan = function (activePlan) {
      this.activePlans.push(activePlan);
    };

    JoinObserverPrototype.subscribe = function () {
      this.subscription.setDisposable(this.source.materialize().subscribe(this));
    };

    JoinObserverPrototype.removeActivePlan = function (activePlan) {
      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
      this.activePlans.length === 0 && this.dispose();
    };

    JoinObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      if (!this.isDisposed) {
        this.isDisposed = true;
        this.subscription.dispose();
      }
    };

    return JoinObserver;
  }(AbstractObserver);

  observableProto.and = function (right) {
    return new Pattern([this, right]);
  };

  observableProto.thenDo = function (selector) {
    return new Pattern([this]).thenDo(selector);
  };

  Observable.when = function () {
    var len = arguments.length,
        plans;
    if (Array.isArray(arguments[0])) {
      plans = arguments[0];
    } else {
      plans = new Array(len);
      for (var i = 0; i < len; i++) {
        plans[i] = arguments[i];
      }
    }
    return new AnonymousObservable(function (o) {
      var activePlans = [],
          externalSubscriptions = new Map();
      var outObserver = observerCreate(function (x) {
        o.onNext(x);
      }, function (err) {
        externalSubscriptions.forEach(function (v) {
          v.onError(err);
        });
        o.onError(err);
      }, function (x) {
        o.onCompleted();
      });
      try {
        for (var i = 0, len = plans.length; i < len; i++) {
          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
            var idx = activePlans.indexOf(activePlan);
            activePlans.splice(idx, 1);
            activePlans.length === 0 && o.onCompleted();
          }));
        }
      } catch (e) {
        return observableThrow(e).subscribe(o);
      }
      var group = new CompositeDisposable();
      externalSubscriptions.forEach(function (joinObserver) {
        joinObserver.subscribe();
        group.add(joinObserver);
      });

      return group;
    });
  };

  var TimerObservable = function (__super__) {
    inherits(TimerObservable, __super__);
    function TimerObservable(dt, s) {
      this._dt = dt;
      this._s = s;
      __super__.call(this);
    }

    TimerObservable.prototype.subscribeCore = function (o) {
      return this._s.scheduleFuture(o, this._dt, scheduleMethod);
    };

    function scheduleMethod(s, o) {
      o.onNext(0);
      o.onCompleted();
    }

    return TimerObservable;
  }(ObservableBase);

  function _observableTimer(dueTime, scheduler) {
    return new TimerObservable(dueTime, scheduler);
  }

  function observableTimerDateAndPeriod(dueTime, period, scheduler) {
    return new AnonymousObservable(function (observer) {
      var d = dueTime,
          p = normalizeTime(period);
      return scheduler.scheduleRecursiveFuture(0, d, function (count, self) {
        if (p > 0) {
          var now = scheduler.now();
          d = new Date(d.getTime() + p);
          d.getTime() <= now && (d = new Date(now + p));
        }
        observer.onNext(count);
        self(count + 1, new Date(d));
      });
    });
  }

  function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
    return dueTime === period ? new AnonymousObservable(function (observer) {
      return scheduler.schedulePeriodic(0, period, function (count) {
        observer.onNext(count);
        return count + 1;
      });
    }) : observableDefer(function () {
      return observableTimerDateAndPeriod(new Date(scheduler.now() + dueTime), period, scheduler);
    });
  }

  var observableinterval = Observable.interval = function (period, scheduler) {
    return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : defaultScheduler);
  };

  var observableTimer = Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
    var period;
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    if (periodOrScheduler != null && typeof periodOrScheduler === 'number') {
      period = periodOrScheduler;
    } else if (isScheduler(periodOrScheduler)) {
      scheduler = periodOrScheduler;
    }
    if ((dueTime instanceof Date || typeof dueTime === 'number') && period === undefined) {
      return _observableTimer(dueTime, scheduler);
    }
    if (dueTime instanceof Date && period !== undefined) {
      return observableTimerDateAndPeriod(dueTime, periodOrScheduler, scheduler);
    }
    return observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
  };

  function observableDelayRelative(source, dueTime, scheduler) {
    return new AnonymousObservable(function (o) {
      var active = false,
          cancelable = new SerialDisposable(),
          exception = null,
          q = [],
          running = false,
          subscription;
      subscription = source.materialize().timestamp(scheduler).subscribe(function (notification) {
        var d, shouldRun;
        if (notification.value.kind === 'E') {
          q = [];
          q.push(notification);
          exception = notification.value.error;
          shouldRun = !running;
        } else {
          q.push({ value: notification.value, timestamp: notification.timestamp + dueTime });
          shouldRun = !active;
          active = true;
        }
        if (shouldRun) {
          if (exception !== null) {
            o.onError(exception);
          } else {
            d = new SingleAssignmentDisposable();
            cancelable.setDisposable(d);
            d.setDisposable(scheduler.scheduleRecursiveFuture(null, dueTime, function (_, self) {
              var e, recurseDueTime, result, shouldRecurse;
              if (exception !== null) {
                return;
              }
              running = true;
              do {
                result = null;
                if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
                  result = q.shift().value;
                }
                if (result !== null) {
                  result.accept(o);
                }
              } while (result !== null);
              shouldRecurse = false;
              recurseDueTime = 0;
              if (q.length > 0) {
                shouldRecurse = true;
                recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
              } else {
                active = false;
              }
              e = exception;
              running = false;
              if (e !== null) {
                o.onError(e);
              } else if (shouldRecurse) {
                self(null, recurseDueTime);
              }
            }));
          }
        }
      });
      return new BinaryDisposable(subscription, cancelable);
    }, source);
  }

  function observableDelayAbsolute(source, dueTime, scheduler) {
    return observableDefer(function () {
      return observableDelayRelative(source, dueTime - scheduler.now(), scheduler);
    });
  }

  function delayWithSelector(source, subscriptionDelay, delayDurationSelector) {
    var subDelay, selector;
    if (isFunction(subscriptionDelay)) {
      selector = subscriptionDelay;
    } else {
      subDelay = subscriptionDelay;
      selector = delayDurationSelector;
    }
    return new AnonymousObservable(function (o) {
      var delays = new CompositeDisposable(),
          atEnd = false,
          subscription = new SerialDisposable();

      function start() {
        subscription.setDisposable(source.subscribe(function (x) {
          var delay = tryCatch(selector)(x);
          if (delay === errorObj) {
            return o.onError(delay.e);
          }
          var d = new SingleAssignmentDisposable();
          delays.add(d);
          d.setDisposable(delay.subscribe(function () {
            o.onNext(x);
            delays.remove(d);
            done();
          }, function (e) {
            o.onError(e);
          }, function () {
            o.onNext(x);
            delays.remove(d);
            done();
          }));
        }, function (e) {
          o.onError(e);
        }, function () {
          atEnd = true;
          subscription.dispose();
          done();
        }));
      }

      function done() {
        atEnd && delays.length === 0 && o.onCompleted();
      }

      if (!subDelay) {
        start();
      } else {
        subscription.setDisposable(subDelay.subscribe(start, function (e) {
          o.onError(e);
        }, start));
      }

      return new BinaryDisposable(subscription, delays);
    }, source);
  }

  observableProto.delay = function () {
    var firstArg = arguments[0];
    if (typeof firstArg === 'number' || firstArg instanceof Date) {
      var dueTime = firstArg,
          scheduler = arguments[1];
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return dueTime instanceof Date ? observableDelayAbsolute(this, dueTime, scheduler) : observableDelayRelative(this, dueTime, scheduler);
    } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
      return delayWithSelector(this, firstArg, arguments[1]);
    } else {
      throw new Error('Invalid arguments');
    }
  };

  var DebounceObservable = function (__super__) {
    inherits(DebounceObservable, __super__);
    function DebounceObservable(source, dt, s) {
      isScheduler(s) || (s = defaultScheduler);
      this.source = source;
      this._dt = dt;
      this._s = s;
      __super__.call(this);
    }

    DebounceObservable.prototype.subscribeCore = function (o) {
      var cancelable = new SerialDisposable();
      return new BinaryDisposable(this.source.subscribe(new DebounceObserver(o, this._dt, this._s, cancelable)), cancelable);
    };

    return DebounceObservable;
  }(ObservableBase);

  var DebounceObserver = function (__super__) {
    inherits(DebounceObserver, __super__);
    function DebounceObserver(observer, dueTime, scheduler, cancelable) {
      this._o = observer;
      this._d = dueTime;
      this._scheduler = scheduler;
      this._c = cancelable;
      this._v = null;
      this._hv = false;
      this._id = 0;
      __super__.call(this);
    }

    function scheduleFuture(s, state) {
      state.self._hv && state.self._id === state.currentId && state.self._o.onNext(state.x);
      state.self._hv = false;
    }

    DebounceObserver.prototype.next = function (x) {
      this._hv = true;
      this._v = x;
      var currentId = ++this._id,
          d = new SingleAssignmentDisposable();
      this._c.setDisposable(d);
      d.setDisposable(this._scheduler.scheduleFuture(this, this._d, function (_, self) {
        self._hv && self._id === currentId && self._o.onNext(x);
        self._hv = false;
      }));
    };

    DebounceObserver.prototype.error = function (e) {
      this._c.dispose();
      this._o.onError(e);
      this._hv = false;
      this._id++;
    };

    DebounceObserver.prototype.completed = function () {
      this._c.dispose();
      this._hv && this._o.onNext(this._v);
      this._o.onCompleted();
      this._hv = false;
      this._id++;
    };

    return DebounceObserver;
  }(AbstractObserver);

  function debounceWithSelector(source, durationSelector) {
    return new AnonymousObservable(function (o) {
      var value,
          hasValue = false,
          cancelable = new SerialDisposable(),
          id = 0;
      var subscription = source.subscribe(function (x) {
        var throttle = tryCatch(durationSelector)(x);
        if (throttle === errorObj) {
          return o.onError(throttle.e);
        }

        isPromise(throttle) && (throttle = observableFromPromise(throttle));

        hasValue = true;
        value = x;
        id++;
        var currentid = id,
            d = new SingleAssignmentDisposable();
        cancelable.setDisposable(d);
        d.setDisposable(throttle.subscribe(function () {
          hasValue && id === currentid && o.onNext(value);
          hasValue = false;
          d.dispose();
        }, function (e) {
          o.onError(e);
        }, function () {
          hasValue && id === currentid && o.onNext(value);
          hasValue = false;
          d.dispose();
        }));
      }, function (e) {
        cancelable.dispose();
        o.onError(e);
        hasValue = false;
        id++;
      }, function () {
        cancelable.dispose();
        hasValue && o.onNext(value);
        o.onCompleted();
        hasValue = false;
        id++;
      });
      return new BinaryDisposable(subscription, cancelable);
    }, source);
  }

  observableProto.debounce = function () {
    if (isFunction(arguments[0])) {
      return debounceWithSelector(this, arguments[0]);
    } else if (typeof arguments[0] === 'number') {
      return new DebounceObservable(this, arguments[0], arguments[1]);
    } else {
      throw new Error('Invalid arguments');
    }
  };

  observableProto.windowWithTime = observableProto.windowTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
    var source = this,
        timeShift;
    timeShiftOrScheduler == null && (timeShift = timeSpan);
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    if (typeof timeShiftOrScheduler === 'number') {
      timeShift = timeShiftOrScheduler;
    } else if (isScheduler(timeShiftOrScheduler)) {
      timeShift = timeSpan;
      scheduler = timeShiftOrScheduler;
    }
    return new AnonymousObservable(function (observer) {
      var groupDisposable,
          nextShift = timeShift,
          nextSpan = timeSpan,
          q = [],
          refCountDisposable,
          timerD = new SerialDisposable(),
          totalTime = 0;
      groupDisposable = new CompositeDisposable(timerD), refCountDisposable = new RefCountDisposable(groupDisposable);

      function createTimer() {
        var m = new SingleAssignmentDisposable(),
            isSpan = false,
            isShift = false;
        timerD.setDisposable(m);
        if (nextSpan === nextShift) {
          isSpan = true;
          isShift = true;
        } else if (nextSpan < nextShift) {
          isSpan = true;
        } else {
          isShift = true;
        }
        var newTotalTime = isSpan ? nextSpan : nextShift,
            ts = newTotalTime - totalTime;
        totalTime = newTotalTime;
        if (isSpan) {
          nextSpan += timeShift;
        }
        if (isShift) {
          nextShift += timeShift;
        }
        m.setDisposable(scheduler.scheduleFuture(null, ts, function () {
          if (isShift) {
            var s = new Subject();
            q.push(s);
            observer.onNext(addRef(s, refCountDisposable));
          }
          isSpan && q.shift().onCompleted();
          createTimer();
        }));
      };
      q.push(new Subject());
      observer.onNext(addRef(q[0], refCountDisposable));
      createTimer();
      groupDisposable.add(source.subscribe(function (x) {
        for (var i = 0, len = q.length; i < len; i++) {
          q[i].onNext(x);
        }
      }, function (e) {
        for (var i = 0, len = q.length; i < len; i++) {
          q[i].onError(e);
        }
        observer.onError(e);
      }, function () {
        for (var i = 0, len = q.length; i < len; i++) {
          q[i].onCompleted();
        }
        observer.onCompleted();
      }));
      return refCountDisposable;
    }, source);
  };

  observableProto.windowWithTimeOrCount = observableProto.windowTimeOrCount = function (timeSpan, count, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new AnonymousObservable(function (observer) {
      var timerD = new SerialDisposable(),
          groupDisposable = new CompositeDisposable(timerD),
          refCountDisposable = new RefCountDisposable(groupDisposable),
          n = 0,
          windowId = 0,
          s = new Subject();

      function createTimer(id) {
        var m = new SingleAssignmentDisposable();
        timerD.setDisposable(m);
        m.setDisposable(scheduler.scheduleFuture(null, timeSpan, function () {
          if (id !== windowId) {
            return;
          }
          n = 0;
          var newId = ++windowId;
          s.onCompleted();
          s = new Subject();
          observer.onNext(addRef(s, refCountDisposable));
          createTimer(newId);
        }));
      }

      observer.onNext(addRef(s, refCountDisposable));
      createTimer(0);

      groupDisposable.add(source.subscribe(function (x) {
        var newId = 0,
            newWindow = false;
        s.onNext(x);
        if (++n === count) {
          newWindow = true;
          n = 0;
          newId = ++windowId;
          s.onCompleted();
          s = new Subject();
          observer.onNext(addRef(s, refCountDisposable));
        }
        newWindow && createTimer(newId);
      }, function (e) {
        s.onError(e);
        observer.onError(e);
      }, function () {
        s.onCompleted();
        observer.onCompleted();
      }));
      return refCountDisposable;
    }, source);
  };

  function toArray(x) {
    return x.toArray();
  }

  observableProto.bufferWithTime = observableProto.bufferTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
    return this.windowWithTime(timeSpan, timeShiftOrScheduler, scheduler).flatMap(toArray);
  };

  function toArray(x) {
    return x.toArray();
  }

  observableProto.bufferWithTimeOrCount = observableProto.bufferTimeOrCount = function (timeSpan, count, scheduler) {
    return this.windowWithTimeOrCount(timeSpan, count, scheduler).flatMap(toArray);
  };

  var TimeIntervalObservable = function (__super__) {
    inherits(TimeIntervalObservable, __super__);
    function TimeIntervalObservable(source, s) {
      this.source = source;
      this._s = s;
      __super__.call(this);
    }

    TimeIntervalObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new TimeIntervalObserver(o, this._s));
    };

    return TimeIntervalObservable;
  }(ObservableBase);

  var TimeIntervalObserver = function (__super__) {
    inherits(TimeIntervalObserver, __super__);

    function TimeIntervalObserver(o, s) {
      this._o = o;
      this._s = s;
      this._l = s.now();
      __super__.call(this);
    }

    TimeIntervalObserver.prototype.next = function (x) {
      var now = this._s.now(),
          span = now - this._l;
      this._l = now;
      this._o.onNext({ value: x, interval: span });
    };
    TimeIntervalObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    TimeIntervalObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return TimeIntervalObserver;
  }(AbstractObserver);

  observableProto.timeInterval = function (scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new TimeIntervalObservable(this, scheduler);
  };

  var TimestampObservable = function (__super__) {
    inherits(TimestampObservable, __super__);
    function TimestampObservable(source, s) {
      this.source = source;
      this._s = s;
      __super__.call(this);
    }

    TimestampObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new TimestampObserver(o, this._s));
    };

    return TimestampObservable;
  }(ObservableBase);

  var TimestampObserver = function (__super__) {
    inherits(TimestampObserver, __super__);
    function TimestampObserver(o, s) {
      this._o = o;
      this._s = s;
      __super__.call(this);
    }

    TimestampObserver.prototype.next = function (x) {
      this._o.onNext({ value: x, timestamp: this._s.now() });
    };

    TimestampObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    TimestampObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return TimestampObserver;
  }(AbstractObserver);

  observableProto.timestamp = function (scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new TimestampObservable(this, scheduler);
  };

  var SampleObservable = function (__super__) {
    inherits(SampleObservable, __super__);
    function SampleObservable(source, sampler) {
      this.source = source;
      this._sampler = sampler;
      __super__.call(this);
    }

    SampleObservable.prototype.subscribeCore = function (o) {
      var state = {
        o: o,
        atEnd: false,
        value: null,
        hasValue: false,
        sourceSubscription: new SingleAssignmentDisposable()
      };

      state.sourceSubscription.setDisposable(this.source.subscribe(new SampleSourceObserver(state)));
      return new BinaryDisposable(state.sourceSubscription, this._sampler.subscribe(new SamplerObserver(state)));
    };

    return SampleObservable;
  }(ObservableBase);

  var SamplerObserver = function (__super__) {
    inherits(SamplerObserver, __super__);
    function SamplerObserver(s) {
      this._s = s;
      __super__.call(this);
    }

    SamplerObserver.prototype._handleMessage = function () {
      if (this._s.hasValue) {
        this._s.hasValue = false;
        this._s.o.onNext(this._s.value);
      }
      this._s.atEnd && this._s.o.onCompleted();
    };

    SamplerObserver.prototype.next = function () {
      this._handleMessage();
    };
    SamplerObserver.prototype.error = function (e) {
      this._s.onError(e);
    };
    SamplerObserver.prototype.completed = function () {
      this._handleMessage();
    };

    return SamplerObserver;
  }(AbstractObserver);

  var SampleSourceObserver = function (__super__) {
    inherits(SampleSourceObserver, __super__);
    function SampleSourceObserver(s) {
      this._s = s;
      __super__.call(this);
    }

    SampleSourceObserver.prototype.next = function (x) {
      this._s.hasValue = true;
      this._s.value = x;
    };
    SampleSourceObserver.prototype.error = function (e) {
      this._s.o.onError(e);
    };
    SampleSourceObserver.prototype.completed = function () {
      this._s.atEnd = true;
      this._s.sourceSubscription.dispose();
    };

    return SampleSourceObserver;
  }(AbstractObserver);

  observableProto.sample = function (intervalOrSampler, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return typeof intervalOrSampler === 'number' ? new SampleObservable(this, observableinterval(intervalOrSampler, scheduler)) : new SampleObservable(this, intervalOrSampler);
  };

  var TimeoutError = Rx.TimeoutError = function (message) {
    this.message = message || 'Timeout has occurred';
    this.name = 'TimeoutError';
    Error.call(this);
  };
  TimeoutError.prototype = Object.create(Error.prototype);

  function timeoutWithSelector(source, firstTimeout, timeoutDurationSelector, other) {
    if (isFunction(firstTimeout)) {
      other = timeoutDurationSelector;
      timeoutDurationSelector = firstTimeout;
      firstTimeout = observableNever();
    }
    Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
    return new AnonymousObservable(function (o) {
      var subscription = new SerialDisposable(),
          timer = new SerialDisposable(),
          original = new SingleAssignmentDisposable();

      subscription.setDisposable(original);

      var id = 0,
          switched = false;

      function setTimer(timeout) {
        var myId = id,
            d = new SingleAssignmentDisposable();

        function timerWins() {
          switched = myId === id;
          return switched;
        }

        timer.setDisposable(d);
        d.setDisposable(timeout.subscribe(function () {
          timerWins() && subscription.setDisposable(other.subscribe(o));
          d.dispose();
        }, function (e) {
          timerWins() && o.onError(e);
        }, function () {
          timerWins() && subscription.setDisposable(other.subscribe(o));
        }));
      };

      setTimer(firstTimeout);

      function oWins() {
        var res = !switched;
        if (res) {
          id++;
        }
        return res;
      }

      original.setDisposable(source.subscribe(function (x) {
        if (oWins()) {
          o.onNext(x);
          var timeout = tryCatch(timeoutDurationSelector)(x);
          if (timeout === errorObj) {
            return o.onError(timeout.e);
          }
          setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
        }
      }, function (e) {
        oWins() && o.onError(e);
      }, function () {
        oWins() && o.onCompleted();
      }));
      return new BinaryDisposable(subscription, timer);
    }, source);
  }

  function timeout(source, dueTime, other, scheduler) {
    if (isScheduler(other)) {
      scheduler = other;
      other = observableThrow(new TimeoutError());
    }
    if (other instanceof Error) {
      other = observableThrow(other);
    }
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
    return new AnonymousObservable(function (o) {
      var id = 0,
          original = new SingleAssignmentDisposable(),
          subscription = new SerialDisposable(),
          switched = false,
          timer = new SerialDisposable();

      subscription.setDisposable(original);

      function createTimer() {
        var myId = id;
        timer.setDisposable(scheduler.scheduleFuture(null, dueTime, function () {
          switched = id === myId;
          if (switched) {
            isPromise(other) && (other = observableFromPromise(other));
            subscription.setDisposable(other.subscribe(o));
          }
        }));
      }

      createTimer();

      original.setDisposable(source.subscribe(function (x) {
        if (!switched) {
          id++;
          o.onNext(x);
          createTimer();
        }
      }, function (e) {
        if (!switched) {
          id++;
          o.onError(e);
        }
      }, function () {
        if (!switched) {
          id++;
          o.onCompleted();
        }
      }));
      return new BinaryDisposable(subscription, timer);
    }, source);
  }

  observableProto.timeout = function () {
    var firstArg = arguments[0];
    if (firstArg instanceof Date || typeof firstArg === 'number') {
      return timeout(this, firstArg, arguments[1], arguments[2]);
    } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
      return timeoutWithSelector(this, firstArg, arguments[1], arguments[2]);
    } else {
      throw new Error('Invalid arguments');
    }
  };

  var GenerateAbsoluteObservable = function (__super__) {
    inherits(GenerateAbsoluteObservable, __super__);
    function GenerateAbsoluteObservable(state, cndFn, itrFn, resFn, timeFn, s) {
      this._state = state;
      this._cndFn = cndFn;
      this._itrFn = itrFn;
      this._resFn = resFn;
      this._timeFn = timeFn;
      this._s = s;
      __super__.call(this);
    }

    function scheduleRecursive(state, recurse) {
      state.hasResult && state.o.onNext(state.result);

      if (state.first) {
        state.first = false;
      } else {
        state.newState = tryCatch(state.self._itrFn)(state.newState);
        if (state.newState === errorObj) {
          return state.o.onError(state.newState.e);
        }
      }
      state.hasResult = tryCatch(state.self._cndFn)(state.newState);
      if (state.hasResult === errorObj) {
        return state.o.onError(state.hasResult.e);
      }
      if (state.hasResult) {
        state.result = tryCatch(state.self._resFn)(state.newState);
        if (state.result === errorObj) {
          return state.o.onError(state.result.e);
        }
        var time = tryCatch(state.self._timeFn)(state.newState);
        if (time === errorObj) {
          return state.o.onError(time.e);
        }
        recurse(state, time);
      } else {
        state.o.onCompleted();
      }
    }

    GenerateAbsoluteObservable.prototype.subscribeCore = function (o) {
      var state = {
        o: o,
        self: this,
        newState: this._state,
        first: true,
        hasResult: false
      };
      return this._s.scheduleRecursiveFuture(state, new Date(this._s.now()), scheduleRecursive);
    };

    return GenerateAbsoluteObservable;
  }(ObservableBase);

  Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new GenerateAbsoluteObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
  };

  var GenerateRelativeObservable = function (__super__) {
    inherits(GenerateRelativeObservable, __super__);
    function GenerateRelativeObservable(state, cndFn, itrFn, resFn, timeFn, s) {
      this._state = state;
      this._cndFn = cndFn;
      this._itrFn = itrFn;
      this._resFn = resFn;
      this._timeFn = timeFn;
      this._s = s;
      __super__.call(this);
    }

    function scheduleRecursive(state, recurse) {
      state.hasResult && state.o.onNext(state.result);

      if (state.first) {
        state.first = false;
      } else {
        state.newState = tryCatch(state.self._itrFn)(state.newState);
        if (state.newState === errorObj) {
          return state.o.onError(state.newState.e);
        }
      }

      state.hasResult = tryCatch(state.self._cndFn)(state.newState);
      if (state.hasResult === errorObj) {
        return state.o.onError(state.hasResult.e);
      }
      if (state.hasResult) {
        state.result = tryCatch(state.self._resFn)(state.newState);
        if (state.result === errorObj) {
          return state.o.onError(state.result.e);
        }
        var time = tryCatch(state.self._timeFn)(state.newState);
        if (time === errorObj) {
          return state.o.onError(time.e);
        }
        recurse(state, time);
      } else {
        state.o.onCompleted();
      }
    }

    GenerateRelativeObservable.prototype.subscribeCore = function (o) {
      var state = {
        o: o,
        self: this,
        newState: this._state,
        first: true,
        hasResult: false
      };
      return this._s.scheduleRecursiveFuture(state, 0, scheduleRecursive);
    };

    return GenerateRelativeObservable;
  }(ObservableBase);

  Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new GenerateRelativeObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
  };

  var DelaySubscription = function (__super__) {
    inherits(DelaySubscription, __super__);
    function DelaySubscription(source, dt, s) {
      this.source = source;
      this._dt = dt;
      this._s = s;
      __super__.call(this);
    }

    DelaySubscription.prototype.subscribeCore = function (o) {
      var d = new SerialDisposable();

      d.setDisposable(this._s.scheduleFuture([this.source, o, d], this._dt, scheduleMethod));

      return d;
    };

    function scheduleMethod(s, state) {
      var source = state[0],
          o = state[1],
          d = state[2];
      d.setDisposable(source.subscribe(o));
    }

    return DelaySubscription;
  }(ObservableBase);

  observableProto.delaySubscription = function (dueTime, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new DelaySubscription(this, dueTime, scheduler);
  };

  var SkipLastWithTimeObservable = function (__super__) {
    inherits(SkipLastWithTimeObservable, __super__);
    function SkipLastWithTimeObservable(source, d, s) {
      this.source = source;
      this._d = d;
      this._s = s;
      __super__.call(this);
    }

    SkipLastWithTimeObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new SkipLastWithTimeObserver(o, this));
    };

    return SkipLastWithTimeObservable;
  }(ObservableBase);

  var SkipLastWithTimeObserver = function (__super__) {
    inherits(SkipLastWithTimeObserver, __super__);

    function SkipLastWithTimeObserver(o, p) {
      this._o = o;
      this._s = p._s;
      this._d = p._d;
      this._q = [];
      __super__.call(this);
    }

    SkipLastWithTimeObserver.prototype.next = function (x) {
      var now = this._s.now();
      this._q.push({ interval: now, value: x });
      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
        this._o.onNext(this._q.shift().value);
      }
    };
    SkipLastWithTimeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SkipLastWithTimeObserver.prototype.completed = function () {
      var now = this._s.now();
      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
        this._o.onNext(this._q.shift().value);
      }
      this._o.onCompleted();
    };

    return SkipLastWithTimeObserver;
  }(AbstractObserver);

  observableProto.skipLastWithTime = function (duration, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new SkipLastWithTimeObservable(this, duration, scheduler);
  };

  var TakeLastWithTimeObservable = function (__super__) {
    inherits(TakeLastWithTimeObservable, __super__);
    function TakeLastWithTimeObservable(source, d, s) {
      this.source = source;
      this._d = d;
      this._s = s;
      __super__.call(this);
    }

    TakeLastWithTimeObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new TakeLastWithTimeObserver(o, this._d, this._s));
    };

    return TakeLastWithTimeObservable;
  }(ObservableBase);

  var TakeLastWithTimeObserver = function (__super__) {
    inherits(TakeLastWithTimeObserver, __super__);

    function TakeLastWithTimeObserver(o, d, s) {
      this._o = o;
      this._d = d;
      this._s = s;
      this._q = [];
      __super__.call(this);
    }

    TakeLastWithTimeObserver.prototype.next = function (x) {
      var now = this._s.now();
      this._q.push({ interval: now, value: x });
      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
        this._q.shift();
      }
    };
    TakeLastWithTimeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    TakeLastWithTimeObserver.prototype.completed = function () {
      var now = this._s.now();
      while (this._q.length > 0) {
        var next = this._q.shift();
        if (now - next.interval <= this._d) {
          this._o.onNext(next.value);
        }
      }
      this._o.onCompleted();
    };

    return TakeLastWithTimeObserver;
  }(AbstractObserver);

  observableProto.takeLastWithTime = function (duration, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new TakeLastWithTimeObservable(this, duration, scheduler);
  };

  observableProto.takeLastBufferWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          q.shift();
        }
      }, function (e) {
        o.onError(e);
      }, function () {
        var now = scheduler.now(),
            res = [];
        while (q.length > 0) {
          var next = q.shift();
          now - next.interval <= duration && res.push(next.value);
        }
        o.onNext(res);
        o.onCompleted();
      });
    }, source);
  };

  var TakeWithTimeObservable = function (__super__) {
    inherits(TakeWithTimeObservable, __super__);
    function TakeWithTimeObservable(source, d, s) {
      this.source = source;
      this._d = d;
      this._s = s;
      __super__.call(this);
    }

    function scheduleMethod(s, o) {
      o.onCompleted();
    }

    TakeWithTimeObservable.prototype.subscribeCore = function (o) {
      return new BinaryDisposable(this._s.scheduleFuture(o, this._d, scheduleMethod), this.source.subscribe(o));
    };

    return TakeWithTimeObservable;
  }(ObservableBase);

  observableProto.takeWithTime = function (duration, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new TakeWithTimeObservable(this, duration, scheduler);
  };

  var SkipWithTimeObservable = function (__super__) {
    inherits(SkipWithTimeObservable, __super__);
    function SkipWithTimeObservable(source, d, s) {
      this.source = source;
      this._d = d;
      this._s = s;
      this._open = false;
      __super__.call(this);
    }

    function scheduleMethod(s, self) {
      self._open = true;
    }

    SkipWithTimeObservable.prototype.subscribeCore = function (o) {
      return new BinaryDisposable(this._s.scheduleFuture(this, this._d, scheduleMethod), this.source.subscribe(new SkipWithTimeObserver(o, this)));
    };

    return SkipWithTimeObservable;
  }(ObservableBase);

  var SkipWithTimeObserver = function (__super__) {
    inherits(SkipWithTimeObserver, __super__);

    function SkipWithTimeObserver(o, p) {
      this._o = o;
      this._p = p;
      __super__.call(this);
    }

    SkipWithTimeObserver.prototype.next = function (x) {
      this._p._open && this._o.onNext(x);
    };
    SkipWithTimeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SkipWithTimeObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return SkipWithTimeObserver;
  }(AbstractObserver);

  observableProto.skipWithTime = function (duration, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new SkipWithTimeObservable(this, duration, scheduler);
  };

  var SkipUntilWithTimeObservable = function (__super__) {
    inherits(SkipUntilWithTimeObservable, __super__);
    function SkipUntilWithTimeObservable(source, startTime, scheduler) {
      this.source = source;
      this._st = startTime;
      this._s = scheduler;
      __super__.call(this);
    }

    function scheduleMethod(s, state) {
      state._open = true;
    }

    SkipUntilWithTimeObservable.prototype.subscribeCore = function (o) {
      this._open = false;
      return new BinaryDisposable(this._s.scheduleFuture(this, this._st, scheduleMethod), this.source.subscribe(new SkipUntilWithTimeObserver(o, this)));
    };

    return SkipUntilWithTimeObservable;
  }(ObservableBase);

  var SkipUntilWithTimeObserver = function (__super__) {
    inherits(SkipUntilWithTimeObserver, __super__);

    function SkipUntilWithTimeObserver(o, p) {
      this._o = o;
      this._p = p;
      __super__.call(this);
    }

    SkipUntilWithTimeObserver.prototype.next = function (x) {
      this._p._open && this._o.onNext(x);
    };
    SkipUntilWithTimeObserver.prototype.error = function (e) {
      this._o.onError(e);
    };
    SkipUntilWithTimeObserver.prototype.completed = function () {
      this._o.onCompleted();
    };

    return SkipUntilWithTimeObserver;
  }(AbstractObserver);

  observableProto.skipUntilWithTime = function (startTime, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new SkipUntilWithTimeObservable(this, startTime, scheduler);
  };

  observableProto.takeUntilWithTime = function (endTime, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    var source = this;
    return new AnonymousObservable(function (o) {
      return new BinaryDisposable(scheduler.scheduleFuture(o, endTime, function (_, o) {
        o.onCompleted();
      }), source.subscribe(o));
    }, source);
  };

  observableProto.throttle = function (windowDuration, scheduler) {
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    var duration = +windowDuration || 0;
    if (duration <= 0) {
      throw new RangeError('windowDuration cannot be less or equal zero.');
    }
    var source = this;
    return new AnonymousObservable(function (o) {
      var lastOnNext = 0;
      return source.subscribe(function (x) {
        var now = scheduler.now();
        if (lastOnNext === 0 || now - lastOnNext >= duration) {
          lastOnNext = now;
          o.onNext(x);
        }
      }, function (e) {
        o.onError(e);
      }, function () {
        o.onCompleted();
      });
    }, source);
  };

  var TransduceObserver = function (__super__) {
    inherits(TransduceObserver, __super__);
    function TransduceObserver(o, xform) {
      this._o = o;
      this._xform = xform;
      __super__.call(this);
    }

    TransduceObserver.prototype.next = function (x) {
      var res = tryCatch(this._xform['@@transducer/step']).call(this._xform, this._o, x);
      if (res === errorObj) {
        this._o.onError(res.e);
      }
    };

    TransduceObserver.prototype.error = function (e) {
      this._o.onError(e);
    };

    TransduceObserver.prototype.completed = function () {
      this._xform['@@transducer/result'](this._o);
    };

    return TransduceObserver;
  }(AbstractObserver);

  function transformForObserver(o) {
    return {
      '@@transducer/init': function transducerInit() {
        return o;
      },
      '@@transducer/step': function transducerStep(obs, input) {
        return obs.onNext(input);
      },
      '@@transducer/result': function transducerResult(obs) {
        return obs.onCompleted();
      }
    };
  }

  observableProto.transduce = function (transducer) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var xform = transducer(transformForObserver(o));
      return source.subscribe(new TransduceObserver(o, xform));
    }, source);
  };

  var SwitchFirstObservable = function (__super__) {
    inherits(SwitchFirstObservable, __super__);
    function SwitchFirstObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    SwitchFirstObservable.prototype.subscribeCore = function (o) {
      var m = new SingleAssignmentDisposable(),
          g = new CompositeDisposable(),
          state = {
        hasCurrent: false,
        isStopped: false,
        o: o,
        g: g
      };

      g.add(m);
      m.setDisposable(this.source.subscribe(new SwitchFirstObserver(state)));
      return g;
    };

    return SwitchFirstObservable;
  }(ObservableBase);

  var SwitchFirstObserver = function (__super__) {
    inherits(SwitchFirstObserver, __super__);
    function SwitchFirstObserver(state) {
      this._s = state;
      __super__.call(this);
    }

    SwitchFirstObserver.prototype.next = function (x) {
      if (!this._s.hasCurrent) {
        this._s.hasCurrent = true;
        isPromise(x) && (x = observableFromPromise(x));
        var inner = new SingleAssignmentDisposable();
        this._s.g.add(inner);
        inner.setDisposable(x.subscribe(new InnerObserver(this._s, inner)));
      }
    };

    SwitchFirstObserver.prototype.error = function (e) {
      this._s.o.onError(e);
    };

    SwitchFirstObserver.prototype.completed = function () {
      this._s.isStopped = true;
      !this._s.hasCurrent && this._s.g.length === 1 && this._s.o.onCompleted();
    };

    inherits(InnerObserver, __super__);
    function InnerObserver(state, inner) {
      this._s = state;
      this._i = inner;
      __super__.call(this);
    }

    InnerObserver.prototype.next = function (x) {
      this._s.o.onNext(x);
    };
    InnerObserver.prototype.error = function (e) {
      this._s.o.onError(e);
    };
    InnerObserver.prototype.completed = function () {
      this._s.g.remove(this._i);
      this._s.hasCurrent = false;
      this._s.isStopped && this._s.g.length === 1 && this._s.o.onCompleted();
    };

    return SwitchFirstObserver;
  }(AbstractObserver);

  observableProto.switchFirst = function () {
    return new SwitchFirstObservable(this);
  };

  observableProto.flatMapFirst = observableProto.exhaustMap = function (selector, resultSelector, thisArg) {
    return new FlatMapObservable(this, selector, resultSelector, thisArg).switchFirst();
  };

  observableProto.flatMapWithMaxConcurrent = observableProto.flatMapMaxConcurrent = function (limit, selector, resultSelector, thisArg) {
    return new FlatMapObservable(this, selector, resultSelector, thisArg).merge(limit);
  };

  var VirtualTimeScheduler = Rx.VirtualTimeScheduler = function (__super__) {
    inherits(VirtualTimeScheduler, __super__);

    function VirtualTimeScheduler(initialClock, comparer) {
      this.clock = initialClock;
      this.comparer = comparer;
      this.isEnabled = false;
      this.queue = new PriorityQueue(1024);
      __super__.call(this);
    }

    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;

    VirtualTimeSchedulerPrototype.now = function () {
      return this.toAbsoluteTime(this.clock);
    };

    VirtualTimeSchedulerPrototype.schedule = function (state, action) {
      return this.scheduleAbsolute(state, this.clock, action);
    };

    VirtualTimeSchedulerPrototype.scheduleFuture = function (state, dueTime, action) {
      var dt = dueTime instanceof Date ? this.toRelativeTime(dueTime - this.now()) : this.toRelativeTime(dueTime);

      return this.scheduleRelative(state, dt, action);
    };

    VirtualTimeSchedulerPrototype.add = notImplemented;

    VirtualTimeSchedulerPrototype.toAbsoluteTime = notImplemented;

    VirtualTimeSchedulerPrototype.toRelativeTime = notImplemented;

    VirtualTimeSchedulerPrototype.schedulePeriodic = function (state, period, action) {
      var s = new SchedulePeriodicRecursive(this, state, period, action);
      return s.start();
    };

    VirtualTimeSchedulerPrototype.scheduleRelative = function (state, dueTime, action) {
      var runAt = this.add(this.clock, dueTime);
      return this.scheduleAbsolute(state, runAt, action);
    };

    VirtualTimeSchedulerPrototype.start = function () {
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
      }
    };

    VirtualTimeSchedulerPrototype.stop = function () {
      this.isEnabled = false;
    };

    VirtualTimeSchedulerPrototype.advanceTo = function (time) {
      var dueToClock = this.comparer(this.clock, time);
      if (this.comparer(this.clock, time) > 0) {
        throw new ArgumentOutOfRangeError();
      }
      if (dueToClock === 0) {
        return;
      }
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
        this.clock = time;
      }
    };

    VirtualTimeSchedulerPrototype.advanceBy = function (time) {
      var dt = this.add(this.clock, time),
          dueToClock = this.comparer(this.clock, dt);
      if (dueToClock > 0) {
        throw new ArgumentOutOfRangeError();
      }
      if (dueToClock === 0) {
        return;
      }

      this.advanceTo(dt);
    };

    VirtualTimeSchedulerPrototype.sleep = function (time) {
      var dt = this.add(this.clock, time);
      if (this.comparer(this.clock, dt) >= 0) {
        throw new ArgumentOutOfRangeError();
      }

      this.clock = dt;
    };

    VirtualTimeSchedulerPrototype.getNext = function () {
      while (this.queue.length > 0) {
        var next = this.queue.peek();
        if (next.isCancelled()) {
          this.queue.dequeue();
        } else {
          return next;
        }
      }
      return null;
    };

    VirtualTimeSchedulerPrototype.scheduleAbsolute = function (state, dueTime, action) {
      var self = this;

      function run(scheduler, state1) {
        self.queue.remove(si);
        return action(scheduler, state1);
      }

      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
      this.queue.enqueue(si);

      return si.disposable;
    };

    return VirtualTimeScheduler;
  }(Scheduler);

  Rx.HistoricalScheduler = function (__super__) {
    inherits(HistoricalScheduler, __super__);

    function HistoricalScheduler(initialClock, comparer) {
      var clock = initialClock == null ? 0 : initialClock;
      var cmp = comparer || defaultSubComparer;
      __super__.call(this, clock, cmp);
    }

    var HistoricalSchedulerProto = HistoricalScheduler.prototype;

    HistoricalSchedulerProto.add = function (absolute, relative) {
      return absolute + relative;
    };

    HistoricalSchedulerProto.toAbsoluteTime = function (absolute) {
      return new Date(absolute).getTime();
    };

    HistoricalSchedulerProto.toRelativeTime = function (timeSpan) {
      return timeSpan;
    };

    return HistoricalScheduler;
  }(Rx.VirtualTimeScheduler);

  function OnNextPredicate(predicate) {
    this.predicate = predicate;
  }

  OnNextPredicate.prototype.equals = function (other) {
    if (other === this) {
      return true;
    }
    if (other == null) {
      return false;
    }
    if (other.kind !== 'N') {
      return false;
    }
    return this.predicate(other.value);
  };

  function OnErrorPredicate(predicate) {
    this.predicate = predicate;
  }

  OnErrorPredicate.prototype.equals = function (other) {
    if (other === this) {
      return true;
    }
    if (other == null) {
      return false;
    }
    if (other.kind !== 'E') {
      return false;
    }
    return this.predicate(other.error);
  };

  var ReactiveTest = Rx.ReactiveTest = {
    created: 100,

    subscribed: 200,

    disposed: 1000,

    onNext: function onNext(ticks, value) {
      return typeof value === 'function' ? new Recorded(ticks, new OnNextPredicate(value)) : new Recorded(ticks, Notification.createOnNext(value));
    },

    onError: function onError(ticks, error) {
      return typeof error === 'function' ? new Recorded(ticks, new OnErrorPredicate(error)) : new Recorded(ticks, Notification.createOnError(error));
    },

    onCompleted: function onCompleted(ticks) {
      return new Recorded(ticks, Notification.createOnCompleted());
    },

    subscribe: function subscribe(start, end) {
      return new Subscription(start, end);
    }
  };

  var Recorded = Rx.Recorded = function (time, value, comparer) {
    this.time = time;
    this.value = value;
    this.comparer = comparer || defaultComparer;
  };

  Recorded.prototype.equals = function (other) {
    return this.time === other.time && this.comparer(this.value, other.value);
  };

  Recorded.prototype.toString = function () {
    return this.value.toString() + '@' + this.time;
  };

  var Subscription = Rx.Subscription = function (start, end) {
    this.subscribe = start;
    this.unsubscribe = end || Number.MAX_VALUE;
  };

  Subscription.prototype.equals = function (other) {
    return this.subscribe === other.subscribe && this.unsubscribe === other.unsubscribe;
  };

  Subscription.prototype.toString = function () {
    return '(' + this.subscribe + ', ' + (this.unsubscribe === Number.MAX_VALUE ? 'Infinite' : this.unsubscribe) + ')';
  };

  var MockDisposable = Rx.MockDisposable = function (scheduler) {
    this.scheduler = scheduler;
    this.disposes = [];
    this.disposes.push(this.scheduler.clock);
  };

  MockDisposable.prototype.dispose = function () {
    this.disposes.push(this.scheduler.clock);
  };

  var MockObserver = function (__super__) {
    inherits(MockObserver, __super__);

    function MockObserver(scheduler) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.messages = [];
    }

    var MockObserverPrototype = MockObserver.prototype;

    MockObserverPrototype.onNext = function (value) {
      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnNext(value)));
    };

    MockObserverPrototype.onError = function (e) {
      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnError(e)));
    };

    MockObserverPrototype.onCompleted = function () {
      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnCompleted()));
    };

    return MockObserver;
  }(Observer);

  function MockPromise(scheduler, messages) {
    var self = this;
    this.scheduler = scheduler;
    this.messages = messages;
    this.subscriptions = [];
    this.observers = [];
    for (var i = 0, len = this.messages.length; i < len; i++) {
      var message = this.messages[i],
          notification = message.value;
      (function (innerNotification) {
        scheduler.scheduleAbsolute(null, message.time, function () {
          var obs = self.observers.slice(0);

          for (var j = 0, jLen = obs.length; j < jLen; j++) {
            innerNotification.accept(obs[j]);
          }
          return disposableEmpty;
        });
      })(notification);
    }
  }

  MockPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;

    this.subscriptions.push(new Subscription(this.scheduler.clock));
    var index = this.subscriptions.length - 1;

    var newPromise;

    var observer = Rx.Observer.create(function (x) {
      var retValue = onResolved(x);
      if (retValue && typeof retValue.then === 'function') {
        newPromise = retValue;
      } else {
        var ticks = self.scheduler.clock;
        newPromise = new MockPromise(self.scheduler, [Rx.ReactiveTest.onNext(ticks, undefined), Rx.ReactiveTest.onCompleted(ticks)]);
      }
      var idx = self.observers.indexOf(observer);
      self.observers.splice(idx, 1);
      self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
    }, function (err) {
      onRejected(err);
      var idx = self.observers.indexOf(observer);
      self.observers.splice(idx, 1);
      self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
    });
    this.observers.push(observer);

    return newPromise || new MockPromise(this.scheduler, this.messages);
  };

  var HotObservable = function (__super__) {
    inherits(HotObservable, __super__);

    function HotObservable(scheduler, messages) {
      __super__.call(this);
      var message,
          notification,
          observable = this;
      this.scheduler = scheduler;
      this.messages = messages;
      this.subscriptions = [];
      this.observers = [];
      for (var i = 0, len = this.messages.length; i < len; i++) {
        message = this.messages[i];
        notification = message.value;
        (function (innerNotification) {
          scheduler.scheduleAbsolute(null, message.time, function () {
            var obs = observable.observers.slice(0);

            for (var j = 0, jLen = obs.length; j < jLen; j++) {
              innerNotification.accept(obs[j]);
            }
            return disposableEmpty;
          });
        })(notification);
      }
    }

    HotObservable.prototype._subscribe = function (o) {
      var observable = this;
      this.observers.push(o);
      this.subscriptions.push(new Subscription(this.scheduler.clock));
      var index = this.subscriptions.length - 1;
      return disposableCreate(function () {
        var idx = observable.observers.indexOf(o);
        observable.observers.splice(idx, 1);
        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
      });
    };

    return HotObservable;
  }(Observable);

  var ColdObservable = function (__super__) {
    inherits(ColdObservable, __super__);

    function ColdObservable(scheduler, messages) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.messages = messages;
      this.subscriptions = [];
    }

    ColdObservable.prototype._subscribe = function (o) {
      var message,
          notification,
          observable = this;
      this.subscriptions.push(new Subscription(this.scheduler.clock));
      var index = this.subscriptions.length - 1;
      var d = new CompositeDisposable();
      for (var i = 0, len = this.messages.length; i < len; i++) {
        message = this.messages[i];
        notification = message.value;
        (function (innerNotification) {
          d.add(observable.scheduler.scheduleRelative(null, message.time, function () {
            innerNotification.accept(o);
            return disposableEmpty;
          }));
        })(notification);
      }
      return disposableCreate(function () {
        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
        d.dispose();
      });
    };

    return ColdObservable;
  }(Observable);

  Rx.TestScheduler = function (__super__) {
    inherits(TestScheduler, __super__);

    function baseComparer(x, y) {
      return x > y ? 1 : x < y ? -1 : 0;
    }

    function TestScheduler() {
      __super__.call(this, 0, baseComparer);
    }

    TestScheduler.prototype.scheduleAbsolute = function (state, dueTime, action) {
      dueTime <= this.clock && (dueTime = this.clock + 1);
      return __super__.prototype.scheduleAbsolute.call(this, state, dueTime, action);
    };

    TestScheduler.prototype.add = function (absolute, relative) {
      return absolute + relative;
    };

    TestScheduler.prototype.toAbsoluteTime = function (absolute) {
      return new Date(absolute).getTime();
    };

    TestScheduler.prototype.toRelativeTime = function (timeSpan) {
      return timeSpan;
    };

    TestScheduler.prototype.startScheduler = function (createFn, settings) {
      settings || (settings = {});
      settings.created == null && (settings.created = ReactiveTest.created);
      settings.subscribed == null && (settings.subscribed = ReactiveTest.subscribed);
      settings.disposed == null && (settings.disposed = ReactiveTest.disposed);

      var observer = this.createObserver(),
          source,
          subscription;

      this.scheduleAbsolute(null, settings.created, function () {
        source = createFn();
        return disposableEmpty;
      });

      this.scheduleAbsolute(null, settings.subscribed, function () {
        subscription = source.subscribe(observer);
        return disposableEmpty;
      });

      this.scheduleAbsolute(null, settings.disposed, function () {
        subscription.dispose();
        return disposableEmpty;
      });

      this.start();

      return observer;
    };

    TestScheduler.prototype.createHotObservable = function () {
      var len = arguments.length,
          args;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
      } else {
        args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      return new HotObservable(this, args);
    };

    TestScheduler.prototype.createColdObservable = function () {
      var len = arguments.length,
          args;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
      } else {
        args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      return new ColdObservable(this, args);
    };

    TestScheduler.prototype.createResolvedPromise = function (ticks, value) {
      return new MockPromise(this, [Rx.ReactiveTest.onNext(ticks, value), Rx.ReactiveTest.onCompleted(ticks)]);
    };

    TestScheduler.prototype.createRejectedPromise = function (ticks, reason) {
      return new MockPromise(this, [Rx.ReactiveTest.onError(ticks, reason)]);
    };

    TestScheduler.prototype.createObserver = function () {
      return new MockObserver(this);
    };

    return TestScheduler;
  }(VirtualTimeScheduler);

  var AnonymousObservable = Rx.AnonymousObservable = function (__super__) {
    inherits(AnonymousObservable, __super__);

    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber : isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0],
          self = state[1];
      var sub = tryCatch(self.__subscribe).call(self, ado);
      if (sub === errorObj && !ado.fail(errorObj.e)) {
        thrower(errorObj.e);
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function AnonymousObservable(subscribe, parent) {
      this.source = parent;
      this.__subscribe = subscribe;
      __super__.call(this);
    }

    AnonymousObservable.prototype._subscribe = function (o) {
      var ado = new AutoDetachObserver(o),
          state = [ado, this];

      if (currentThreadScheduler.scheduleRequired()) {
        currentThreadScheduler.schedule(state, setDisposable);
      } else {
        setDisposable(null, state);
      }
      return ado;
    };

    return AnonymousObservable;
  }(Observable);

  var AutoDetachObserver = function (__super__) {
    inherits(AutoDetachObserver, __super__);

    function AutoDetachObserver(observer) {
      __super__.call(this);
      this.observer = observer;
      this.m = new SingleAssignmentDisposable();
    }

    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;

    AutoDetachObserverPrototype.next = function (value) {
      var result = tryCatch(this.observer.onNext).call(this.observer, value);
      if (result === errorObj) {
        this.dispose();
        thrower(result.e);
      }
    };

    AutoDetachObserverPrototype.error = function (err) {
      var result = tryCatch(this.observer.onError).call(this.observer, err);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.completed = function () {
      var result = tryCatch(this.observer.onCompleted).call(this.observer);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.setDisposable = function (value) {
      this.m.setDisposable(value);
    };
    AutoDetachObserverPrototype.getDisposable = function () {
      return this.m.getDisposable();
    };

    AutoDetachObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.m.dispose();
    };

    return AutoDetachObserver;
  }(AbstractObserver);

  var UnderlyingObservable = function (__super__) {
    inherits(UnderlyingObservable, __super__);
    function UnderlyingObservable(m, u) {
      this._m = m;
      this._u = u;
      __super__.call(this);
    }

    UnderlyingObservable.prototype.subscribeCore = function (o) {
      return new BinaryDisposable(this._m.getDisposable(), this._u.subscribe(o));
    };

    return UnderlyingObservable;
  }(ObservableBase);

  var GroupedObservable = function (__super__) {
    inherits(GroupedObservable, __super__);
    function GroupedObservable(key, underlyingObservable, mergedDisposable) {
      __super__.call(this);
      this.key = key;
      this.underlyingObservable = !mergedDisposable ? underlyingObservable : new UnderlyingObservable(mergedDisposable, underlyingObservable);
    }

    GroupedObservable.prototype._subscribe = function (o) {
      return this.underlyingObservable.subscribe(o);
    };

    return GroupedObservable;
  }(Observable);

  var Subject = Rx.Subject = function (__super__) {
    inherits(Subject, __super__);
    function Subject() {
      __super__.call(this);
      this.isDisposed = false;
      this.isStopped = false;
      this.observers = [];
      this.hasError = false;
    }

    addProperties(Subject.prototype, Observer.prototype, {
      _subscribe: function _subscribe(o) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.observers.push(o);
          return new InnerSubscription(this, o);
        }
        if (this.hasError) {
          o.onError(this.error);
          return disposableEmpty;
        }
        o.onCompleted();
        return disposableEmpty;
      },

      hasObservers: function hasObservers() {
        checkDisposed(this);return this.observers.length > 0;
      },

      onCompleted: function onCompleted() {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onCompleted();
          }

          this.observers.length = 0;
        }
      },

      onError: function onError(error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.error = error;
          this.hasError = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },

      onNext: function onNext(value) {
        checkDisposed(this);
        if (!this.isStopped) {
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onNext(value);
          }
        }
      },

      dispose: function dispose() {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    Subject.create = function (observer, observable) {
      return new AnonymousSubject(observer, observable);
    };

    return Subject;
  }(Observable);

  var AsyncSubject = Rx.AsyncSubject = function (__super__) {
    inherits(AsyncSubject, __super__);

    function AsyncSubject() {
      __super__.call(this);
      this.isDisposed = false;
      this.isStopped = false;
      this.hasValue = false;
      this.observers = [];
      this.hasError = false;
    }

    addProperties(AsyncSubject.prototype, Observer.prototype, {
      _subscribe: function _subscribe(o) {
        checkDisposed(this);

        if (!this.isStopped) {
          this.observers.push(o);
          return new InnerSubscription(this, o);
        }

        if (this.hasError) {
          o.onError(this.error);
        } else if (this.hasValue) {
          o.onNext(this.value);
          o.onCompleted();
        } else {
          o.onCompleted();
        }

        return disposableEmpty;
      },

      hasObservers: function hasObservers() {
        checkDisposed(this);return this.observers.length > 0;
      },

      onCompleted: function onCompleted() {
        var i, len;
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          var os = cloneArray(this.observers),
              len = os.length;

          if (this.hasValue) {
            for (i = 0; i < len; i++) {
              var o = os[i];
              o.onNext(this.value);
              o.onCompleted();
            }
          } else {
            for (i = 0; i < len; i++) {
              os[i].onCompleted();
            }
          }

          this.observers.length = 0;
        }
      },

      onError: function onError(error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.hasError = true;
          this.error = error;

          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },

      onNext: function onNext(value) {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        this.value = value;
        this.hasValue = true;
      },

      dispose: function dispose() {
        this.isDisposed = true;
        this.observers = null;
        this.error = null;
        this.value = null;
      }
    });

    return AsyncSubject;
  }(Observable);

  var BehaviorSubject = Rx.BehaviorSubject = function (__super__) {
    inherits(BehaviorSubject, __super__);
    function BehaviorSubject(value) {
      __super__.call(this);
      this.value = value;
      this.observers = [];
      this.isDisposed = false;
      this.isStopped = false;
      this.hasError = false;
    }

    addProperties(BehaviorSubject.prototype, Observer.prototype, {
      _subscribe: function _subscribe(o) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.observers.push(o);
          o.onNext(this.value);
          return new InnerSubscription(this, o);
        }
        if (this.hasError) {
          o.onError(this.error);
        } else {
          o.onCompleted();
        }
        return disposableEmpty;
      },

      getValue: function getValue() {
        checkDisposed(this);
        if (this.hasError) {
          thrower(this.error);
        }
        return this.value;
      },

      hasObservers: function hasObservers() {
        checkDisposed(this);return this.observers.length > 0;
      },

      onCompleted: function onCompleted() {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        this.isStopped = true;
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onCompleted();
        }

        this.observers.length = 0;
      },

      onError: function onError(error) {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        this.isStopped = true;
        this.hasError = true;
        this.error = error;

        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onError(error);
        }

        this.observers.length = 0;
      },

      onNext: function onNext(value) {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        this.value = value;
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onNext(value);
        }
      },

      dispose: function dispose() {
        this.isDisposed = true;
        this.observers = null;
        this.value = null;
        this.error = null;
      }
    });

    return BehaviorSubject;
  }(Observable);

  var ReplaySubject = Rx.ReplaySubject = function (__super__) {

    var maxSafeInteger = Math.pow(2, 53) - 1;

    function createRemovableDisposable(subject, observer) {
      return disposableCreate(function () {
        observer.dispose();
        !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
      });
    }

    inherits(ReplaySubject, __super__);

    function ReplaySubject(bufferSize, windowSize, scheduler) {
      this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
      this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
      this.scheduler = scheduler || currentThreadScheduler;
      this.q = [];
      this.observers = [];
      this.isStopped = false;
      this.isDisposed = false;
      this.hasError = false;
      this.error = null;
      __super__.call(this);
    }

    addProperties(ReplaySubject.prototype, Observer.prototype, {
      _subscribe: function _subscribe(o) {
        checkDisposed(this);
        var so = new ScheduledObserver(this.scheduler, o),
            subscription = createRemovableDisposable(this, so);

        this._trim(this.scheduler.now());
        this.observers.push(so);

        for (var i = 0, len = this.q.length; i < len; i++) {
          so.onNext(this.q[i].value);
        }

        if (this.hasError) {
          so.onError(this.error);
        } else if (this.isStopped) {
          so.onCompleted();
        }

        so.ensureActive();
        return subscription;
      },

      hasObservers: function hasObservers() {
        checkDisposed(this);return this.observers.length > 0;
      },
      _trim: function _trim(now) {
        while (this.q.length > this.bufferSize) {
          this.q.shift();
        }
        while (this.q.length > 0 && now - this.q[0].interval > this.windowSize) {
          this.q.shift();
        }
      },

      onNext: function onNext(value) {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        var now = this.scheduler.now();
        this.q.push({ interval: now, value: value });
        this._trim(now);

        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onNext(value);
          observer.ensureActive();
        }
      },

      onError: function onError(error) {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        this.isStopped = true;
        this.error = error;
        this.hasError = true;
        var now = this.scheduler.now();
        this._trim(now);
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onError(error);
          observer.ensureActive();
        }
        this.observers.length = 0;
      },

      onCompleted: function onCompleted() {
        checkDisposed(this);
        if (this.isStopped) {
          return;
        }
        this.isStopped = true;
        var now = this.scheduler.now();
        this._trim(now);
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onCompleted();
          observer.ensureActive();
        }
        this.observers.length = 0;
      },

      dispose: function dispose() {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    return ReplaySubject;
  }(Observable);

  var AnonymousSubject = Rx.AnonymousSubject = function (__super__) {
    inherits(AnonymousSubject, __super__);
    function AnonymousSubject(observer, observable) {
      this.observer = observer;
      this.observable = observable;
      __super__.call(this);
    }

    addProperties(AnonymousSubject.prototype, Observer.prototype, {
      _subscribe: function _subscribe(o) {
        return this.observable.subscribe(o);
      },
      onCompleted: function onCompleted() {
        this.observer.onCompleted();
      },
      onError: function onError(error) {
        this.observer.onError(error);
      },
      onNext: function onNext(value) {
        this.observer.onNext(value);
      }
    });

    return AnonymousSubject;
  }(Observable);

  Rx.Pauser = function (__super__) {
    inherits(Pauser, __super__);
    function Pauser() {
      __super__.call(this);
    }

    Pauser.prototype.pause = function () {
      this.onNext(false);
    };

    Pauser.prototype.resume = function () {
      this.onNext(true);
    };

    return Pauser;
  }(Subject);

  if ("function" == 'function' && _typeof(__webpack_require__(6)) == 'object' && __webpack_require__(6)) {
    root.Rx = Rx;

    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return Rx;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (freeExports && freeModule) {
    if (moduleExports) {
      (freeModule.exports = Rx).Rx = Rx;
    } else {
      freeExports.Rx = Rx;
    }
  } else {
    root.Rx = Rx;
  }

  var rEndingLine = captureLine();
}).call(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module), __webpack_require__(5), __webpack_require__(4)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(19);
var bytesToUuid = __webpack_require__(20);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var process = module.exports = {};

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }

    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }

    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

g = function () {
	return this;
}();

try {
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

module.exports = g;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Decorator = __webpack_require__(8);
var Protocol = __webpack_require__(9);
var Errors = __webpack_require__(10);
var EventEmitter = __webpack_require__(1);
var debug = __webpack_require__(0)('Durga');

var PLUGINS = {
	events: __webpack_require__(14),
	methods: __webpack_require__(15),
	topics: __webpack_require__(21),
	collections: __webpack_require__(25),
	rooms: __webpack_require__(28)
};

var DurgaClient = function (_EventEmitter) {
	_inherits(DurgaClient, _EventEmitter);

	function DurgaClient(_ref) {
		var transporter = _ref.transporter;

		_classCallCheck(this, DurgaClient);

		var _this = _possibleConstructorReturn(this, (DurgaClient.__proto__ || Object.getPrototypeOf(DurgaClient)).call(this));

		var oEmit = _this.emit;
		_this.trigger = oEmit;
		_this.emit = undefined;

		_this.decorator = new Decorator({
			ns: ['client']
		});

		_this.protocol = new Protocol();
		_this.errors = new Errors();

		Object.keys(PLUGINS).forEach(function (key) {
			var plugin = PLUGINS[key];
			_this.use(plugin, {});
		});

		if (transporter) {
			transporter.init(_this);
		}

		return _this;
	}

	_createClass(DurgaClient, [{
		key: 'use',
		value: function use(plugin, options) {
			plugin(this, options || {});
		}
	}, {
		key: 'decorate',
		value: function decorate(ns, key, val) {
			if (ns === 'client') {
				this.decorator._decorate('client', this, key, val, [this]);
			} else {
				this.decorator.register(ns, key, val);
			}
			return this;
		}
	}, {
		key: 'listen',
		value: function listen(listener) {
			this._send = listener;
			return this;
		}
	}, {
		key: 'dispatch',
		value: function dispatch(event) {

			debug('Dispatch', event);

			var handler = this.protocol.match(event);

			return new Promise(function (resolve) {
				if (!handler) {
					throw new Error('Handler not found');
				}
				resolve(handler(event));
			}).then(function () {
				return {
					success: true,
					error: false
				};
			}, function (error) {
				return {
					success: false,
					error: error
				};
			});
		}
	}, {
		key: 'sendRaw',
		value: function sendRaw(e) {
			debug('Send', e);

			if (!this.hasOwnProperty('_send')) {
				throw new Error('Can\'t send without listener.');
			}

			this._send(e);

			return this;
		}
	}, {
		key: 'send',
		value: function send(composerName, options) {
			var msg = this.protocol.compose(composerName, options);
			return this.sendRaw(msg);
		}
	}]);

	return DurgaClient;
}(EventEmitter);

module.exports = DurgaClient;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecoratorError = function (_Error) {
	_inherits(DecoratorError, _Error);

	function DecoratorError() {
		_classCallCheck(this, DecoratorError);

		return _possibleConstructorReturn(this, (DecoratorError.__proto__ || Object.getPrototypeOf(DecoratorError)).apply(this, arguments));
	}

	_createClass(DecoratorError, [{
		key: 'name',
		get: function get() {
			return 'DecoratorError';
		}
	}]);

	return DecoratorError;
}(Error);

module.exports = function () {
	_createClass(Decorator, null, [{
		key: 'DecoratorError',
		get: function get() {
			return DecoratorError;
		}
	}]);

	function Decorator(_ref) {
		var ns = _ref.ns;

		_classCallCheck(this, Decorator);

		this._decorators = {};
		this._ns = [].concat(ns || []);
	}

	_createClass(Decorator, [{
		key: '_hasNamespace',
		value: function _hasNamespace(ns) {
			return this._ns.indexOf(ns) !== -1;
		}
	}, {
		key: 'addNamespace',
		value: function addNamespace(ns) {
			if (!this._hasNamespace(ns)) {
				this._ns.push(ns);
			} else {
				throw new DecoratorError('Namespace \'' + ns + '\' already exists');
			}
		}
	}, {
		key: '_getNsDecorators',
		value: function _getNsDecorators(ns) {
			return this._decorators.hasOwnProperty(ns) ? this._decorators[ns] : this._decorators[ns] = [];
		}
	}, {
		key: '_decorate',
		value: function _decorate(ns, target, key, factory, args) {

			try {
				this.decorateTarget(target, key, factory, args);
			} catch (e) {
				throw new DecoratorError('\'' + ns + '\' cant be decorated. Property \'' + key + '\' already exists.');
			}
		}
	}, {
		key: 'decorateTarget',
		value: function decorateTarget(target, key, factory, args) {
			if (!target[key]) {
				target[key] = factory.apply(target, args);
			} else {
				throw new DecoratorError('Can\'t decorate target. Property \'' + key + '\' already exists.');
			}
		}
	}, {
		key: 'register',
		value: function register(ns, key, factory) {
			var _this2 = this;

			if (!this._hasNamespace(ns)) {
				throw new DecoratorError('Namespace \'' + ns + '\' not allowed');
			}

			this._getNsDecorators(ns).push(function (target, args) {
				return _this2._decorate(ns, target, key, factory, args);
			});
		}
	}, {
		key: 'run',
		value: function run(ns, target, args) {
			if (!this._hasNamespace(ns)) {
				throw new DecoratorError('Namespace \'' + ns + '\' not allowed');
			}
			this._getNsDecorators(ns).forEach(function (d) {
				return d(target, args);
			});
		}
	}]);

	return Decorator;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProtocolError = function (_Error) {
	_inherits(ProtocolError, _Error);

	function ProtocolError() {
		_classCallCheck(this, ProtocolError);

		return _possibleConstructorReturn(this, (ProtocolError.__proto__ || Object.getPrototypeOf(ProtocolError)).apply(this, arguments));
	}

	_createClass(ProtocolError, [{
		key: 'name',
		get: function get() {
			return 'ProtocolError';
		}
	}]);

	return ProtocolError;
}(Error);

module.exports = function () {
	function Protocol() {
		_classCallCheck(this, Protocol);

		this._matchers = [];
		this._composers = {};
	}

	_createClass(Protocol, [{
		key: 'match',
		value: function match(event) {
			var handler = void 0;
			this._matchers.find(function (m) {
				return handler = m(event);
			});
			return handler;
		}
	}, {
		key: 'compose',
		value: function compose(name, payload) {
			if (!this._composers.hasOwnProperty(name)) {
				throw new ProtocolError('Composer \'' + name + '\' not found.');
			}
			return this._composers[name](payload);
		}
	}, {
		key: 'registerMatcher',
		value: function registerMatcher(m) {
			this._matchers.push(m);
			return this;
		}
	}, {
		key: 'registerComposer',
		value: function registerComposer(name, composer) {
			if (this._composers.hasOwnProperty(name)) {
				throw new ProtocolError('Composer \'' + name + '\' already registered.');
			}
			this._composers[name] = composer;
			return this;
		}
	}]);

	return Protocol;
}();

module.exports.ProtocolError = ProtocolError;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var is = __webpack_require__(11);

var ErrorProviderError = function (_Error) {
	_inherits(ErrorProviderError, _Error);

	function ErrorProviderError() {
		_classCallCheck(this, ErrorProviderError);

		return _possibleConstructorReturn(this, (ErrorProviderError.__proto__ || Object.getPrototypeOf(ErrorProviderError)).apply(this, arguments));
	}

	_createClass(ErrorProviderError, [{
		key: 'name',
		get: function get() {
			return 'ErrorProviderError';
		}
	}]);

	return ErrorProviderError;
}(Error);

module.exports = function () {
	function ErrorProvider() {
		_classCallCheck(this, ErrorProvider);
	}

	_createClass(ErrorProvider, [{
		key: '$register',
		value: function $register(name, ErrorClass) {
			var _this2 = this;

			if (is.object(name)) {
				var errors = name;
				return Object.keys(errors).forEach(function (k) {
					return _this2.$register(k, errors[k]);
				});
			}

			if (this.hasOwnProperty(name)) {
				throw new ErrorProviderError('Error \'' + name + '\' already exists.');
			}

			Object.defineProperty(this, name, {
				get: function get() {
					return ErrorClass;
				}
			});
		}
	}]);

	return ErrorProvider;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var isActualNaN = function isActualNaN(value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;

var is = {};

is.a = is.type = function (value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

is.defined = function (value) {
  return typeof value !== 'undefined';
};

is.empty = function (value) {
  var type = toStr.call(value);
  var key;

  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
};

is.equal = function equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (key--) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

is.hosted = function (value, host) {
  var type = _typeof(host[value]);
  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

is.instance = is['instanceof'] = function (value, constructor) {
  return value instanceof constructor;
};

is.nil = is['null'] = function (value) {
  return value === null;
};

is.undef = is.undefined = function (value) {
  return typeof value === 'undefined';
};

is.args = is.arguments = function (value) {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

is.array = Array.isArray || function (value) {
  return toStr.call(value) === '[object Array]';
};

is.args.empty = function (value) {
  return is.args(value) && value.length === 0;
};

is.array.empty = function (value) {
  return is.array(value) && value.length === 0;
};

is.arraylike = function (value) {
  return !!value && !is.bool(value) && owns.call(value, 'length') && isFinite(value.length) && is.number(value.length) && value.length >= 0;
};

is.bool = is['boolean'] = function (value) {
  return toStr.call(value) === '[object Boolean]';
};

is['false'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

is['true'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

is.date = function (value) {
  return toStr.call(value) === '[object Date]';
};

is.date.valid = function (value) {
  return is.date(value) && !isNaN(Number(value));
};

is.element = function (value) {
  return value !== undefined && typeof HTMLElement !== 'undefined' && value instanceof HTMLElement && value.nodeType === 1;
};

is.error = function (value) {
  return toStr.call(value) === '[object Error]';
};

is.fn = is['function'] = function (value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

is.number = function (value) {
  return toStr.call(value) === '[object Number]';
};

is.infinite = function (value) {
  return value === Infinity || value === -Infinity;
};

is.decimal = function (value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

is.divisibleBy = function (value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || isNonZeroNumber && value % n === 0;
};

is.integer = is['int'] = function (value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

is.maximum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

is.minimum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

is.nan = function (value) {
  return !is.number(value) || value !== value;
};

is.even = function (value) {
  return is.infinite(value) || is.number(value) && value === value && value % 2 === 0;
};

is.odd = function (value) {
  return is.infinite(value) || is.number(value) && value === value && value % 2 !== 0;
};

is.ge = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

is.gt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

is.le = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

is.lt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

is.within = function (value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || value >= start && value <= finish;
};

is.object = function (value) {
  return toStr.call(value) === '[object Object]';
};

is.primitive = function isPrimitive(value) {
  if (!value) {
    return true;
  }
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || is.object(value) || is.fn(value) || is.array(value)) {
    return false;
  }
  return true;
};

is.hash = function (value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

is.regexp = function (value) {
  return toStr.call(value) === '[object RegExp]';
};

is.string = function (value) {
  return toStr.call(value) === '[object String]';
};

is.base64 = function (value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

is.hex = function (value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

is.symbol = function (value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && _typeof(symbolValueOf.call(value)) === 'symbol';
};

module.exports = is;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(13);

exports.names = [];
exports.skips = [];

exports.formatters = {};

var prevTime;

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0;
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

function createDebug(namespace) {

  function debug() {
    if (!debug.enabled) return;

    var self = debug;

    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      args.unshift('%O');
    }

    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        args.splice(index, 1);
        index--;
      }
      return match;
    });

    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue;
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

function disable() {
  exports.enable('');
}

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(1);

module.exports = function (client) {

	var rx = new EventEmitter();

	client.decorate('client', 'emit', function () {
		return function (event, payload) {
			this.send('event', { event: event, payload: payload });
		};
	});

	client.decorate('client', 'event', function () {
		return function (event, handler) {
			rx.on(event, function (payload) {
				return handler({ payload: payload });
			});
		};
	});

	client.protocol.registerMatcher(function (event) {
		if (event.type === 'event' && event.event) {
			return function () {
				return rx.emit(event.event, event.payload);
			};
		}
	}).registerComposer('event', function (_ref) {
		var event = _ref.event,
		    payload = _ref.payload;
		return {
			type: 'event',
			event: event,
			payload: payload
		};
	});
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rx = __webpack_require__(2);
var errors = __webpack_require__(17);
var createExecServerMethod = __webpack_require__(18);

var DEFAULT_CONFIG = {
	execTimeout: 1000 * 30 };

module.exports = function MethodsClientPlugin(client, pluginOptions) {
	pluginOptions = Object.assign({}, DEFAULT_CONFIG, pluginOptions);

	var responses = new rx.Subject();

	client.errors.$register(errors);

	client.protocol.registerMatcher(function (event) {
		if (event.type === 'method' && event.method && event.rid) {
			return function () {
				return responses.onNext(event);
			};
		}
	}).registerComposer('method', function (_ref) {
		var rid = _ref.rid,
		    method = _ref.method,
		    payload = _ref.payload;
		return {
			type: 'method',
			rid: rid,
			method: method,
			payload: payload
		};
	});

	client.decorate('client', 'exec', function () {
		return createExecServerMethod(responses, pluginOptions);
	});
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];

		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MethodResponseError = function (_Error) {
	_inherits(MethodResponseError, _Error);

	function MethodResponseError() {
		_classCallCheck(this, MethodResponseError);

		return _possibleConstructorReturn(this, (MethodResponseError.__proto__ || Object.getPrototypeOf(MethodResponseError)).apply(this, arguments));
	}

	_createClass(MethodResponseError, [{
		key: 'toJSON',
		value: function toJSON() {
			return {
				msg: this.message,
				code: this.code
			};
		}
	}, {
		key: 'name',
		get: function get() {
			return 'MethodResponseError';
		}
	}], [{
		key: 'fromJSON',
		value: function fromJSON(res) {
			return new MethodResponseError(res.msg);
		}
	}, {
		key: 'fromError',
		value: function fromError(err) {

			if (err instanceof TypeError) {
				return new MethodResponseError('Bad implementation');
			}

			return new MethodResponseError('Internal server error');
		}
	}]);

	return MethodResponseError;
}(Error);

var MethodTimeoutError = function (_Error2) {
	_inherits(MethodTimeoutError, _Error2);

	function MethodTimeoutError() {
		_classCallCheck(this, MethodTimeoutError);

		return _possibleConstructorReturn(this, (MethodTimeoutError.__proto__ || Object.getPrototypeOf(MethodTimeoutError)).apply(this, arguments));
	}

	_createClass(MethodTimeoutError, [{
		key: 'name',
		get: function get() {
			return 'MethodTimeoutError';
		}
	}]);

	return MethodTimeoutError;
}(Error);

module.exports = {
	MethodResponseError: MethodResponseError,
	MethodTimeoutError: MethodTimeoutError
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(3);
var debug = __webpack_require__(0)('Durga:methods:method');

module.exports = function (responses, pluginOptions) {

	return function execServerMethod(method, payload, options) {
		var _this = this;

		var DEFAULT_OPTIONS = {
			timeout: pluginOptions.execTimeout
		};

		options = Object.assign(DEFAULT_OPTIONS, options);

		var rid = uuid();

		debug('EXEC %c' + method, 'font-weight: bold;', 'with payload', payload);

		this.send('method', { rid: rid, method: method, payload: payload });

		return responses.filter(function (e) {
			return e.rid === rid;
		}).first().timeout(options.timeout, new this.errors.MethodTimeoutError('Timeout has occurred.')).toPromise().then(function (res) {
			if (res.error) {
				var err = _this.errors.MethodResponseError.fromJSON(res.error);
				return Promise.reject(err);
			}

			debug('EXEC RESULT %c' + method, 'font-weight: bold;', res.payload);

			return res.payload;
		});
	};
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var rng;

var crypto = global.crypto || global.msCrypto;
if (crypto && crypto.getRandomValues) {
  var rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  var rnds = new Array(16);
  rng = function rng() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rx = __webpack_require__(2);
var errors = __webpack_require__(22);
var createSubscribeTopicMethod = __webpack_require__(23);

var DEFAULT_CONFIG = {
	execTimeout: 1000 * 30 };

module.exports = function TopicsClientPlugin(client, pluginOptions) {
	pluginOptions = Object.assign({}, DEFAULT_CONFIG, pluginOptions);

	var responses = new rx.Subject();

	client.errors.$register(errors);

	client.protocol.registerMatcher(function (event) {
		if (event.type === 'topic:ready' && event.topic && event.rid) {
			return function () {
				return responses.onNext(event);
			};
		} else if (event.type === 'topic:disposed' && event.topic && event.rid) {
			return function () {
				return responses.onNext(event);
			};
		}
	}).registerComposer('topic:sub', function (_ref) {
		var rid = _ref.rid,
		    topic = _ref.topic,
		    payload = _ref.payload;
		return {
			type: 'topic:sub',
			rid: rid,
			topic: topic,
			payload: payload
		};
	}).registerComposer('topic:dispose', function (_ref2) {
		var rid = _ref2.rid,
		    topic = _ref2.topic;
		return {
			type: 'topic:dispose',
			rid: rid,
			topic: topic
		};
	});

	client.decorate('client', 'subscribe', function (client) {
		return createSubscribeTopicMethod(client, responses, pluginOptions);
	});
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicResponseError = function (_Error) {
	_inherits(TopicResponseError, _Error);

	function TopicResponseError() {
		_classCallCheck(this, TopicResponseError);

		return _possibleConstructorReturn(this, (TopicResponseError.__proto__ || Object.getPrototypeOf(TopicResponseError)).apply(this, arguments));
	}

	_createClass(TopicResponseError, [{
		key: 'toJSON',
		value: function toJSON() {
			return {
				msg: this.message,
				code: this.code
			};
		}
	}, {
		key: 'name',
		get: function get() {
			return 'TopicResponseError';
		}
	}], [{
		key: 'fromJSON',
		value: function fromJSON(res) {
			return new TopicResponseError(res.msg);
		}
	}, {
		key: 'fromError',
		value: function fromError(err) {

			if (err instanceof TypeError) {
				return new TopicResponseError('Bad implementation');
			}

			return new TopicResponseError('Internal server error');
		}
	}]);

	return TopicResponseError;
}(Error);

var TopicTimeoutError = function (_Error2) {
	_inherits(TopicTimeoutError, _Error2);

	function TopicTimeoutError() {
		_classCallCheck(this, TopicTimeoutError);

		return _possibleConstructorReturn(this, (TopicTimeoutError.__proto__ || Object.getPrototypeOf(TopicTimeoutError)).apply(this, arguments));
	}

	_createClass(TopicTimeoutError, [{
		key: 'name',
		get: function get() {
			return 'TopicTimeoutError';
		}
	}]);

	return TopicTimeoutError;
}(Error);

module.exports = {
	TopicResponseError: TopicResponseError,
	TopicTimeoutError: TopicTimeoutError
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(3);
var TopicSubscription = __webpack_require__(24);
var debug = __webpack_require__(0)('Durga:plugin:topics');

module.exports = function (client, responses, pluginOptions) {

	var activeSubs = [];

	client.on('reconnect', function () {
		debug('Reconnecting active topics');
		activeSubs.forEach(function (sub) {
			return sub.connect();
		});
	});

	return function subscribeServerTopic(topic, payload, options) {

		var tsub = new TopicSubscription(client, responses, topic, payload);

		var DEFAULT_OPTIONS = {
			timeout: pluginOptions.execTimeout
		};

		options = Object.assign(DEFAULT_OPTIONS, options);

		tsub.connect(options);

		activeSubs.push(tsub);

		tsub.on('disposed', function () {
			var index = activeSubs.indexOf(tsub);
			if (index !== -1) {
				activeSubs.splice(index, 1);
			}
		});

		return tsub;
	};
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuid = __webpack_require__(3);
var EventEmitter = __webpack_require__(1);
var debug = __webpack_require__(0)('Durga:plugin:topics');

module.exports = function (_EventEmitter) {
  _inherits(TopicSubscription, _EventEmitter);

  function TopicSubscription(client, responses, topic, payload) {
    _classCallCheck(this, TopicSubscription);

    var _this = _possibleConstructorReturn(this, (TopicSubscription.__proto__ || Object.getPrototypeOf(TopicSubscription)).call(this));

    _this.client = client;
    _this.topic = topic;
    _this.payload = payload || {};
    _this.id = uuid();
    _this.responsesObservable = responses;

    _this.isReady = false;
    _this.isDisposed = false;

    _this.ready = null;
    return _this;
  }

  _createClass(TopicSubscription, [{
    key: '_responsePromise',
    value: function _responsePromise(type, timeout) {
      var _this2 = this;

      return this.responsesObservable.filter(function (e) {
        return e.rid === _this2.id;
      }).first().timeout(timeout || 30000, new this.client.errors.TopicTimeoutError('Timeout has occurred while waiting for ' + type + ': ' + this.topic)).toPromise();
    }
  }, {
    key: 'connect',
    value: function connect(options) {
      var _this3 = this;

      debug('Connecting topic: ' + this.topic + ' with payload:', this.payload);

      options = options || {};

      this.client.send('topic:sub', { rid: this.id, topic: this.topic, payload: this.payload });

      return this.ready = this._responsePromise('topic:ready', options.timeout).then(function (res) {
        if (res.error) {
          var err = _this3.client.errors.TopicResponseError.fromJSON(res.error);
          throw err;
        }

        _this3.isReady = true;
        _this3.emit('ready');

        if (res.payload.dispatches) {
          var p = res.payload.dispatches.map(function (event) {
            return _this3.client.dispatch(event);
          });
          return Promise.all(p).then(function () {
            delete res.payload.dispatches;
            return res.payload;
          });
        }

        return res.payload;
      });
    }
  }, {
    key: 'dispose',
    value: function dispose(options) {
      var _this4 = this;

      options = options || {};

      debug('Disposing topic: ' + this.topic + ' with id: ' + this.id);

      this.client.send('topic:dispose', { rid: this.id, topic: this.topic });

      return this._responsePromise('topic:disposed', options.timeout).then(function (res) {
        if (res.error) {
          var err = _this4.client.errors.TopicResponseError.fromJSON(res.error);
          throw err;
        }

        _this4.isDisposed = true;
        _this4.emit('disposed');

        return res;
      });
    }
  }]);

  return TopicSubscription;
}(EventEmitter);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rx = __webpack_require__(2);

var CollectionProvider = __webpack_require__(26);

module.exports = function CollectionsClientPlugin(client, options) {

	var collectionsEvents = new rx.Subject();

	var collections = new CollectionProvider(client, collectionsEvents);

	client.decorate('client', 'collection', function () {
		return collections.get.bind(collections);
	});

	client.protocol.registerMatcher(function (event) {
		if (event.type === 'collection' && event.collection) {
			return function () {
				return collectionsEvents.onNext(event);
			};
		}
	});
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollectionInterface = __webpack_require__(27);

module.exports = function () {
	function CollectionsProvider(client, observable) {
		_classCallCheck(this, CollectionsProvider);

		this.client = client;
		this.observable = observable;

		this._collections = {};
	}

	_createClass(CollectionsProvider, [{
		key: 'get',
		value: function get(name) {

			if (this._collections.hasOwnProperty(name)) {
				return this._collections[name];
			} else {

				return this._collections[name] = this._initCollection(name);
			}
		}
	}, {
		key: '_initCollection',
		value: function _initCollection(name) {
			return new CollectionInterface(name, this.client, this.observable);
		}
	}]);

	return CollectionsProvider;
}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function CollectionInterface(name, client, observable) {
		var _this = this;

		_classCallCheck(this, CollectionInterface);

		this.name = name;
		this.client = client;
		this.observable = observable.filter(function (e) {
			return e.collection === _this.name;
		});;
	}

	_createClass(CollectionInterface, [{
		key: 'get',
		value: function get(id) {
			return this.exec('get', { id: id });
		}
	}, {
		key: 'create',
		value: function create(attrs) {
			return this.exec('create', attrs);
		}
	}, {
		key: 'update',
		value: function update(id, attrs, cleans) {
			return this.exec('update', {
				id: id,
				attrs: attrs,
				cleans: cleans
			});
		}
	}, {
		key: 'destroy',
		value: function destroy(id) {
			return this.exec('destroy', { id: id });
		}
	}, {
		key: 'subscribe',
		value: function subscribe(observer) {
			var _observable$map;

			return (_observable$map = this.observable.map(function (e) {
				return {
					type: e.event,
					id: e.id,
					model: e.model,
					cleans: e.cleans
				};
			})).subscribe.apply(_observable$map, arguments);
		}
	}, {
		key: 'exec',
		value: function exec(method, payload) {
			return this.client.exec(this._remoteBasePath + method, payload);
		}
	}, {
		key: '_remoteBasePath',
		get: function get() {
			return '$collection:' + this.name + ':';
		}
	}]);

	return CollectionInterface;
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function RoomsClientPlugin(client, options) {};

/***/ })
/******/ ]);