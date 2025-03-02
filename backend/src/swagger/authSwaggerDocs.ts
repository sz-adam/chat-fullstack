/**
 * @swagger
 * tags:
 *   - name: Authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: User signup
 *     description: Allows a user to sign up.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Successfully created user
 *       400:
 *         description: Bad request (validation error)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     description: Allows a user to log in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: User logout
 *     description: Logs out a user by clearing the JWT cookie.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/check:
 *   get:
 *     tags: [Authentication]
 *     summary: Check authentication status
 *     description: Checks if the user is authenticated.
 *     responses:
 *       200:
 *         description: User information if authenticated
 *       401:
 *         description: Unauthorized if not authenticated
 *       500:
 *         description: Internal server error
 */
