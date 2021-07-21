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

function getUserProfile() {
  try {
    return JSON.parse(localStorage.getItem('userProfile'))
  } catch (error) {
    return null;
  }
}

module.exports = {
  instance: instance,
  userProfile: getUserProfile(),
  setUserProfile: (profile) => localStorage.setItem('userProfile', JSON.stringify(profile)),
  bearerToken: `Bearer ${localStorage.getItem('accessToken')}`,
  accessToken: localStorage.getItem('accessToken'),
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
  refreshToken: localStorage.getItem('refreshToken'),
  setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
}