import api from './api'
import axios from 'axios'
import TokenService from './token.service'
import baseURL from './baseURL'


const register = async (email, password, firstname, lastname) => {
  return api.post('create/', {
    email,
    password,
    firstname,
    lastname,
  })
}


const login = async (email, password) => {
  return api
    .post('token/', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data)
      }
      return response.data
    })
}

const reset = async (content) => {
  const response = await axios.post(`${baseURL}/reset_password/`, content)
  return response.data
}

const change = async (content) => {
  const response = await axios.post(`${baseURL}/reset_password_confirm/`, content)
  return response.data
}

const logout = () => {
  TokenService.removeUser()
}

export default {
  register,
  login,
  logout,
  reset,
  change,
}