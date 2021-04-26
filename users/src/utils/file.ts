import fs from 'fs';

export const deleteFile = (filePath: string) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw err;
        }
    })
}

export const renameFile = (oldPath: string, newPath: string) => {
    fs.rename(oldPath, newPath, (err) => {
        if(err) {
            throw err;
        }
    })
}