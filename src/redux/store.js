import { auth_reducer } from "./reducers"
import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'


export default combineReducers({
    auth: auth_reducer
})


const store = createStore(rootReducer, applyMiddleware(thunk) )