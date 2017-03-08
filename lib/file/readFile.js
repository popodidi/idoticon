'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFile(path) {
    return new Promise(function (resolve, reject) {
        _fs2.default.readFile(path, function (err, data) {
            if (err) reject(err);else resolve(data);
        });
    });
}

exports.default = readFile;