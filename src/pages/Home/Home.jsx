import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";
import { inputValidator, keyValidator } from "../../services/validator";

export const Home = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    errorStatus: "",
    errorMessage: "",
  });
  const [smShow, setSmShow] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "password") {
      
      // este inputValidator YA DEVUELVE TRUE O FALSE
    setValidPassword(inputValidator("password", event.target.value))
  }
    // if (inputValidator("password", event.target.value)) {
    //   setValidPassword(true)
    //   console.log("es esta contraseña Válida? ", validPassword)
    // } else {
    //   setValidPassword(false)
    //   console.log("aquí la contraseña debería fallar")
    // }
  };

  const buttonHandler = () => {
    const validatedCredentials = keyValidator(credentials, ['email', 'password'])
    if (inputValidator("email", validatedCredentials.email) && inputValidator("password", validatedCredentials.password)){
    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);
        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
      })
      .catch((err) => {
        setError((prevState) => ({
          ...prevState,
          errorStatus: err.response.status,
          errorMessage: err.response.data.error,
        }))
        setSmShow(true)
        setTimeout(() => {
          setSmShow(false)
        }, 2000);
      });
    }
    else { console.log('el validador ha funcionado') }
  };

  const closeModalHandler = () => {
    setSmShow(false)
  }

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {

  }, [])

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
      <p>contraseña</p>
      <h1>{credentials.name}</h1>
      <div className="apiCallButton" onClick={buttonHandler}>
        LOGIN
      </div>
      <div className="characterContainer">
          <ErrorModal 
          status={error.errorStatus}
          message={error.errorMessage} 
          show={smShow}
          handler={closeModalHandler}/>
      </div>
    </div>
  );
};
