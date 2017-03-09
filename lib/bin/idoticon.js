#! /usr/bin/env node
'use strict';

require('babel-polyfill');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _default = require('../renderer/default');

var _default2 = _interopRequireDefault(_default);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var identifier;
_commander2.default.option('-s, --size [size]', 'size, default to 500').option('-m, --margin [margin]', 'margin, default to 20')
// .option('-t, --type [type]', 'Report type, [html]')
.option('-o, --output [outputPath]', 'Output destination, default to ./idoticon/').option('-f, --file [fileName]', 'Output file name, default to YYYYMMDD-{identifier}').arguments('[identifier]').action(function (id) {
    identifier = id;
}).parse(process.argv);

if (identifier) {
    var size = _commander2.default.size || 500;
    var margin = _commander2.default.margin || 20;
    var pathToWrite = _commander2.default.output ? _path2.default.join(process.cwd(), _commander2.default.output) : _path2.default.join(process.cwd(), './idoticon');
    var fileName = (_commander2.default.file || (0, _moment2.default)().format('YYYYMMDDHHmmss') + ('-' + identifier)) + '.html';
    (0, _default2.default)(identifier, size, margin, pathToWrite, fileName);
} else {
    console.log("");
    console.log("[Idoticon]  Identifier arg is required");
    console.log("");
}