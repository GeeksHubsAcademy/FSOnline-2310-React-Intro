import { useEffect, useState } from "react";
import "./Personajes.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllCharacters } from "../../services/apiCalls";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { useNavigate } from "react-router-dom";

export const Personajes = () => {
  const [characters, setCharacters] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate()

//   const inputHandler = (event) => {
//     setUserData((prevState) => ({
//       ...prevState,
//       [event.target.name]: event.target.value,
//     }));
//   };

    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }

  const buttonHandler = () => {
    // if (contraseña correcta) ...
    let personajeSeleccionado = {}
    characters.forEach((char) => {
        if (inputValue === char.name) {
            personajeSeleccionado = char
            console.log(char)
            localStorage.setItem('details', JSON.stringify(char))
            navigate('/characterdetail')
        }
    })
  
  };

  useEffect(() => {
    if (characters.length === 0) {
      bringAllCharacters().then((chars) => {
        setCharacters(chars);
      });
    }
  }, [characters]);

//   useEffect(() => {
//     characters.forEach((char) => {
//         if (inputValue === char.name) {
//             console.log(char)

//         }
//     })
//   }, [inputValue])


  return (
    <div className="miDiv">
      <CustomInput
        type={"text"}
        name={"name"}
        handler={inputHandler}
      ></CustomInput>

      <div className="apiCallButton" onClick={buttonHandler}></div>
      <div className="characterContainer">
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
    </div>
  );
};
