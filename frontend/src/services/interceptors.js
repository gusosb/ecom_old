import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../reducers/auth";

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
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== "/token/" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const rs = await axiosInstance.post("/token/refresh/", {
              refresh: TokenService.getLocalRefreshToken(),
            })

            const { access } = rs.data

            dispatch(refreshToken(access))
            TokenService.updateLocalAccessToken(access)

            return axiosInstance(originalConfig)
          } catch (_error) {
            
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    }
  )
}

export default setup