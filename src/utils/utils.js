import { GET_ERRORS } from "../actions/type";
import axios from "axios";

export const handleError = (err, dispatch) => {
    console.log(err);
    console.log(err.response);
    if (err.response) {
        if (err.response.status === 401) {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    status: err.response.status,
                    message:
                        "Phiên đăng nhập của bạn đã hết hạn.\nVui lòng đăng nhập lại!",
                },
            });
        } else if (err.response.status !== 500) {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    status: err.response.status,
                    // message: "Đã có lỗi xảy ra!",
                    message: err.response.data.error.message
                        ? err.response.data.error.message
                        : "Đã có lỗi xảy ra!",
                },
            });
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    status: err.response.status,
                    message: "Máy chủ gặp sự cố!",
                },
            });
        }
    } else
        dispatch({
            type: GET_ERRORS,
            payload: {
                message: "Đã có lỗi xảy ra!",
            },
        });
};
export function validateUrlText(string) {
    // return /(http(s?)):\/\//i.test(string);
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        string
    );
}

export const mergeTwoArrayObject = (keptArr, replacedArray) => {
    let ids = new Set(keptArr.map((d) => d.id));
    let temp = [...keptArr, ...replacedArray.filter((d) => !ids.has(d.id))];
    return temp;
};

export const formatDate = (timestamp) => {
    var d = new Date(timestamp);
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    return (
        pad(d.getHours()) +
        ":" +
        pad(d.getMinutes()) +
        " " +
        pad(d.getDate()) +
        "/" +
        pad(d.getMonth() + 1) +
        "/" +
        pad(d.getFullYear())
    );
};

export const setAuthToken = (token) => {
    axios.defaults.timeout = 30000;
    if (token) {
        // Aplly token to every request
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

// export default setAuthToken;
const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};
module.exports = isEmpty;
