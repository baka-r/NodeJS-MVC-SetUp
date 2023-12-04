const express = require("express");
const { signIn, signUp } = require("../../controllers/auth");
const Router = express.Router();

// Only Auth Andpoints here
Router.post('/signIn', signIn);
Router.post('/signUp', signUp);

module.exports = Router;