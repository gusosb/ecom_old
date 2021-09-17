import axios from 'axios'
import React from 'react'

const baseUrl = 'http://localhost:8000/api/content'

const initContent = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default {
    initContent,
}
