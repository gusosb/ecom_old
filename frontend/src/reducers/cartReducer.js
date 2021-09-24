export const addItem = (content) => {
    return {
        type: 'ADD_ITEM',
        data: content,
    }
}

export const removeItem = (content) => {
    return {
        type: 'REMOVE_ITEM',
        data: content,
    }
}

const cartReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            const eid = action.data.id
            const found = state.find(e => e.id === eid)
            if (found) {
                const changed = {
                    ...found,
                    quantity: found.quantity + 1
                }
                return state.map(e => e.id !== eid ? e : changed)
            } else {
                return state.concat(action.data)
            }
        case 'REMOVE_ITEM':
            const rid = action.data
            const found2 = state.find(e => e.id === rid)
            if (found2 && found2.quantity > 1) {
                const changed2 = {
                    ...found2,
                    quantity: found2.quantity - 1
                }
                return state.map(e => e.id !== rid ? e : changed2)
            } else {
                // filter() method creates a new array with all elements that pass implemented test, abaying rule of immutable updates
                return state.filter(e => e.id !== rid)
            }
        default:
          return state
      }
}

export default cartReducer