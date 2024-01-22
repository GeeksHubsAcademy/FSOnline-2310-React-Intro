import axios from "axios";

export const bringAllCharacters = async () => {
    const res = await axios.get("https://rickandmortyapi.com/api/character")
    return res.data.results
}