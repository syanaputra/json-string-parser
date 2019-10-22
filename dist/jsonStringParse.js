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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  Copyright (c) 2019 Stephanus Yanaputra.
  Licensed under the MIT License (MIT), see
  http://syanaputra.github.io/string-wizard
*/

/* global define */
(function () {
  'use strict';

  function jsonStringParse(text) {
    var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var additionalConfig = arguments.length > 2 ? arguments[2] : undefined;
    var stringLogic = {
      split: function split(input, rule) {
        var result = input;

        if (typeof rule.value != 'undefined') {
          result = input.split(rule.value);
        }

        return result;
      },
      join: function join(input, rule) {
        var result = input;

        if (Array.isArray(input)) {
          if (typeof rule.value != 'undefined') {
            result = input.join(rule.value);
          }
        } else {
          console.error('join - Error: Input has to be an array');
        }

        return result;
      },
      trim: function trim(input, rule) {
        var result = input;

        var execRule = function execRule(original) {
          return original.trim();
        };

        if (Array.isArray(input)) {
          result = input.map(function (item) {
            return execRule(item);
          });
        } else {
          result = execRule(input);
        }

        return result;
      },
      appendtext: function appendtext(input, rule) {
        var result = input;

        var execRule = function execRule(original, value) {
          return original + value;
        };

        if (Array.isArray(input)) {
          result = input.map(function (item) {
            return execRule(item, rule.value);
          });
        } else {
          result = execRule(input, rule.value);
        }

        return result;
      },
      prependtext: function prependtext(input, rule) {
        var result = input;

        var execRule = function execRule(original, value) {
          return value + original;
        };

        if (Array.isArray(input)) {
          result = input.map(function (item) {
            return execRule(item, rule.value);
          });
        } else {
          result = execRule(input, rule.value);
        }

        return result;
      },
      replacetext: function replacetext(input, rule) {
        var result = input;

        var execRule = function execRule(original, search, replacement) {
          return original.replace(new RegExp(search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replacement);
        };

        if (Array.isArray(input)) {
          result = input.map(function (item) {
            return execRule(item, rule.search, rule.replacement);
          });
        } else {
          result = execRule(input, rule.search, rule.replacement);
        }

        return result;
      } // ...additionalConfig.stringLogic,

    };

    var applyRule = function applyRule(result, rule) {
      if (typeof rule.type != 'undefined' && stringLogic[rule.type] != 'undefined') {
        var ruleType = rule.type ? rule.type.toLowerCase() : '';
        var func = stringLogic[ruleType] || null;

        if (func != null) {
          return func(result, rule);
        }
      }

      return result;
    };

    var result = text;
    rules.forEach(function (rule) {
      result = applyRule(result, rule);
    });
    return result;
  }

  ;

  if ( true && module.exports) {
    jsonStringParse["default"] = jsonStringParse;
    module.exports = jsonStringParse;
  } else if ( true && _typeof(__webpack_require__(0)) === 'object' && __webpack_require__(0)) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return jsonStringParse;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.jsonStringParse = jsonStringParse;
  }
})();

/***/ })
/******/ ]);
//# sourceMappingURL=jsonStringParse.js.map