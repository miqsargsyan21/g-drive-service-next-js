import { ApiService } from "./ApiService";
import { DriveService } from "./DriveService";

export class MainService {
    static instance;

    static getInstance () {
        if (!this.instance) {
            this.instance = new MainService();
        }

        return this.instance;
    }

    getApiService () {
        return this.apiService;
    }

    getDriveService () {
        return this.driveService;
    }

    constructor() {
        this.apiService = new ApiService();
        this.driveService = new DriveService(this.apiService);
    }
}