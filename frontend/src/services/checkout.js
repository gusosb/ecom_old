import axios from 'axios'
import api from './api'
import baseURL from './baseURL'





const initCheckout = async (content) => {
    const response = await axios.post(`${baseURL}/create-checkout-session/`, content)
    return response.data
}

const getSESSION = async (content) => {
    return api.post('/get-success-session/', content)
}

export default {
    initCheckout,
    getSESSION,
}