import mustache from 'mustache';
import path from 'path';
import writeFile from './writeFile';
import readFile from './readFile';

function renderFile(pathToWrite, fileName, data) {
    var templatePath = path.join(__dirname, '../../template/default.mustache');
    return readFile(templatePath)
        .then((data) => {
            return data.toString();
        })
        .then((template) => {
            return mustache.render(template, data);
        })
        .then((dataToWrite) => {
            return writeFile(pathToWrite, fileName, dataToWrite);
        })
}

export default renderFile;