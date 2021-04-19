//Interface for incoming file
export interface File {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
}

//For storing the path of the file after it has been uploaded
export interface UploadedFile {
    path: string;
}