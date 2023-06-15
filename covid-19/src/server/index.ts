import axios from 'axios'

const serve = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getList = () => serve.get('/').then(res => res.data)