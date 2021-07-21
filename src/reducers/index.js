import { authReducer } from "./authReducer";
import { combineReducers } from "redux";
import { defaultReducer } from "./defaultReducer";
import { errorReducer } from "./errorReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    default: defaultReducer,
});
