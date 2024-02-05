import "./Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllUsers } from "../../services/apiCalls";
import { A } from "../../components/Accordion/Accordion.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { viewUserDetail } from "../userDetailSlice.js";
import { CustomInput } from "../../components/CustomInput/CustomInput.jsx";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [finder, setFinder] = useState("")
  const [usuariosEncontrados, setUsuariosEncontrados] = useState([])

  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials.userData

  const navigate = useNavigate();

  const deleteUserButtonHandler = (e) => {
    dispatch(viewUserDetail(e.target.id))
    console.log(e.target.id)
  }

  const inputHandler = (e) => {
    setFinder(e.target.value)
  }

  useEffect(() => {
    if (decoded.role !== "ADMIN") {
      navigate("/");
    } else {
      setTimeout(() => {
        bringAllUsers().then((res) => {
          setUsers(res);
        });
      }, 1000)

    }
  }, []);

  //input con debounce
  useEffect(() => {
    // si estamos tecleando en el buscador
    if (finder !== "") {
      // creamos un temporizador que filtrará los usuarios 
      // (normalmente esto sería una llamada a BBDD) y los setea
    const filterUsers = setTimeout(()=> {
      const found = users.filter((user) => 
          user.name.includes(finder)
      )
      setUsuariosEncontrados(found)
    }, 1000)
    // preparamos un return con una función que borra el temporizador anterior.
    // como está en el return de un useEffect, se ejecutará la próxima vez
    // que se ejecute el useEffect 
    return () => clearTimeout(filterUsers)
    // si no estamos buscando nada, se traen todos los usuarios con normalidad
  } else {
    setUsuariosEncontrados([])
  }
  }, [finder])

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="adminDesign">
      <div className="userList">
        { usuariosEncontrados.length > 0 ? (
          <>
          {usuariosEncontrados.map((user) => {
            return (
              <>
                <A 
                name={user.name} 
                key={user._id}
                email={user.email}
                role={user.role}
                id={user._id}
                handler={deleteUserButtonHandler}
                >
                </A>
              </>
            );
          })}
        </>
        ) : users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <>
                  <A 
                  name={user.name} 
                  key={user._id}
                  email={user.email}
                  role={user.role}
                  id={user._id}
                  handler={deleteUserButtonHandler}
                  >
                  </A>
                  
                </>
              );
            })}
          </>
        ) : <img src="../../../public/loading.gif"></img>}
        <CustomInput
        placeholder={"buscar usuario"}
        type={"text"}
        name={"userFinder"}
        handler={inputHandler}
        >
        </CustomInput>
      </div>
    </div>
  );
};
