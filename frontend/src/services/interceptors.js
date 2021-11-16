import axiosInstance from "./api"
import TokenService from "./token.service"
import { refreshToken, logout } from "../reducers/auth"
import { history } from '../helpers/history'


let isAlreadyFetchingAccessToken = false

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      if (token) {
        
         config.headers["Authorization"] = 'Bearer ' + token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const { dispatch } = store
  axiosInstance.interceptors.response.use(
    res => {
      return res
    },
    async error => {
      const originalConfig = error.config

      if (error.response) {
        // Access Token was expired
        if ((error.response.status === 401) && !isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          let rs
          try {
            rs = await axiosInstance.post("/token/refresh/", {
              refresh: TokenService.getLocalRefreshToken(),
            })
            const { access } = rs.data
            dispatch(refreshToken(access))
            TokenService.updateLocalAccessToken(access)
            return axiosInstance(originalConfig)
          } catch (_error) {
            dispatch(logout())
            //history.push('/login')
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data)
            }
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(error)
    }
  )
}

export default setup