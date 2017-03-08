'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeFile(pathToWrite, fileName, data) {
    return new Promise(function (resolve, reject) {
        _fs2.default.mkdir(pathToWrite, function (err) {
            if (err && err.code != 'EEXIST') {
                console.log("mkdir err", err);
                reject(err);
            } else {
                _fs2.default.writeFile(_path2.default.join(pathToWrite, fileName), data, function (err) {
                    if (err) {
                        console.log("write file err", err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

exports.default = writeFile;