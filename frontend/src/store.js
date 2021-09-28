import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import contentReducer from "./reducers/contentReducer"
import sessionReducer from "./reducers/sessionReducer"
import cartReducer from "./reducers/cartReducer"
import heartReducer from "./reducers/heartReducer"

const rootReducer = combineReducers({
    content: contentReducer,
    session: sessionReducer,
    cart: cartReducer,
    heart: heartReducer
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
))

export default store