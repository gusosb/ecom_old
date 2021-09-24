import checkoutService from '../services/checkout'


export const checkoutSession = (content) => {
    return async dispatch => {
        const res = await checkoutService.initCheckout(content)
        dispatch({
            type: 'INIT_CHECK',
            data: res,
        })
    }
}


const sessionReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_CHECK':
          return action.data
        default:
          return state
      }
}

export default sessionReducer