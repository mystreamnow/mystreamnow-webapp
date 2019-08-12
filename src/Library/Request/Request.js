import axios from 'axios';
import jwt from 'jwt-simple';

const { NODE_ENV: run, REACT_APP_JWT_KEY: secret } = process.env;

class Request {
  constructor () {
    this.URL =
      run === 'development'
        ? 'http://local.mystreamnow.com/api/'
        : 'https://adm.mystreamnow.com/api/';

    this.Axios = axios.create({
      baseURL: `${this.URL}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getToken (email) {
    const timeRequest = (Date.now() / 1000) | 0;

    let JWTToken = jwt.encode(
      {
        sub: timeRequest,
        iss: email,
        iat: timeRequest
      },
      secret
    );

    let token = await this.Axios.post(
      '/no-auth/accessToken',
      {
        email: email
      },
      {
        headers: { Authorization: `Bearer ${JWTToken}` }
      }
    );

    return token;
  }

  async get (url) {
    return await this.Axios.get(url);
  }

  async post (url, data) {
    return await this.Axios.post(url, data, {
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  async postPrivate (url, data, token) {
    return await this.Axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

export default new Request();
