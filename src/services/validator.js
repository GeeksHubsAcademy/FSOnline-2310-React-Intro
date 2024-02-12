export const inputValidator = (inputType, input) => {

    if (inputType === "phone_number") {
        return parseInt(input)
    }
}