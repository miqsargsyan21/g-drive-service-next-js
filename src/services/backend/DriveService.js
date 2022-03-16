import { google } from "googleapis";

export class DriveService {
    constructor () {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );

        this.oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

        this.drive = google.drive({
            version: 'v3',
            auth: this.oauth2Client,
        });
    }

    async uploadFile (fileName, fileType, file) {
        try {
            const response = await this.drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: fileType,
                },
                media: {
                    body: file,
                    mimeType: fileType,
                }
            })
        } catch (e) {
            console.log(e.message);
        }
    }
}