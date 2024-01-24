import axios from "axios";

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "localhost:3000"


export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`)
    return res.data.results
}