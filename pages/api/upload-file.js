import { MainService } from "../../src/services/backend/MainService";
import middleware from'./middleware/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, { status }) => {
    const googleDriveService = MainService.getInstance().getDrive();
    const [ file ] = req["files"].file;
    const requestBody = req["body"];

    if (file !== undefined) {
        try {
            const responseFolder = await googleDriveService.createFolder({
                name: requestBody.name[0],
                position: requestBody.position[0],
            });

            if (responseFolder.status === 200) {
                const response = await googleDriveService.uploadFile({
                    fileName: file.originalFilename,
                    fileType: file.headers["content-type"],
                    file: file,
                    folderID: responseFolder.folderID,
                });

                status(200).json(response);
            } else {
                status(400).json(responseFolder);
            }
        } catch (e) {
            status(400).json(e);
        }
    } else {
        status(400).json({ message: 'All inputs are required' });
    }
});

export const config = {
    api: {
        bodyParser: false,
    }
};

export default handler;