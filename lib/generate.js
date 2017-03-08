'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _renderFile = require('./file/renderFile');

var _renderFile2 = _interopRequireDefault(_renderFile);

var _visualize = require('./dataVisualization/visualize');

var _visualize2 = _interopRequireDefault(_visualize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generate(identifier) {
    console.log("========================================");
    var idStr = identifier.toString();
    console.log("Input: ", idStr);

    var pathToWrite = _path2.default.join(process.cwd(), './idoticon');
    var fileName = (0, _moment2.default)().format('YYYYMMDD-HHmmss') + ('-' + identifier + '.html');
    (0, _renderFile2.default)(pathToWrite, fileName, (0, _visualize2.default)(idStr)).then(function () {
        console.log("DONE!");
        console.log("========================================");
    });
}

exports.default = generate;