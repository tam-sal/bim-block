import { Router } from 'express';
import { register, login, logout, profile } from '../controllers/auth.controller.js';
import protect from '../middlewares/protect.middleware.js';
import swaggerDocs from '../docs/swaggerDocs.js';

const auth = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: MyP@ssw0rd
 *               confirmedPassword:
 *                 type: string
 *                 description: Password confirmation
 *                 example: MyP@ssw0rd
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: user@example.com has been successfully registered
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - User already exists
 */
auth.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: MyP@ssw0rd
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: user@example.com logged in.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Invalid email or password
 */
auth.post('/login', login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Logged Out
 *       500:
 *         description: Server error
 */
auth.post('/logout', logout);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60c72b2f5f1b2c001f4c1a4e
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       404:
 *         description: Not found - User not found
 *       500:
 *         description: Server error
 */
auth.get('/profile', [protect], profile);

auth.get('/check-auth', protect, (req, res) => {
  try {
    return res.status(200).json({ authenticated: true, user: req.user })
  } catch (error) {
    return res.status(403).json({ authenticated: false, message: 'no credentials' })
  }
});

export default auth;