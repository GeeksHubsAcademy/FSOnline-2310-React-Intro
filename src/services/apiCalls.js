import axios from "axios";

axios.defaults.baseURL = ""
// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "127.0.0.1:27017"
// const API_URL = "https://clinicamia.vercel.app"
// const API_URL = "https://dummyjson.com"

export const bringFilteredUsers = async (name, role) => {

    const res = await axios.get(`http://localhost:27017/user/megafiltro?name=${name}&role=${role}`)
    return res.data
}

export const bringAllUsers = async (page=1) => {
    const res = await axios.get(`http://localhost:27017/user/find?page=${page}`)
    console.log(res)
    return res.data
}

export const bringUsersByRole = async (role) => {
    const res = await axios.get(`http://localhost:27017/user?role=${role}`)
    return res.data
}

export const bringAllCharacters = async (url) => {
    if (url) {
        const res = await axios.get(url)
        return res.data
    } else {
    const res = await axios.get(`${API_URL}/character`)
    return res.data
    }
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
    const res = await axios.post(`http://localhost:27017/user/login`, credentials)
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