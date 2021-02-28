import axios from 'axios';

const Client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setContentTypeJson() {
  Client.defaults.headers['Content-Type'] = 'application/json';
}

export function setContentTypeFormData() {
  delete Client.defaults.headers['Content-Type'];
}

export default Client;
