const Joi = require("joi");

const complexityOptions = {
    min: 8,
    max: 128,
    lowerCase: 1,
    upperCase: 1,
    numeric: 2,
    symbol: 1,
    requirementCount: 4,
};


const signUpSchema = Joi.object({
    firstName: Joi.string().min(2).max(64).required().messages({
        "string.empty": "First name is not allowed to be empty",
        "any.required": "First name is required",
        "string.min": "First must be at least 2 characters long",
        "string.max": "First cannot exceed 64 characters",
        "string.base": "First name must be a string",
    }),
    lastName: Joi.string().min(2).max(64).required().messages({
        "string.empty": "Last name is not allowed to be empty",
        "any.required": "Last name is required",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name cannot exceed 64 characters",
        "string.base": "Last name must be a string",
    }),
    phoneNumber: Joi.string()
        .trim(true)
        .min(11)
        .regex(/^[+0-9]+$/)
        .max(20)
        .required()
        .messages({
            "string.pattern.base": "The input must contain positive numbers only.",
            "string.empty": "Phone number is not allowed to be empty",
            "any.required": "Phone number is required",
            "string.min": "Phone number must be at least 11 characters long",
            "string.max": "Phone number cannot exceed 20 characters",
        }),
    email: Joi.string()
        .lowercase()
        .regex(/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .email()
        .trim(true)
        .required()
        .messages({
            "string.pattern.base": "Sorry, Only letters (a-z),numbers(0-9),and periods(.) are allowed.",
            "string.empty": "Email is not allowed to be empty",
            "string.email": "Invalid email format",
            "any.required": "Email is required",
            "string.base": "Email must be a string",
        }),
    password: Joi.string()
        .trim(true)
        .min(complexityOptions.min)
        .max(complexityOptions.max)
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])/)
        .required()
        .messages({
            "string.min": "Password must be at least {{#limit}} characters long",
            "string.max": "Password cannot exceed {{#limit}} characters",
            "string.pattern.base": "Password must contain at least:<br/>- 1 numeric character<br/>- 1 uppercase letter<br/>- 1 special symbol",
            "any.required": "Password is required",
            "string.empty": "Password is not allowed to be empty",
        }),
    passwordConfirmation: Joi.string()
        .valid(Joi.ref("password"))
        .messages({
            "any.only": "Password does not match",
            "any.required": "Password confirmation is required",
            "string.empty": "Password confirmation is not allowed to be empty",
        })
});

const signInSchema = Joi.object({
    email: Joi.string()
        .max(255)
        .lowercase()
        .regex(/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .email()
        .trim(true)
        .required()
        .messages({
            "string.pattern.base":
                "Sorry, Only letters (a-z),numbers(0-9),and periods(.) are allowed.",
            "string.empty": "Email is not allowed to be empty",
            "string.email": "Invalid email format",
            "string.max": "Email cannot exceed 255 characters",
            "any.required": "Email is required",
            "string.base": "Email must be a string",
        }),
    password: Joi.string().min(8).max(128).trim(true).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
    }),
});

module.exports = { signInSchema, signUpSchema }