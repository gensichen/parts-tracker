import axios from 'axios'
const API_URL = 'https://localhost:44349/api/parts'

// get all parts
const getAll = () => {
    const request = axios.get(API_URL)
    return request.then(response => response.data)
}

// get specific part
const getPart = (part) => {
    const request = axios.get(`${API_URL}/${part.partNumber}`)
    return request.then(response => response.data)
}

// deleting a part
const remove = (partNumber) => {
    const request = axios.delete(`${API_URL}/${partNumber}`)
    return request
}

// creating a new part
const create = (newObject) => {
    const request = axios.post(API_URL, newObject)
    return request.then(response => response.data)
}

// updating a part
const update = (partNumber, newObject) => {
    const request = axios.put(`${API_URL}/${partNumber}`, newObject)
    return request.then(response => response.data)
}


const partsService = {
    getAll,
    getPart,
    remove,
    create,
    update
}

export default partsService