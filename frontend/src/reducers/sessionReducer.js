import checkoutService from '../services/checkout'
import { logout } from './auth'

export const checkoutSession = (content) => {
    return async dispatch => {
        let res
        try {
            res = await checkoutService.initCheckout(content)
        } catch (error) {
            dispatch(logout())
            return
        }
        dispatch({
            type: 'INIT_CHECK',
            data: res.data,
        })
    }
}

export const getSession = (content) => {
    return async dispatch => {
        const res = await checkoutService.getSESSION(content)
        dispatch({
            type: 'GET_SESS',
            data: res,
        })
    }
}


const sessionReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_CHECK':
          return action.data
        case 'GET_SESS':
            return action.data
        default:
          return state
      }
}

export default sessionReducer