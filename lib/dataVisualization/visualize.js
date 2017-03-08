'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utf = require('utf8');

var _utf2 = _interopRequireDefault(_utf);

var _strToUtf8Arr = require('../dataVisualization/strToUtf8Arr');

var _strToUtf8Arr2 = _interopRequireDefault(_strToUtf8Arr);

var _reduceArr = require('./reduceArr');

var _reduceArr2 = _interopRequireDefault(_reduceArr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function visualize(idStr, size, margin) {

    var utf8Str = _utf2.default.encode(idStr);
    var utf8Arr = (0, _strToUtf8Arr2.default)(utf8Str);
    var length = utf8Arr.length;
    var max = Math.max.apply(Math, _toConsumableArray(utf8Arr));
    var min = Math.min.apply(Math, _toConsumableArray(utf8Arr));
    var sum = _lodash2.default.reduce(utf8Arr, function (sum, n) {
        return sum + n;
    }, 0);

    utf8Arr = (0, _reduceArr2.default)(utf8Arr, 4);
    var reduceSum = _lodash2.default.reduce(utf8Arr, function (sum, n) {
        return sum + n;
    }, 0);

    var colorBase40 = {
        r: normalizeAmp(sum, 40, 5000000),
        g: normalizeAmp(sum, 40, 9000000),
        b: normalizeAmp(sum, 40, 1000000)
    };

    var dots = [];
    _lodash2.default.forEach(utf8Arr, function (value, i) {
        var side = size - 2 * margin;
        var normalized = value / 255;
        var inverseNormalized = (255 - value) / 255;
        var rDecay = 9 / 10 * Math.exp(-(1 + value) / 1.5) + 1 / 10;
        // let rDecay = Math.exp(-(1 + value) / 1.5);
        var nDecay = Math.exp(-(1 + reduceSum) / 5000);
        var minN = 2;
        var maxN = 6; // (- Math.exp(- R/r) + 1) * 10;

        var r = normalizeAmp(inverseNormalized, 0.997, 1000) * side * rDecay + 0.03 * side;
        var R = normalizeAmp(normalized, (side / 2 - r) / 50, 5000) * 50; // * (-Math.exp(-) + 1);
        var angleOffset = normalizeAmp(normalized, 2 * Math.PI, 1000);
        var n = Math.floor(normalizeAmp(normalized, maxN, 1000) * nDecay) + minN;

        for (var j = 0; j < n; j++) {
            var dot = {
                animateDelay: (i + 1) * 200,
                center: {
                    x: size / 2 + R * Math.cos(j * (2 * Math.PI / n) + angleOffset),
                    y: size / 2 + R * Math.sin(j * (2 * Math.PI / n) + angleOffset)
                },
                radius: r,
                color: {
                    r: normalizeAmp(normalized, 170, 5000000 * i) + 45 + colorBase40.r,
                    g: normalizeAmp(normalized, 170, 9000000 * i) + 45 + colorBase40.g,
                    b: normalizeAmp(normalized, 170, 1000000 * i) + 45 + colorBase40.b

                    // r: normalizeAmp(normalized, 255, 5000000 * i),
                    // g: normalizeAmp(normalized, 255, 9000000 * i),
                    // b: normalizeAmp(normalized, 255, 1000000 * i)
                }
            };
            dots = _lodash2.default.concat(dots, dot);
        }
    });

    // set opacity
    dots = _lodash2.default.map(dots, function (dot) {
        dot.color['opacity'] = 0.95; //normalizeAmp(length, 0.3, 1000) / dots.length + 0.7;
        return dot;
    });

    // put smaller in the front
    dots = _lodash2.default.sortBy(dots, function (dot) {
        return -dot.radius;
    });
    // put darker in the back
    // dots = _.sortBy(dots, (dot) => {
    //     var {r, g, b} = dot.color;
    //     return Math.abs((r - g) * (g - b) * (b - r))
    // })

    // modify r
    // bigger bigger, smaller smaller
    var maxR = _lodash2.default.last(_lodash2.default.sortBy(dots, function (dot) {
        return dot.radius;
    })).radius;
    var minR = _lodash2.default.head(_lodash2.default.sortBy(dots, function (dot) {
        return dot.radius;
    })).radius;
    if (maxR != minR) {
        dots = _lodash2.default.map(dots, function (dot) {
            var normalizedR = (dot.radius - minR) / (maxR - minR);
            dot.radius = Math.pow(normalizedR, 3) * (maxR - minR) + minR;
            return dot;
        });
    }

    var backR = normalizeAmp(_lodash2.default.reduce(dots, function (sum, dot) {
        return sum + dot.color.r;
    }, 0), 155, 10000) + 100;
    var backG = normalizeAmp(_lodash2.default.reduce(dots, function (sum, dot) {
        return sum + dot.color.g;
    }, 0), 155, 10000) + 100;
    var backB = normalizeAmp(_lodash2.default.reduce(dots, function (sum, dot) {
        return sum + dot.color.b;
    }, 0), 155, 10000) + 100;

    var background = {
        r: backR,
        g: backG,
        b: backB,
        opacity: (0.8 * Math.exp(-dots.length * 3) + 0.2).toString()
    };

    return {
        background: background,
        idStr: idStr,
        size: size,
        dots: dots
    };
}

function normalizeAmp(normalized, maxValue, amp) {
    return normalized * amp - Math.floor(normalized * amp / maxValue) * maxValue;
}

exports.default = visualize;