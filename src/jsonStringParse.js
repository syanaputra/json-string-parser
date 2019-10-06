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

                const execRule = (original, search, replacement) => original.replace(new RegExp(search, 'g'), replacement);

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

    // class StringWizard {
    //     constructor(rules = []) {
    //         this.rules = rules || [];
    //     }
    //
    //     addRule(rule) {
    //         if(typeof(this.rules) == 'undefined') {
    //             this.rules = [];
    //         }
    //
    //         this.rules.push(rule);
    //     }
    //
    //     addRules(rules = []) {
    //         var addRule = this.addRule;
    //
    //         if(rules && rules.length > 0) {
    //             console.error(rules);
    //             rules.map(function (rule) {
    //                 // console.error(rule);
    //                 addRule(rule);
    //             });
    //         }
    //     }
    //
    //     applyRule(input, rule) {
    //         var result = input;
    //         var conditions = typeof(rule.conditions) != 'undefined' ? rule.conditions : [];
    //
    //         switch(rule.type.toLowerCase()) {
    //             case 'split':
    //                 if(typeof(rule.value) != 'undefined') {
    //                     result = input.split(rule.value);
    //                 }
    //                 break;
    //
    //             case 'join':
    //                 if(Array.isArray(input)) {
    //                     if(typeof(rule.value) != 'undefined') {
    //                         result = input.join(rule.value);
    //                     }
    //                 }
    //                 else {
    //                     console.error('join - Error: Input has to be an array');
    //                 }
    //                 break;
    //
    //             case 'trim':
    //
    //                 var execRule = function(original) {
    //                     return original.trim();
    //                 };
    //
    //                 if(Array.isArray(input)) {
    //                     result = input.map(function (item) { return execRule(item); });
    //                 }
    //                 else {
    //                     result = execRule(input);
    //                 }
    //
    //                 break;
    //
    //             case 'appendtext':
    //                 if(typeof(rule.value) != 'undefined') {
    //
    //                     var execRule = function(original, value) {
    //                         return original + value;
    //                     };
    //
    //                     if(Array.isArray(input)) {
    //                         result = input.map(function (item) { return execRule(item, rule.value); });
    //                     }
    //                     else {
    //                         result = execRule(input, rule.value);
    //                     }
    //                 }
    //
    //                 break;
    //
    //             case 'prependtext':
    //                 if(typeof(rule.value) != 'undefined') {
    //
    //                     var execRule = function(original, value) {
    //                         return value + original;
    //                     };
    //
    //                     if(Array.isArray(input)) {
    //                         result = input.map(function (item) { return execRule(item, rule.value); });
    //                     }
    //                     else {
    //                         result = execRule(input, rule.value);
    //                     }
    //
    //                 }
    //
    //                 break;
    //
    //             case 'replacetext':
    //                 if(typeof(rule.search) != 'undefined') {
    //
    //                     var execRule = function(original, search, replacement) {
    //                         return original.replace(search, replacement);
    //                     };
    //
    //                     if(Array.isArray(input)) {
    //                         result = input.map(function (item) { return execRule(item, rule.search, rule.replacement || ''); });
    //                     }
    //                     else {
    //                         result = execRule(input, rule.search, rule.replacement || '');
    //                     }
    //
    //                 }
    //
    //                 break;
    //         }
    //
    //         return result;
    //     }
    //
    //     build(input) {
    //         var result = input;
    //         var applyRule = this.applyRule;
    //
    //         if(typeof(result) == 'undefined') {
    //             console.error('Input is undefined');
    //         }
    //
    //         this.rules.map(function(rule) {
    //             result = applyRule(result, rule);
    //         });
    //
    //         return result;
    //     }
    //
    // }

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
