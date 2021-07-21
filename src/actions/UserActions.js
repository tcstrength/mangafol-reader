const apiCalls = require("./ApiCalls")
const API = apiCalls.instance
const PREFIX = "/user";
const ME = `${PREFIX}/me`;

export const UserActions = {
  me: async () => {
    const promise = await API.get(ME, {
      headers: {
        'Authorization': apiCalls.bearerToken
      }
    })

    return promise;
  }
}
