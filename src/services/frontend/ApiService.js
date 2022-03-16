import { HttpService } from '../common/HttpService';
import { CONTENT_TYPES, HEADERS } from '../common/consts';

const PATHS = {
  UPLOAD_FILE: 'api/upload-file',
};

export class ApiService extends HttpService {
  post(path, headers, body, query) {
    headers = {
      [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
      ...headers
    };

    return super.post(path, headers, body, query);
  }

  uploadFile(fileName, fileType, file){
    return this.post(
      PATHS.UPLOAD_FILE, {
        'Content-Type': 'multipart/form-data',
      }, { fileName, fileType, file }
    );
  }
}
