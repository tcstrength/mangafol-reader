const apiCalls = require("./../utils/ApiCalls");
const API = apiCalls.instance;
const PREFIX = "/auth";
const LOGIN = `${PREFIX}/login`;

export const AuthActions = {
    login: async (uname, passwd) => {
        var status = false;

        try {
            const resp = await API.post(LOGIN, {
                uname: uname,
                passwd: passwd,
            });

            console.log(resp);
            const { accessToken, refreshToken } = resp.data.content;
            apiCalls.setAccessToken(accessToken);
            apiCalls.setRefreshToken(refreshToken);
            status = true;
        } catch (error) {
            console.log(error.response.data.error);
        }

        return status;
    },
};
