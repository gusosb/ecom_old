const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?.refresh
}
  
const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?.access
}
  
const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"))
    user.access = token
    localStorage.setItem("user", JSON.stringify(user))
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}
  
const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

const removeUser = () => {
    localStorage.removeItem("user")
}
  
export default {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
}