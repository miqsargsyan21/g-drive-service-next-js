import { google } from "googleapis";
import fs from "fs";

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

    async createFolder({ name, position }) {
        try {
            const folder = await this.drive.files.create({
                resource: {
                    name: `${name} | ${position}`,
                    mimeType: 'application/vnd.google-apps.folder'
                }
            });

            return {
                status: 200,
                folderID: folder.data.id,
            };
        } catch (e) {
            return {
                status: 400,
                message: e.message,
            };
        }
    }

    async uploadFile ({fileName, fileType, file, folderID}) {
        try {
            return await this.drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: fileType,
                    parents: [folderID]
                },
                media: {
                    body: fs.createReadStream(file.path),
                    mimeType: fileType,
                }
            })
        } catch (e) {
            return {
                status: 400,
                message: e.message,
            };
        }
    }
}