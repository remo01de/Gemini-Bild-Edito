export interface UploadedFile {
    base64: string;
    mimeType: string;
}

export interface HistoryItem {
    id: string;
    originalFile: UploadedFile;
    editedImages: string[];
    prompt: string;
}
