(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bharyang"] = factory();
	else
		root["bharyang"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const ASC = 'asc';
/* harmony export (immutable) */ __webpack_exports__["ASC"] = ASC;

const DESC = 'desc';
/* harmony export (immutable) */ __webpack_exports__["DESC"] = DESC;

const ASC_LENGTH = 'asc_length';
/* harmony export (immutable) */ __webpack_exports__["ASC_LENGTH"] = ASC_LENGTH;

const DESC_LENGTH = 'desc_length';
/* harmony export (immutable) */ __webpack_exports__["DESC_LENGTH"] = DESC_LENGTH;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bharyang_1 = __webpack_require__(2);
exports.sortAscending = bharyang_1.sortAscending;
exports.sortDescending = bharyang_1.sortDescending;
exports.sortImports = bharyang_1.sortImports;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sort_o_1 = __webpack_require__(3);
var object_1 = __webpack_require__(7);
var regEx = {
    assets: /^import \'.*?\'/,
    libraries: /(?!\'\..*\')\'.*?\'/
};
var MODULE_REGEX = /\'.*?\'/;
/**
 * Sort string with respect to the supplied sortOrder.
 *
 * @param {string} text
 * @param {string} sortOrder
 * @returns {string}
 */
function sort(text, sortOrder) {
    var lines = text.split('\n');
    return sort_o_1.sort(lines, sortOrder)
        .filter(function (l) { return l; })
        .join('\n');
}
/**
 * Group assets, libraries and app modules.
 *
 * @param {Import} acc
 * @param {string} line
 * @returns {Import}
 */
function groupLines(acc, line) {
    for (var _i = 0, _a = Object.keys(regEx); _i < _a.length; _i++) {
        var key = _a[_i];
        if (regEx[key].test(line)) {
            acc[key] = acc[key] || [];
            acc[key].push(line);
            return acc;
        }
    }
    var moduleKey;
    var matches = line.match(MODULE_REGEX) || [];
    if (matches.length) {
        var module = matches[0].replace(/\'/g, '');
        moduleKey = module.substring(0, module.lastIndexOf('/'));
    }
    else {
        moduleKey = 'misc';
    }
    acc.appModules[moduleKey] = acc.appModules[moduleKey] || [];
    acc.appModules[moduleKey].push(line);
    return acc;
}
/**
 * Sort grouped modules in ascending order.
 *
 * @param {Import} lineGroup
 * @returns {string[]}
 */
function sortLines(lineGroup) {
    var sortedLines = [];
    for (var _i = 0, _a = Object.keys(lineGroup); _i < _a.length; _i++) {
        var key = _a[_i];
        var lines = [];
        if (object_1.isObject(lineGroup[key])) {
            lines = sortLines(lineGroup[key]);
        }
        else {
            lines = sort_o_1.sort(lineGroup[key], sort_o_1.sortOrder.ASC_LENGTH);
        }
        if (lines.length) {
            sortedLines = sortedLines.concat(lines);
            sortedLines.push('\n');
        }
    }
    return sortedLines;
}
/**
 * Sort lines in ascending order.
 *
 * @param {string} text
 * @returns {string}
 */
function sortAscending(text) {
    return sort(text, sort_o_1.sortOrder.ASC_LENGTH);
}
exports.sortAscending = sortAscending;
/**
 * Sort lines in descending order.
 *
 * @param {string} text
 * @returns {string}
 */
function sortDescending(text) {
    return sort(text, sort_o_1.sortOrder.DESC_LENGTH);
}
exports.sortDescending = sortDescending;
/**
 * Group and sort imports in ascending order.
 *
 * @param {string} text
 * @returns {string}
 */
function sortImports(text) {
    var sortedLines;
    var lines = text.split('\n');
    var lineGroup = lines.filter(function (l) { return l; }).reduce(groupLines, {
        assets: [],
        libraries: [],
        appModules: {}
    });
    sortedLines = sortLines(lineGroup);
    return sortedLines.join('\n').replace(/\n\n+/g, '\n\n');
}
exports.sortImports = sortImports;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sorto__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_sortOrder__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return __WEBPACK_IMPORTED_MODULE_0__sorto__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sortKeys", function() { return __WEBPACK_IMPORTED_MODULE_0__sorto__["b"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "sortOrder", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_sortOrder__; });






/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sort;
/* harmony export (immutable) */ __webpack_exports__["b"] = sortKeys;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_object__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_comparators__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__ = __webpack_require__(0);





/**
 * Returns appropriate comparator as per the sort string.
 * If a function is supplied, it returns the function itself.
 *
 * @param {String|Function} sortOrder
 * @returns {Function}
 */
function getComparator(sortOrder) {
  if (typeof sortOrder === 'function') {
    return sortOrder;
  }

  const comparators = {
    [__WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__["ASC"]]: __WEBPACK_IMPORTED_MODULE_1__utils_comparators__["a" /* ascendingSort */],
    [__WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__["DESC"]]: __WEBPACK_IMPORTED_MODULE_1__utils_comparators__["b" /* descendingSort */],
    [__WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__["ASC_LENGTH"]]: __WEBPACK_IMPORTED_MODULE_1__utils_comparators__["d" /* lengthSort */],
    [__WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__["DESC_LENGTH"]]: __WEBPACK_IMPORTED_MODULE_1__utils_comparators__["c" /* lengthReverseSort */]
  };

  return comparators[sortOrder];
}

/**
 * Sort an array as per the specified order.
 *
 * @param {Array} data
 * @param {String|Function} = 'asc' sortOrder
 * @returns {Array}
 */
function sort(data, sortOrder = __WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__["ASC"]) {
  if (!Array.isArray(data)) {
    throw new Error('Supplied data is not a valid Array');
  }

  const comparator = getComparator(sortOrder);

  return data.sort(comparator);
}

/**
 * Sort keys of an object as per the specified order.
 *
 * @param {Object} data
 * @param {String|Function} = 'asc' sortOrder
 * @returns {Object}
 */
function sortKeys(data, sortOrder = __WEBPACK_IMPORTED_MODULE_2__constants_sortOrder__["ASC"]) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_object__["a" /* isObject */])(data)) {
    throw new Error('Supplied data is not a valid Object');
  }

  const comparator = getComparator(sortOrder);

  let sortedData = {};
  let sortedKeys = Object.keys(data).sort(comparator);

  sortedKeys.forEach(key => {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_object__["a" /* isObject */])(data[key])) {
      sortedData[key] = sortKeys(data[key], comparator);
    } else {
      sortedData[key] = data[key];
    }
  });

  return sortedData;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isObject;
/**
 * Check if a given input is of type "Object"
 * 
 * @param {any} input 
 */
function isObject(input) {
  return input instanceof Object && input.constructor === Object;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ascendingSort;
/* harmony export (immutable) */ __webpack_exports__["b"] = descendingSort;
/* harmony export (immutable) */ __webpack_exports__["d"] = lengthSort;
/* harmony export (immutable) */ __webpack_exports__["c"] = lengthReverseSort;
/**
 * Sort in ascending order.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 */
function ascendingSort(a, b) {
  if (typeof a === 'string') {
    a = a.toLowerCase();
  }
  if (typeof b === 'string') {
    b = b.toLowerCase();
  }

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
}

/**
 * Sort in descending order.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 */
function descendingSort(a, b) {
  if (typeof a === 'string') {
    a = a.toLowerCase();
  }
  if (typeof b === 'string') {
    b = b.toLowerCase();
  }

  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return 0;
}

/**
 * Sort in ascending order by length.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 */
function lengthSort(a, b) {
  return a.length - b.length;
}

/**
 * Sort in ascending order by length.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 */
function lengthReverseSort(a, b) {
  return b.length - a.length;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if the supplied data is an object.
 *
 * @param {any} data
 * @returns {boolean}
 */
function isObject(data) {
    return data instanceof Object && data.constructor === Object;
}
exports.isObject = isObject;


/***/ })
/******/ ]);
});