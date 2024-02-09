import axios from "axios";

// const API_URL = "https://rickandmortyapi.com/api"
// const API_URL = "localhost:3000"
const API_URL = "https://clinicamia.vercel.app"
// const API_URL = "https://dummyjson.com"

export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`)
    return res.data.user
}

export const bringAllUsers = async () => {
    
    const res = await axios.get(`${API_URL}/user/find`)
    return res.data
}

export const deleteUser = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_URL}/user/delete/${id}`, config)
}

export const bringUserById = async (id) => {
    const res = await axios.get(`${API_URL}/users/${id}`)
    return res.data
}

export const userLogin = async (credentials) => {
    console.log(credentials)
    const res = await axios.post(`${API_URL}/user/login`, credentials)
    return res.data.token
}

export const getUserById = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const res = await axios.get(`${API_URL}/user/${id}`, config)
    return res.data
}



/* 


typeError: cannot read properties of undefined (reading token, role)

id === undefined NO 
algo.id ---> algo === undefined <---


*/