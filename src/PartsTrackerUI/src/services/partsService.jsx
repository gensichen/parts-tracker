import axios from 'axios'
const API_URL = 'https://localhost:44349/api/Parts/'

// get all parts
// const getAll = () => { 
//   axios.get(API_URL)
//     .then(response => response.data)
//     .catch(error => {
//       console.error('There was an error fetching the parts!', error)
//       throw error
//     })
// }
const getAll = () => {
    const request = axios.get(API_URL)
    return request.then(response => response.data)
}

// deleting a part
const remove = (partNumber) => {
    const request = axios.delete(`${baseUrl}/${partNumber}`)
    return request
}

const partsService = {
    getAll,
    remove
}

export default partsService