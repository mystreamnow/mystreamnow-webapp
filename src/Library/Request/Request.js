import axios from 'axios';
const { NODE_ENV: run } = process.env;

class Request {
  constructor () {
    this.URL =
      run === 'development'
        ? 'http://localhost:4000/'
        : 'https://api.wmvisit.com/';

    this.Axios = axios.create({
      baseURL: `${this.URL}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async get (url) {
    return await this.Axios.get(url);
  }

  async post (url, data) {
    return await this.Axios.post(url, data);
  }
}

export default new Request();
