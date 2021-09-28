import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/content'
//const baseUrl = 'https://api.kanindev.se/api/content'

const initContent = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/`)
    return response.data
}

export default {
    initContent,
}