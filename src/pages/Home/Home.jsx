import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";

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

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
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
  };

  const closeModalHandler = () => {
    setSmShow(false)
  }

  useEffect(() => {
    console.log(error);
  }, [error]);

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
