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
            const eid = action.data
            const found = state.find(e => e.id === eid.id && e.prodVal === eid.prodVal)
            if (found) {
                const changed = {
                    ...found,
                    quantity: found.quantity + 1
                }
                // if product id and product choice is equal then changed variable is added with +1 quantity
                return state.map(e => !(e.id === eid.id && e.prodVal === eid.prodVal) ? e : changed)
            } else {
                // product not already in cart, whole item is added
                return state.concat(action.data)
            }
        case 'REMOVE_ITEM':
            const rid = action.data
            const found2 = state.find(e => (e.id === rid.id) && (e.prodVal === rid.prodVal))
            if (found2 && found2.quantity > 1) {
                const changed2 = {
                    ...found2,
                    quantity: found2.quantity - 1
                }
                // if product id and product choice is equal then changed variable is added with -1 quantity
                return state.map(e => !(e.id === rid.id && e.prodVal === rid.prodVal) ? e : changed2)
            } else {
                // filter() method creates a new array with all elements that pass implemented test, abaying rule of immutable updates
                // quantity is 1, item with same id and choice will be filtered out
                return state.filter(e => !(e.id === rid.id && e.prodVal === rid.prodVal))
            }
        default:
          return state
      }
}

export default cartReducer