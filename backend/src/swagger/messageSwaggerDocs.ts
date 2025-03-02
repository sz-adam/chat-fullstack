/**
 * @swagger
 * tags:
 *   - name: Messages
 */

/**
 * @swagger
 *
 * /api/messages/users:
 *   get:
 *     tags: [Messages]
 *     summary: Get all users except the logged-in one
 *     description: Fetches a list of all users except the logged-in user with their unread message count.
 *     responses:
 *       200:
 *         description: List of all users with unread messages count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fullName:
 *                     type: string
 *                   profilePic:
 *                     type: string
 *                   unreadMessages:
 *                     type: integer
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/send/{id}:
 *   post:
 *     tags: [Messages]
 *     summary: Send a message
 *     description: Sends a message to another user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the recipient user
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message successfully sent
 *       400:
 *         description: Bad request, message text is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     tags: [Messages]
 *     summary: Get all messages between two users
 *     description: Fetches all messages between the logged-in user and the specified user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to chat with
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   senderId:
 *                     type: integer
 *                   receiverId:
 *                     type: integer
 *                   text:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   isRead:
 *                     type: boolean
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/unread/{id}:
 *   get:
 *     tags: [Messages]
 *     summary: Get unread messages
 *     description: Fetches all unread messages for the authenticated user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to fetch unread messages for
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of unread messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   senderId:
 *                     type: integer
 *                   receiverId:
 *                     type: integer
 *                   text:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   isRead:
 *                     type: boolean
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/delete/{id}:
 *   delete:
 *     tags: [Messages]
 *     summary: Delete a message
 *     description: Deletes a message if it was sent by the logged-in user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the message to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message successfully deleted
 *       400:
 *         description: Message ID is required
 *       403:
 *         description: You can only delete your own messages
 *       500:
 *         description: Internal server error
 */
