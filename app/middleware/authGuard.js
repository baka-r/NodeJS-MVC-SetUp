const { findUserById } = require("../services/user.services");
const { handleResponse, unAuthenticateResponse } = require("../utils/response");
const { verifyToken } = require("../utils/token");

const authGuard = async (req, res, next) => {
    try {
        // Check if authorization header is present or not
        const header = req.headers['authorization'];
        if (!header) return res.status(401).json({ message: 'Access denied, no token provided.' });

        const token = header.includes('Bearer') ? header.split(' ')[1] : header;

        // validating if token is expired or the user is valid or not
        const { error: tokenErrors, data: verifiedUser } = verifyToken(token);
        if (tokenErrors) return handleResponse(res, tokenErrors);

        const id = verifiedUser.id

        // Check if there is a active user associated with the decoded id or not
        const { error: userErrors } = await findUserById(id)
        if (userErrors) return handleResponse(res, userErrors);

        req.id = id;
        return next();
    } catch (error) {
        return unAuthenticateResponse(res, error)
    }
};


module.exports = { authGuard }