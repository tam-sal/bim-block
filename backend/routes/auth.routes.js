import { Router } from 'express';
import { register, login, logout, profile } from '../controllers/auth.controller.js';
import protect from '../middlewares/protect.middleware.js';

const auth = Router();

// Register
auth.post('/register', register);

// Login
auth.post('/login', login);

// Logout
auth.post('/logout', logout);

// Profile
auth.get('/profile', [protect], profile);

export default auth;