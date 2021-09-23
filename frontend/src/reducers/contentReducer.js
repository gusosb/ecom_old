import contentService from '../services/content'

export const initContent = (id) => {
    return async dispatch => {
      const content = await contentService.initContent(id)
      dispatch({
        type: 'INIT_CONT',
        data: content,
      })
    }
}


const contentReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_CONT':
          return action.data
        default:
          return state
      }
}

export default contentReducer