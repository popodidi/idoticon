#! /usr/bin/env node
import 'babel-polyfill';
import command from 'commander';
import defaultRender from '../renderer/default';
import path from 'path';
import moment from 'moment';

var identifier;
command
    .option('-s, --size [size]', 'size, default to 500')
    .option('-m, --margin [margin]', 'margin, default to 20')
    // .option('-t, --type [type]', 'Report type, [html]')
    .option('-o, --output [outputPath]', 'Output destination, default to ./idoticon/')
    .option('-f, --file [fileName]', 'Output file name, default to YYYYMMDD-{identifier}')
    .arguments('[identifier]')
    .action((id) => {
        identifier = id;
    })
    .parse(process.argv);

if (identifier) {
    var size = command.size || 500;
    var margin = command.margin || 20;
    var pathToWrite = command.output ? path.join(process.cwd(), command.output) : path.join(process.cwd(), './idoticon');
    var fileName = (command.file || moment().format('YYYYMMDDHHmmss') + `-${identifier}`) + '.html';
    defaultRender(identifier, size, margin, pathToWrite, fileName);
} else {
    console.log("");
    console.log("[Idoticon]  Identifier arg is required");
    console.log("");
}