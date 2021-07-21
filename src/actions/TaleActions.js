const apiCalls = require("./../utils/ApiCalls");
const API = apiCalls.instance;
const PREFIX = "/tale";
const PAGING = `${PREFIX}/paging`;

export const TaleActions = {
  getPaging: async (offset, limit) => {
    console.log(apiCalls.accessToken)
    return API.get(PAGING, {
      params: {
        offset: offset,
        limit: limit
      },
      headers: {
        'Authorization': apiCalls.bearerToken
      }
    });
  },

  getById: async (id) => {
    console.log("Get by id", id);
    return API.get(PREFIX, {
      params: {
        id: id
      },
      headers: {
        'Authorization': apiCalls.bearerToken
      }
    })
  }
}
