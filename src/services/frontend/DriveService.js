export class DriveService {
    constructor () {
        this.path = 'api/upload-file';
    };

    async uploadFile (formData) {
        return await fetch(this.path, {
            headers: {
                'Accept': '*/*',
            },
            method: 'POST',
            body: formData,
        });
    };
}