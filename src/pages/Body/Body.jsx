import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Personajes } from "../Personajes/Personajes"
import { CharacterDetail } from "../CharacterDetail/CharacterDetail"

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/personajes" element={<Personajes />} />
                <Route path="/characterdetail" element={<CharacterDetail />} />
                
            </Routes>
        </>
    )
}