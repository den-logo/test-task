export default class ApiClient {
  get(requestUrl, payload = {}, params = {}) {
      return this.request({
          url: requestUrl,
          method: 'get',
          body: payload,
          params
      });
  }

  post(requestUrl, payload = {}) {
      return this.request({
          url: requestUrl,
          method: 'post',
          body: payload
      });
  }

  request({ url, method, params = {}, body }) {
    const init = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    if (method !== 'get' && method !== 'head') {
        init.body = JSON.stringify(body);
    }
    return fetch(url, init)
    .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json()
    })
    .then(data => {
        return data;
    })
  }
}