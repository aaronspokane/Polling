import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const client = axios.create({
  baseURL: BASE_URL
});

export function get(urlPath) {
  return client.get(urlPath);
}

export function post(urlPath, obj) {
  var headers = {
     'Content-Type': 'application/json'
  }
  return client.post(urlPath, JSON.stringify(obj), {"headers" : headers});
}
