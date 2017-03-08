import fs from 'fs';
import path from 'path';

function writeFile(pathToWrite, fileName, data) {
    return new Promise((resolve, reject) => {
        fs.mkdir(pathToWrite, (err) => {
            if (err && err.code != 'EEXIST') {
                console.log("mkdir err", err);
                reject(err);
            } else {
                fs.writeFile(path.join(pathToWrite, fileName), data, (err) => {
                    if (err) {
                        console.log("write file err", err);
                    } else {
                        resolve()
                    }
                })
            }
        })
    })
}

export default writeFile;