import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  //baseURL: "https://api.kanindev.se/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance