import { MainService } from "../../src/services/backend/MainService";

export default async function uploadFile (req, res) {
    const googleDriveService = MainService.getInstance().getDrive();

    const {fileName, fileType, file} = JSON.parse(req.body);
    console.log(JSON.parse(req.body))
    if (fileName && fileType && file !== undefined) {
        try {
            const response = googleDriveService.uploadFile({
                fileName: fileName,
                fileType: fileType,
                file: file
            });

            res.status(201).json(response);
        } catch (e) {
            res.status(404).json(e);
        }
    } else {
        res.status(401).json({message: 'All inputs are required'});
    }
}