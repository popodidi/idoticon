'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _renderFile = require('../fileUtil/renderFile');

var _renderFile2 = _interopRequireDefault(_renderFile);

var _visualize = require('../dataVisualization/visualize');

var _visualize2 = _interopRequireDefault(_visualize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(identifier, size, margin, pathToWrite, fileName) {
    var idStr = identifier.toString();
    return (0, _renderFile2.default)(pathToWrite, fileName, (0, _visualize2.default)(idStr, size, margin)).then(function () {});
}

exports.default = render;