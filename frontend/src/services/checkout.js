import axios from 'axios'
import api from './api'

const baseUrl = 'http://localhost:8000/api/'
//const baseUrl = 'https://api.kanindev.se/api/'



const initCheckout = async (content) => {
    const response = await axios.post(`${baseUrl}create-checkout-session/`, content)
    return response.data
}

//const getSESSION = async (content) => {
//    const response = await axios.post(`${baseUrl}get-success-session/`, content)
//    return response.data
//}

const getSESSION = async (content) => {
    return api.post('/get-success-session/', content)
}

export default {
    initCheckout,
    getSESSION,
}