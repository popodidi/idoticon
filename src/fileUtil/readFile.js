import fs from 'fs';

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

export default readFile;