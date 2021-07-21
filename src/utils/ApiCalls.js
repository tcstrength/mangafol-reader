const axios = require("axios");
const { SERVER_URL } = require("../config");
const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
    },
});

module.exports = {
    instance: instance,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    setAccessToken: (token) => localStorage.setItem("accessToken", token),
    setRefreshToken: (token) => localStorage.setItem("refreshToken", token),
};
