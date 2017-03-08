import _ from 'lodash';
import utf8 from 'utf8';
import strToUtf8Arr from '../dataVisualization/strToUtf8Arr'
import reduceArr from './reduceArr';

function visualize(idStr, size, margin) {

    var utf8Str = utf8.encode(idStr);
    var utf8Arr = strToUtf8Arr(utf8Str)
    var length = utf8Arr.length;
    var max = Math.max(...utf8Arr);
    var min = Math.min(...utf8Arr);
    var sum = _.reduce(utf8Arr, (sum, n) => {
        return sum + n;
    }, 0);

    utf8Arr = reduceArr(utf8Arr, 4)
    var reduceSum = _.reduce(utf8Arr, (sum, n) => {
        return sum + n;
    }, 0);

    var colorBase40 = {
        r: normalizeAmp(sum, 40, 5000000),
        g: normalizeAmp(sum, 40, 9000000),
        b: normalizeAmp(sum, 40, 1000000)
    }

    var dots = []
    _.forEach(utf8Arr, (value, i) => {
        let side = (size - 2 * margin);
        let normalized = value / 255;
        let inverseNormalized = (255 - value) / 255;
        let rDecay = 9 / 10 * Math.exp(-(1 + value) / 1.5) + 1 / 10;
        // let rDecay = Math.exp(-(1 + value) / 1.5);
        let nDecay = Math.exp(-(1 + reduceSum) / 5000);
        let minN = 2;
        let maxN = 6;// (- Math.exp(- R/r) + 1) * 10;

        var r = normalizeAmp(inverseNormalized, 0.997, 1000) * side * rDecay + 0.03 * side;
        var R = normalizeAmp(normalized, (side / 2 - r) / 50, 5000) * 50;// * (-Math.exp(-) + 1);
        var angleOffset = normalizeAmp(normalized, 2 * Math.PI, 1000);
        var n = Math.floor(normalizeAmp(normalized, maxN, 1000) * nDecay) + minN;

        for (var j = 0; j < n; j++) {
            var dot = {
                animateDelay: (i + 1) * 200,
                center      : {
                    x: size / 2 + R * Math.cos(j * (2 * Math.PI / n) + angleOffset),
                    y: size / 2 + R * Math.sin(j * (2 * Math.PI / n) + angleOffset)
                },
                radius      : r,
                color       : {
                    r: normalizeAmp(normalized, 170, 5000000 * i) + 45 + colorBase40.r,
                    g: normalizeAmp(normalized, 170, 9000000 * i) + 45 + colorBase40.g,
                    b: normalizeAmp(normalized, 170, 1000000 * i) + 45 + colorBase40.b

                    // r: normalizeAmp(normalized, 255, 5000000 * i),
                    // g: normalizeAmp(normalized, 255, 9000000 * i),
                    // b: normalizeAmp(normalized, 255, 1000000 * i)
                }
            }
            dots = _.concat(dots, dot);
        }
    })

    // set opacity
    dots = _.map(dots, (dot) => {
        dot.color['opacity'] = 0.95;//normalizeAmp(length, 0.3, 1000) / dots.length + 0.7;
        return dot;
    })

    // put smaller in the front
    dots = _.sortBy(dots, (dot) => {
        return -dot.radius;
    })
    // put darker in the back
    // dots = _.sortBy(dots, (dot) => {
    //     var {r, g, b} = dot.color;
    //     return Math.abs((r - g) * (g - b) * (b - r))
    // })

    // modify r
    // bigger bigger, smaller smaller
    var maxR = _.last(_.sortBy(dots, (dot) => {
        return dot.radius
    })).radius;
    var minR = _.head(_.sortBy(dots, (dot) => {
        return dot.radius
    })).radius;
    if (maxR != minR) {
        dots = _.map(dots, (dot) => {
            var normalizedR = (dot.radius - minR) / (maxR - minR);
            dot.radius = Math.pow(normalizedR, 3) * (maxR - minR) + minR;
            return dot
        });
    }

    var backR = normalizeAmp(_.reduce(dots, (sum, dot) => {
            return sum + dot.color.r
        }, 0), 155, 10000) + 100;
    var backG = normalizeAmp(_.reduce(dots, (sum, dot) => {
            return sum + dot.color.g
        }, 0), 155, 10000) + 100;
    var backB = normalizeAmp(_.reduce(dots, (sum, dot) => {
            return sum + dot.color.b
        }, 0), 155, 10000) + 100;

    var background = {
        r      : backR,
        g      : backG,
        b      : backB,
        opacity: (0.8 * Math.exp(-dots.length * 3) + 0.2).toString()
    }

    return {
        background,
        idStr,
        size,
        dots
    }
}


function normalizeAmp(normalized, maxValue, amp) {
    return normalized * amp - Math.floor(normalized * amp / maxValue) * maxValue;
}

export default visualize;