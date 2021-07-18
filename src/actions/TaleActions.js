const apiCalls = require("./ApiCalls")
const API = apiCalls.instance
const PREFIX = "/tale";
const PAGING = `${PREFIX}/paging`

export const TaleActions = {
  getPaging: async (offset, limit) => {
    return API.get(PAGING, {
      params: {
        offset: offset,
        limit: limit
      },
      headers: {
        'Authorization': `Bearer ${apiCalls.accessToken}`
      }
    });
  }
}