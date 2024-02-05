import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";

export const Home = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // instancio redux en modo escritura
  const dispatch = useDispatch()

  // instancio redux en modo lectura
  const userRdxData = useSelector(userData)

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    userLogin(credentials)
    .then((token) => {
      const decodedToken = jwtDecode(token)
      
      const data = {
        token: token,
        userData: decodedToken
      }
      dispatch(login({credentials: data}))
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

