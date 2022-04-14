import { auth_reducer, network_reducer } from "./reducers"
import { combineReducers } from "redux"

export default combineReducers ({
    auth: auth_reducer,
    network: network_reducer
})