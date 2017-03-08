'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderFile(pathToWrite, fileName, data) {
    var templatePath = _path2.default.join(__dirname, '../../template/default.mustache');
    return (0, _readFile2.default)(templatePath).then(function (data) {
        return data.toString();
    }).then(function (template) {
        return _mustache2.default.render(template, data);
    }).then(function (dataToWrite) {
        return (0, _writeFile2.default)(pathToWrite, fileName, dataToWrite);
    });
}

exports.default = renderFile;