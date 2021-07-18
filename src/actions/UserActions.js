const API = require("./ApiCalls").instance
const PREFIX = "/user";
const ME = `${PREFIX}/me`

export const UserActions = {
  me: async () => {
    try {
      const resp = await API.post(LOGIN, {
        uname: uname,
        passwd: passwd
      })

      console.log(resp);
      const { accessToken, refreshToken } = resp.data.content
      localStorage.setItem(ACCESS_KEY, accessToken);
      localStorage.setItem(REFRESH_KEY, refreshToken);
      status = true;
    } catch (error) {
    }

    return status;
  }
}