import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

export const Profile = () => {
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('decoded'))
    const token = localStorage.getItem('token')
 
    useEffect(() => {
        if (!userData) {
            navigate('/register')
        }
    }, [])

    return (
        <div className="profileDesign">
            <h1>HOLA SOOY PROFILE</h1>
            <h2>nombre:{userData.name}</h2>
            <h2>estado: {userData.status}</h2>
            <h2>especie:{userData.species}</h2>
            <h2>especie:{userData.role}</h2>
            <h2 id="importante"> CONTRASEÑA??????{userData.password}</h2>
        </div>
    )
}