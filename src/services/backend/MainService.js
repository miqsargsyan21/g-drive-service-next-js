import { DriveService } from "./DriveService";

export class MainService {
    static instance;

    constructor () {
        this.driveService = new DriveService();
    };

    static getInstance = () => {
        if (!this.instance) {
            this.instance = new MainService();
        }

        return this.instance;
    };

    getDrive = () => {
        return this.driveService;
    };
}