var assert = require('assert');
var jsonStringParse = require('../src/jsonStringParse.js');

describe('jsonStringParse', function () {
    describe('Basic Functions', function () {
        describe('# trim', function () {

            it('trims given text', function () {
                var text = " text ",
                    rules = [{
                        "type": "trim",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'text');
            });

            it('trims given array', function () {
                var text = [' a ', ' aa '],
                    rules = [{
                        "type": "trim",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result[0], 'a');
                assert.equal(result[1], 'aa');
            });

        });

        describe('# split', function () {

            it('split text into array', function () {
                var text = "1,2",
                    rules = [{
                        "type": "split",
                        "value": ",",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result[0], '1');
                assert.equal(result[1], '2');
            });

        });

        describe('# join', function () {

            it('join array into text', function () {
                var text = [1, 2],
                    rules = [{
                        "type": "join",
                        "value": ",",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, '1,2');
            });

        });

        describe('# prependText', function () {

            it('prepend text with text', function () {
                var text = "ipsum",
                    rules = [{
                        "type": "prependText",
                        "value": "lorem",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'loremipsum');
            });

        });

        describe('# appendText', function () {

            it('append text with text', function () {
                var text = "ipsum",
                    rules = [{
                        "type": "appendText",
                        "value": "lorem",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'ipsumlorem');
            });

        });

        describe('# replaceText', function () {

            it('replace text with a new one', function () {
                var text = "ball",
                    rules = [{
                        "type": "replaceText",
                        "search": "a",
                        "replacement": "e",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'bell');
            });

            it('replace text which appears more than once', function () {
                var text = "ball",
                    rules = [{
                        "type": "replaceText",
                        "search": "l",
                        "replacement": "r",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'barr');
            });

        });

        describe('# invalid rule', function () {

            it('ignores undefined rule', function () {
                var text = "lorem",
                    rules = [{
                        "type": "randomrulethatdoesnotexist",
                        "value": "lorem",
                    }],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'lorem');
            });

        });
    });

    describe('Complex Scenarios', function () {

        describe('# 1 - split > prependText', function () {

            it('should add "order-" in front of array of numbers', function () {
                var text = "1,2",
                    rules = [
                        {
                            "type": "split",
                            "value": ",",
                        },
                        {
                            "type": "prependtext",
                            "value": "order-",
                            "conditions": [],
                        }
                    ],
                    result = jsonStringParse(text, rules);

                assert.equal(result[0], 'order-1');
                assert.equal(result[1], 'order-2');
            });

        });

        describe('# 2 - split (,) > trim > prependText > join (-)', function () {

            it('should add "x" and combined with "-', function () {
                var text = " 100 , 530",
                    rules = [
                        {
                            "type": "split",
                            "value": ",",
                        },
                        {
                            "type": "trim",
                        },
                        {
                            "type": "prependtext",
                            "value": "x",
                            "conditions": [],
                        },
                        {
                            "type": "join",
                            "value": "-",
                        }
                    ],
                    result = jsonStringParse(text, rules);

                assert.equal(result, 'x100-x530');
            });

        });
    });
});
