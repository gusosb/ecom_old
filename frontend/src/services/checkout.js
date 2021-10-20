import api from './api'


const initCheckout = async (content) => {
    return api.post('/create-checkout-session/', content)
}


const getSESSION = async (content) => {
    return api.post('/get-success-session/', content)
}

export default {
    initCheckout,
    getSESSION,
}