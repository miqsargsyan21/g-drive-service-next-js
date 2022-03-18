import { DriveService } from "./DriveService";

export class MainService {
    static instance;

    static getInstance = () => {
        if (!this.instance) {
            this.instance = new MainService();
        }

        return this.instance;
    }

    getDrive = () => {
        return this.driveService;
    }

    constructor () {
        this.driveService = new DriveService();
    }
}