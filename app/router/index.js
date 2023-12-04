const express = require("express");
const Router = express.Router();
const userRoutes = require('./routes/user')

Router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Define all the Endpoint here 
Router.use("/user", userRoutes);

module.exports = Router;