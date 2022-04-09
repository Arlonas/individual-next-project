
import { auth_reducer, content_reducer } from "./reducers";
import { combineReducers } from "redux"

export default combineReducers({
    auth: auth_reducer,
    content: content_reducer
})