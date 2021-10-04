import api from './api'
import TokenService from './token.service'


const register = async (email, password) => {
  return api.post('create/', {
    email,
    password,
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

const logout = () => {
  TokenService.removeUser()
}

export default {
  register,
  login,
  logout,
}