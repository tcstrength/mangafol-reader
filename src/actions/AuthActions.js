const apiCalls = require("./../utils/ApiCalls");
const API = apiCalls.instance;
const PREFIX = "/auth";
const LOGIN = `${PREFIX}/login`
const REGISTER = `${PREFIX}/register`

export const AuthActions = {
  login: async (uname, passwd) => {
    var status = false;

    try {
      const resp = await API.post(LOGIN, {
        uname: uname,
        passwd: passwd,
      });

      console.log(resp);
      const { accessToken, refreshToken } = resp.data.content
      apiCalls.setAccessToken(accessToken);
      apiCalls.setRefreshToken(refreshToken);
      status = true;
    } catch (error) {
      console.log(error.response);
    }

    return status;
  },
  register: async (uname, passwd, firstName, lastName) => {
    var status = false;

    try {
      const resp = await API.post(REGISTER, {
        uname: uname,
        passwd: passwd,
        firstName: firstName,
        lastName: lastName
      })

      console.log(resp);
      status = true;
    } catch (error) {
      console.log(error.response);
    }

    return status;
  },
  clear: () => {
    apiCalls.setUserProfile(null);
    apiCalls.setAccessToken(null);
    apiCalls.setRefreshToken(null);
  }
}
