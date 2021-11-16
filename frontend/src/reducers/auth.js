import AuthService from "../services/auth.service"
import { history } from '../helpers/history'



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

export const resetPass = (content) => {
  return async dispatch => {
    await AuthService.reset(content)
    dispatch({
      type: 'RESET_PASS',
    })
  }
}

export const changePass = (content) => {
  return async dispatch => {
    try {
      await AuthService.change(content)
    } catch (error) {
      return
    }
    dispatch({
      type: 'CHANGE_SUCCESS'
    })
    history.push('/home')
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

export const clearError = () => {
  return {
    type: 'CLEAR_ERR',
  }
}


const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'REG_WIN':
      return {
        ...state,
        isLoggedIn: false,
      }
    case 'REG_ERROR':
      return {
        ...state,
        isLoggedIn: false,
        error: action.data,
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
    case 'CLEAR_ERR':
      return {
        ...state,
        error: null,
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
    case 'RESET_PASS':
      return state
    default:
      return state
  }
}

export default authReducer