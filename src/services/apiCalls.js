import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api"
// const API_URL = "localhost:3000"


export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`)
    return res.data.results
}

const rickToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiUmljayBTYW5jaGV6Iiwic3RhdHVzIjoiYWxpdmUiLCJzcGVjaWVzIjoiaHVtYW4iLCJyb2xlIjoiYWRtaW4iLCJwYXNzd29yZCI6InNpIGVzdGUgY2FtcG8gZXN0w6EgZW4gZWwgdG9rZW4sIHRlIHZhbiBhIGRlY2lyIGVuIGxhcyBlbnRyZXZpc3RhcyB0w6ljbmljYXMgcXVlIHRlIHZheWFzIGEgY2FzYSB5IHRlIGFjdWVzdGVzIn0.gtM3-rV1AEKRMnGJDTxur8q5s-dK-DP0qKq8KHySSrA"
const mortyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiTW9ydHkgU21pdGgiLCJzdGF0dXMiOiJhbGl2ZSIsInNwZWNpZXMiOiJodW1hbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoic2kgZXN0ZSBjYW1wbyBlc3TDoSBlbiBlbCB0b2tlbiwgdGUgdmFuIGEgZGVjaXIgZW4gbGFzIGVudHJldmlzdGFzIHTDqWNuaWNhcyBxdWUgdGUgdmF5YXMgYSBjYXNhIHkgdGUgYWN1ZXN0ZXMifQ.uLELbajVdKOxRkfFmJ2l7A29fZuG61uESFPAZoXowgU"

export const userLogin = (id) => {
    if (id === "1") {
        return rickToken
    }
    if (id === "2") {
        return mortyToken
    }
    return 'el login ha salido mal, pero la función ha sido llamada, apiCalls.jsx, linea 22'
}

const login = async (credentials) => {
    const res = await axios.post('localhost:3000/auth', credentials)
    const token = res.data.token
    return token
}