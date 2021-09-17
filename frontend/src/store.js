import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import contentReducer from "./reducers/contentReducer"

const rootReducer = combineReducers({
    content: contentReducer,
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
))

export default store