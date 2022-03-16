export class DriveService {
    constructor ( apiService ) {
        this.apiService = apiService;
    }

    async uploadFile (fileName, fileType, file) {
        return this.apiService.uploadFile(fileName, fileType, file);
    }
}