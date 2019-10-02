var assert = require('assert');
var StringWizard = require('../index.js');

describe('StringWizard', function () {
    describe('Basic Functions', function () {
        describe('# trim', function () {

            it('trims given text', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "trim",
                });

                assert.equal(sw.build(" text "), 'text');
            });

            it('trims given array', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "trim",
                });

                var result = sw.build([' a ', ' aa ']);

                assert.equal(result[0], 'a');
                assert.equal(result[1], 'aa');
            });

        });

        describe('# split', function () {

            it('split text into array', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "split",
                    "value": ",",
                });

                var result = sw.build("1,2");

                assert.equal(result[0], '1');
                assert.equal(result[1], '2');
            });

        });

        describe('# join', function () {

            it('join array into text', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "join",
                    "value": ",",
                });

                assert.equal(sw.build([1, 2]), '1,2');
            });

        });

        describe('# prependText', function () {

            it('prepend text with text', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "prependText",
                    "value": "lorem",
                });

                assert.equal(sw.build('ipsum'), 'loremipsum');
            });

        });

        describe('# appendText', function () {

            it('append text with text', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "appendText",
                    "value": "lorem",
                });

                assert.equal(sw.build('ipsum'), 'ipsumlorem');
            });

        });

        describe('# replaceText', function () {

            it('replace text with a new one', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "replaceText",
                    "search": "a",
                    "replacement": "e",
                });

                assert.equal(sw.build('ball'), 'bell');
            });

        });

        describe('# invalid rule', function () {

            it('ignores undefined rule', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "randomrulethatdoesnotexist",
                    "value": "lorem",
                });

                assert.equal(sw.build('lorem'), 'lorem');
            });

        });
    });

    describe('Complex Scenarios', function () {

        describe('# 1 - split > prependText', function () {

            it('should add "order-" in front of array of numbers', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "split",
                    "value": ",",
                });
                sw.addRule({
                    "type": "prependtext",
                    "value": "order-",
                    "conditions": [],
                });

                var result = sw.build('1,2');

                assert.equal(result[0], 'order-1');
                assert.equal(result[1], 'order-2');
            });

        });

        describe('# 2 - split (,) > trim > prependText > join (-)', function () {

            it('should add "x" and combined with "-', function () {
                var sw = new StringWizard([]);
                sw.addRule({
                    "type": "split",
                    "value": ",",
                });
                sw.addRule({
                    "type": "trim",
                });
                sw.addRule({
                    "type": "prependtext",
                    "value": "x",
                    "conditions": [],
                });
                sw.addRule({
                    "type": "join",
                    "value": "-",
                });

                var result = sw.build(' 100 , 530');

                assert.equal(result, 'x100-x530');
            });

        });
    });
});
