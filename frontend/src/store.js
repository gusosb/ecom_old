import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import contentReducer from "./reducers/contentReducer"
import sessionReducer from "./reducers/sessionReducer"
import cartReducer from "./reducers/cartReducer"

const rootReducer = combineReducers({
    content: contentReducer,
    session: sessionReducer,
    cart: cartReducer,
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
))

export default store