import { MainService } from "../../src/services/backend/MainService";
import middleware from'./middleware/middleware';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
    const googleDriveService = MainService.getInstance().getDrive();
    const file = req.files.file[0];

    if (file !== undefined) {
        try {
            const responseFolder = await googleDriveService.createFolder({
                name: req.body.name[0],
                position: req.body.position[0],
            });

            if (responseFolder.status === 200) {
                const response = await googleDriveService.uploadFile({
                    fileName: file.originalFilename,
                    fileType: file.headers["content-type"],
                    file: file,
                    folderID: responseFolder.folderID,
                });

                res.status(201).json(response);
            } else {
                res.status(401).json(responseFolder);
            }
        } catch (e) {
            res.status(404).json(e);
        }
    } else {
        res.status(401).json({message: 'All inputs are required'});
    }
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;