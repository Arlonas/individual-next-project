import thunk from "redux-thunk"
import { auth_reducer, content_reducer, network_reducer } from "./reducers";
import { createStore, applyMiddleware, combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: auth_reducer,
    content: content_reducer,
    network: network_reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store