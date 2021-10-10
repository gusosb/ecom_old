import axios from 'axios'
import api from './api'

const baseUrl = 'http://localhost:8000/api'
//const baseUrl = 'https://api.kanindev.se/api'

const initContent = async (id) => {
    const response = await axios.get(`${baseUrl}/content/${id}/`)
    return response.data
}

const getOrders = async () => {
    return api.get(`/orders/`)
}

export default {
    initContent,
    getOrders,
}