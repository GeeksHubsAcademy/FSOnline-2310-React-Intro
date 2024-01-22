import "./CharacterCard.css"

export const CharacterCard = ({id, image, name}) => {


    return (
        <div className="cardContainer" key={id}>
            <img src={image}></img>
            <h3>{name}</h3>
        </div>
    )
}