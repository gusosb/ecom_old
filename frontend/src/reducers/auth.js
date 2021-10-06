import AuthService from "../services/auth.service"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null, error: null, }


export const register = (email, password, firstname, lastname) => {
  return async dispatch => {
    let response
    try {
      response = await AuthService.register(email,password,firstname,lastname)
    } catch (error) {
      dispatch({
        type: 'REG_ERROR',
        data: error,
      })
      return
    }
    dispatch(login(email, password))
  }
}


export const login = (email, password) => {
  return async dispatch => {
    let response
    try {
      response = await AuthService.login(email, password)
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        data: error,
      })
      return
    }
    dispatch({
      type: 'LOGIN_SUCCESS',
      data: response,
    })
  }
}
  
  
  
  
  
export const logout = () => (dispatch) => {
  AuthService.logout()
  dispatch({
    type: 'LOGOUT',
  })
}

export const refreshToken = (access) => (dispatch) => {
  dispatch({
    type: 'REFRESH_TOKEN',
    data: access,
  })
}





const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'REG_WIN':
      return {
        ...state,
        isLoggedIn: false,
      }
    case 'REGISTER_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
        error: null,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.data,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      }
    case 'REFRESH_TOKEN':
      return {
        ...state,
        user: { ...user, access: action.data },
      }
    default:
      return state
  }
}

export default authReducer