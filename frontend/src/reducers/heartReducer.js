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
            const eid = action.data.id
            const found = state.find(e => e.id === eid)
            if (found) {
                return state
            } else {
                return state.concat(action.data)
            }
        case 'UNHEART_ITEM':
            const rid = action.data
            return state.filter(e => e.id !== rid)
        default:
          return state
      }
}

export default heartReducer