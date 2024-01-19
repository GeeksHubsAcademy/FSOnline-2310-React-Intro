import { useEffect, useState } from "react"
import "./Body.css"

export const Body = () => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const inputHandler = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value

        if (inputName === 'name') {
            setUserName(inputValue)
        }
        if (inputName === 'email') {
            setUserEmail(inputValue)
        }
    }

    useEffect(() => {
            console.log(userName, 'name')
            console.log(userEmail, 'email')
    }, [userName, userEmail])

    return (
        <div className="miDiv">
            <input type="text" name="name" onChange={(e) => inputHandler(e)}></input>
            <input type="email" name="email" onChange={(e) => inputHandler(e)}></input>
            <h1>{userName}</h1>
        </div>
    )
}