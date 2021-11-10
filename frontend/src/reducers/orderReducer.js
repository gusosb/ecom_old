import contentService from '../services/content'

export const initOrders = () => {
    return async dispatch => {
      const content = await contentService.getOrders()
      dispatch({
        type: 'INIT_ORDERS',
        data: content.data,
      })
    }
}


const orderReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_ORDERS':
          if (action.data) {
            return action.data
          } else {
            return state
          }
        default:
          return state
      }
}

export default orderReducer