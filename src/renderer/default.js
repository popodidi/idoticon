import path from 'path';
import moment from 'moment';
import renderFile from '../fileUtil/renderFile';
import visualize from '../dataVisualization/visualize';

function render(identifier, size, margin, pathToWrite, fileName) {
    let idStr = identifier.toString();
    return renderFile(pathToWrite, fileName, visualize(idStr, size, margin));
}

export default render;