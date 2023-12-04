const { findUser, makeUser, userExistsById } = require("../dal/user")

const userExists = async (email, phoneNumber, type) => {
    // Finding the user with this function
    const user = await findUser(email, phoneNumber)
    let error;
    // This complete function is used for 2 Apis thats why I have used a 3rd argument type to do 
    // seperate function instead of doing 2 queries seperately i have managed It in a single function
    if (type === 'signUp-Api') {
        // If user exists then the error is thrown accordingly to the field that is taken 
        if (user) {
            if (user.email === email) {
                error = { statusCode: 409, status: "Failed", error: "Email is Already in use" }
            }
            if (user.phoneNumber === phoneNumber) {
                error = { statusCode: 409, status: "Failed", error: "Phone number is Already in use" }
            }
            if (user.phoneNumber === phoneNumber && user.email === email) {
                error = { statusCode: 409, status: "Failed", error: "Email and Phone number is Already in use" }
            }
        }
    }
    if (type === 'signIn-Api') {
        // If user does not exists then this error is thrown 
        if (!user) {
            error = { statusCode: 400, status: "Failed", error: "Invalid Credentials" }
        }
    }
    if (error) return { error }
    return { user }
}

// function to register a new user
const registerUser = async (dto) => {
    const user = await makeUser(dto)
    return { user }
}

// function to Find a new by Id
const findUserById = async (id) => {
    const user = await userExistsById(id)
    let error;
    if (!user) {
        error = { statusCode: 400, status: "Failed", error: "User Does not Exists" }
    }
    if (error) return { error }
    return { user }
}

module.exports = { userExists, registerUser, findUserById }