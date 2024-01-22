import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllCharacters } from "../../services/apiCalls";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    bringAllCharacters().then((characters) => {
      setCharacters(characters);
    });
  };

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  useEffect(() => {
    // console.table(userData)
  }, [userData]);

  return (
    <div className="miDiv">
      <CustomInput
        type={"text"}
        name={"name"}
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
      <h1>{userData.name}</h1>
      <div className="apiCallButton" onClick={buttonHandler}></div>
      {characters.length > 0 ? (
        <>
          {characters.map((char) => {
            return (
              <CharacterCard
                id={char.id}
                image={char.image}
                name={char.name}
              ></CharacterCard>
            );
          })}
        </>
      ) : null}
    </div>
  );
};
