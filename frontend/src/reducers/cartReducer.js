
export const addItem = (content) => {
    return {

        type: 'ADD_ITEM',
        data: content,
    }
}


const cartReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_ITEM':
          return action.data
        default:
          return state
      }
}

export default cartReducer