import qs from 'querystring';
import { CONTENT_TYPES, HEADERS } from './consts';

export class HttpService {
    host;

    constructor(host = '') {
      this.host = host;
    };

    async request(params) {
      let { path = '/', method, query = {}, headers = {}, body, timeout = 10000 } = params;
      let url = `${this.host}${path}`;
      if (Object.keys(query).length) {
        const querystring = qs.stringify(query);
        url = `${url}?${querystring}`;
      }

      const reqCt = headers[HEADERS.CONTENT_TYPE];
      if (reqCt === CONTENT_TYPES.JSON) {
        body = JSON.stringify(body);
      } else if (reqCt === CONTENT_TYPES.FORM_DATA) {
        body = qs.stringify(body);
      } else {
        body = JSON.stringify(body);
      }

      let response = {
        hasError: true,
      };
      try {
        const res = await fetch(url, {
          method,
          headers,
          body,
          timeout,
        });
        const resCt = res.headers.get(HEADERS.CONTENT_TYPE);
        let resBody;
        if (resCt) {
          if (resCt.includes(CONTENT_TYPES.JSON)) {
            resBody = await res.json();
          } else if (resCt.includes(CONTENT_TYPES.FORM_DATA)) {
            resBody = await res.formData();
          } else {
            resBody = await res.text();
          }
        }

        response = {
          headers: res.headers,
          body: resBody,
          status: res.status,
          statusText: res.statusText,
          hasError: res.status >= 400,
        };
      } catch (e) {
        response = {
          hasError: true,
          error: e,
        };
      }

      if (response.hasError) {
        return Promise.reject(response);
      }

      return response;
    }

    get(path, headers, query) {
      return this.request({
        method: 'GET',
        path,
        headers,
        query
      });
    }

    post(path, headers, body, query) {
      return this.request({
        method: 'POST',
        path,
        headers,
        query,
        body,
      });
    }

    put(path, headers, body, query) {
      return this.request({
        method: 'PUT',
        path,
        headers,
        query,
        body,
      });
    }

    delete(path, headers, body, query) {
      return this.request({
        method: 'DELETE',
        path,
        headers,
        query,
        body,
      });
    }
}
