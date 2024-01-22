export const CustomInput = ({type, name, handler}) => {

    return (
        <input type={type} name={name} onChange={(e) => handler(e)}></input>
    )
}