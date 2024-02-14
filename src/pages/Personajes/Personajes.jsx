import { useEffect, useState } from "react";
import "./Personajes.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import {
  bringAllCharacters,
  bringAllUsers,
  userLogin,
} from "../../services/apiCalls";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Personajes = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pages, setPages] = useState({
    current: "",
    prev: "",
    next: "",
  });

  const navigate = useNavigate();

  //   const inputHandler = (event) => {
  //     setUserData((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.value,
  //     }));
  //   };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const buttonHandler = () => {
    bringAllCharacters().then((res) => {
      console.log(res);
      setUsers(res.results);
      setPages((prevState) => ({
        ...prevState,
        prev: res.info.prev,
        next: res.info.next
      }));
    });
  };

  const pageHandler = (event) => {
    const page = event.target.id
    bringAllCharacters(page)
    .then((res) => {
            setUsers(res.results);
      setPages((prevState) => ({
        ...prevState,
        prev: res.info.prev,
        next: res.info.next
      }))
      console.log(res)
    })
  }

  const viewUserDetail = (id) => {
    localStorage.setItem("userId", id);
    console.log(id, "soy id en viewUserDetail");
  };

  // useEffect(() => {
  //   if (characters.length === 0) {
  //     bringAllCharacters().then((chars) => {
  //       setCharacters(chars);
  //     });
  //   }
  // }, [characters]);

  useEffect(() => {
    console.log(pages);
  }, [pages]);

  return (
    <div className="miDiv">
      <CustomInput
        type={"text"}
        name={"name"}
        handler={inputHandler}
      ></CustomInput>

      <div className="apiCallButton" onClick={buttonHandler}>
        Users
      </div>
      <div className="apiCallButton" onClick={viewUserDetail}>
        Login
      </div>
      <div className="apiCallButton" id={pages.prev} onClick={(e) => pageHandler(e)}>Prev</div>
      <div className="apiCallButton" id={pages.next} onClick={(e) =>pageHandler(e)}>Next</div>

      <div className="characterContainer">
        {users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <div key={user.id} onClick={() => viewUserDetail(user.id)}>
                  <CharacterCard
                    key={user._id}
                    image={user.image}
                    name={user.username}
                  ></CharacterCard>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};
