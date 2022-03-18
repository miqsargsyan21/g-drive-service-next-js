export class DriveService {
    constructor () {
        this.path = 'api/upload-file'
    }

    async uploadFile (formData) {
        return await fetch('api/upload-file', {
            headers: {
                'Accept': '*/*',
            },
            method: 'POST',
            body: formData
        });
    }
}