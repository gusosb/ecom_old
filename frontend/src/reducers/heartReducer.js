export const heartItem = (content) => {
    return {
        type: 'HEART_ITEM',
        data: content,
    }
}

export const unheartItem = (content) => {
    return {
        type: 'UNHEART_ITEM',
        data: content,
    }
}

const heartReducer = (state=[], action) => {
    switch(action.type) {
        case 'HEART_ITEM':
            return action.data
        default:
          return state
      }
}

export default heartReducer