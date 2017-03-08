'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduceArr(arr, size) {
    if (arr.length < size + 1) {
        return arr;
    } else {
        arr = _lodash2.default.map(_lodash2.default.chunk(arr, 2), function (subArr) {
            // subarr = [1,2]
            return _lodash2.default.reduce(subArr, function (sum, n) {
                return sum + n;
            }, 0);
        });
        return reduceArr(arr, size);
    }
}

exports.default = reduceArr;