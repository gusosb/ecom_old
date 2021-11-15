import axios from 'axios'
import api from './api'
import baseURL from './baseURL'


const initContent = async (id) => {
    const response = await axios.get(`${baseURL}/content/${id}/`)
    return response.data
}

const getOrders = async () => {
    return api.get(`/orders/`)
}

export default {
    initContent,
    getOrders,
}