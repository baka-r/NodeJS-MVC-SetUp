/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints
 */

/**
 * @swagger
 * /api/user/signIn:
 *   post:
 *     summary: Sign In 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 role:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Bad request, validation error, or invalid credentials
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/signUp:
 *   post:
 *     summary: User Sign 
 *     description: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirmation:
 *                 type: string
 *             required:
 *               - first_name
 *               - last_name
 *               - phone_number
 *               - email
 *               - password
 *               - password_confirmation
 *     responses:
 *       201:
 *         description: Successfully signed up a new user
 *       400:
 *         description: Bad request. Validation or user exists errors
 *       401:
 *         description: Unauthorized. Invalid token or authentication failed
 *       500:
 *         description: Internal server error
 */