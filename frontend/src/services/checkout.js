import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/'

const initCheckout = async (content) => {
    const response = await axios.post(`${baseUrl}create-checkout-session/`, content)
    return response.data
}

export default {
    initCheckout,
}