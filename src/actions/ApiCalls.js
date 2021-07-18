const axios = require('axios');
const instance = axios.create({
  // baseURL: 'https://mangafol-api.herokuapp.com/api',
  baseURL: 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  }
});

module.exports = {
  instance: instance,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
  setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
}