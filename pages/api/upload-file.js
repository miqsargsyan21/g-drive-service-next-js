import { MainService } from "../../src/services/backend/MainService";

export default async function uploadFile (req, res) {
    const googleDriveService = MainService.getInstance().getDrive();
    console.log(req.body)
    const {fileName, fileType, file} = req.body;

    if (fileName && fileType && file) {
        try {
            const response = googleDriveService.uploadFile(fileName, fileType, file);

            res.status(201).json(response);
        } catch (e) {
            res.status(404).json(e);
        }
    } else {
        res.status(401).json({message: 'All inputs are required'});
    }
}