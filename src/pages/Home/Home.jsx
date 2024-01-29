import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";

export const Home = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    userLogin(credentials)
    .then((token) => {
      console.log(token)
      const decodedToken = jwtDecode(token)
      console.log(decodedToken)
      localStorage.setItem('token', token)
      localStorage.setItem('decodedToken', decodedToken)
    })
  };


  return (
    <div>
      <CustomInput
        type={"text"}
        name={"username"}
        handler={inputHandler}
      ></CustomInput>
      <CustomInput
        type={"email"}
        name={"email"}
        handler={inputHandler}
      ></CustomInput>
      <CustomInput
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
