import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";

export const Home = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    console.log(credentials)
    userLogin(credentials)
    .then((token) => {
      console.log(token)
      const decodedToken = jwtDecode(token)
      console.log(decodedToken)
      localStorage.setItem('token', token)
      localStorage.setItem('decodedToken', JSON.stringify(decodedToken))
    })
    .catch((err) => console.error("ha ocurrido un error", err))
  };


  return (
    <div>
      <CustomInput
        placeholder={"introduce tu nombre"}
        type={"text"}
        name={"username"}
        handler={inputHandler}
      ></CustomInput>
      <CustomInput
        placeholder={"aquí un email"}
        type={"email"}
        name={"email"}
        handler={inputHandler}
      ></CustomInput>
      <CustomInput
        placeholder={"contraseña, s'il vous plait"}
        type={"password"}
        name={"password"}
        handler={inputHandler}
      ></CustomInput>
      <h1>{credentials.name}</h1>
      <div className="apiCallButton" onClick={buttonHandler}>LOGIN</div>
      <div className="characterContainer">
      </div>
    </div>
  );
};