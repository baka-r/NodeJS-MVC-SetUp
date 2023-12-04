const { generateJwt } = require("../configs/jwt");
const { userDto } = require("../dtos/user");
const { userExists, registerUser } = require("../services/user");
const { handleResponse, InternalServerError, successfulResponse, createResponse } = require("../helpers/response");
const { compareUserPassword } = require("../helpers/user");
const { validateSchema } = require("../helpers/validate");
const { signUpSchema, signInSchema } = require("../validations/auth");


const signUp = async (req, res) => {
    const { email, phoneNumber } = req.body
    try {
        // validating schema Errors
        const { error: schemaErrors } = validateSchema(signUpSchema, req.body);
        if (schemaErrors) return handleResponse(res, schemaErrors);

        // Check for Esitsing User
        const { error } = await userExists(email, phoneNumber, type = 'signUp-Api')
        if (error) return handleResponse(res, error)

        // Making a Dto for the user data including hash password
        const dto = await userDto(req.body)
        const newUser = await registerUser(dto)
        // Generating Access Token
        const accessToken = generateJwt({ id: newUser.id })

        const responseObj = {
            data: newUser,
            accessToken
        }

        return createResponse(res, responseObj)
    } catch (error) {
        return InternalServerError(res, error)
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        // validating schema Errors
        const { error: schemaErrors } = validateSchema(signInSchema, req.body);
        if (schemaErrors) return handleResponse(res, schemaErrors);

        // Check for Esitsing User
        const { error, user } = await userExists(email, undefined, type = 'signIn-Api')
        if (error) return handleResponse(res, error)

        // Comparing The Passwords
        const { error: passwordError } = await compareUserPassword(password, user.password)
        if (passwordError) return handleResponse(res, passwordError);

        // Generating Access Token
        const accessToken = generateJwt({ id: user.id })

        const responseObj = {
            data: user,
            accessToken
        }

        return createResponse(res, responseObj)
    } catch (error) {
        return InternalServerError(res, error)
    }
}

module.exports = { signIn, signUp }