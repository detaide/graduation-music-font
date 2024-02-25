import axios from 'axios'
let service = axios.create({
    baseURL:'http://127.0.0.1:3000',
    timeout:5000,
})
export default service

export let  localService = axios.create({
    timeout : 5000,
})