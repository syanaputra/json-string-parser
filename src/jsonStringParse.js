/*!
  Copyright (c) 2019 Stephanus Yanaputra.
  Licensed under the MIT License (MIT), see
  http://syanaputra.github.io/string-wizard
*/
/* global define */
(function () {
    'use strict';

    function jsonStringParse(text, rules = [], additionalConfig) {
        let stringLogic = {
            split: (input, rule) => {
                let result = input;
                if (typeof (rule.value) != 'undefined') {
                    result = input.split(rule.value);
                }

                return result;
            },
            join: (input, rule) => {
                let result = input;

                if (Array.isArray(input)) {
                    if (typeof (rule.value) != 'undefined') {
                        result = input.join(rule.value);
                    }
                } else {
                    console.error('join - Error: Input has to be an array');
                }

                return result;
            },
            trim: (input, rule) => {
                let result = input;

                const execRule = (original) => original.trim();

                if (Array.isArray(input)) {
                    result = input.map(function (item) {
                        return execRule(item);
                    });
                } else {
                    result = execRule(input);
                }

                return result;
            },
            appendtext: (input, rule) => {
                let result = input;

                const execRule = (original, value) => original + value;

                if (Array.isArray(input)) {
                    result = input.map(function (item) {
                        return execRule(item, rule.value);
                    });
                } else {
                    result = execRule(input, rule.value);
                }

                return result;
            },
            prependtext: (input, rule) => {
                let result = input;

                const execRule = (original, value) => value + original;

                if (Array.isArray(input)) {
                    result = input.map(function (item) {
                        return execRule(item, rule.value);
                    });
                } else {
                    result = execRule(input, rule.value);
                }

                return result;
            },
            replacetext: (input, rule) => {
                let result = input;

                const execRule = (original, search, replacement) => original.replace(new RegExp(search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replacement);

                if (Array.isArray(input)) {
                    result = input.map(function (item) {
                        return execRule(item, rule.search, rule.replacement);
                    });
                } else {
                    result = execRule(input, rule.search, rule.replacement);
                }

                return result;
            },
            // ...additionalConfig.stringLogic,
        };

        const applyRule = (result, rule) => {
            if(typeof(rule.type) != 'undefined' && stringLogic[rule.type] != 'undefined') {
                const ruleType = rule.type ? rule.type.toLowerCase() : '';
                let func = stringLogic[ruleType] || null;

                if(func != null) {
                    return func(result, rule);
                }
            }

            return result;
        };

        let result = text;
        rules.forEach((rule) => {
            result = applyRule(result, rule);
        });

        return result;
    };

    if (typeof module !== 'undefined' && module.exports) {
        jsonStringParse.default = jsonStringParse;
        module.exports = jsonStringParse;
    } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        // register as 'classnames', consistent with npm package name
        define('jsonStringParse', [], function () {
            return jsonStringParse;
        });
    } else {
        window.jsonStringParse = jsonStringParse;
    }
}());
