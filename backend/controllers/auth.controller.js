import User from '../models/User.model.js';
import { generateHashedPassword, generateTokenizedCookie, isValidPassword } from '../utils/auth.utils.js';
import { validateEmailFormat, validatePasswordFormat, isPasswordMatched } from '../utils/validations.utils.js';

// Register a new user

const register = async (req, res) => {
  const { email, password, confirmedPassword } = req.body;
  if (!email || !password || !confirmedPassword) return res.status(400).json({
    error: 'Bad request',
    message: 'missing required field/s'
  });

  const emailValidation = validateEmailFormat(email);
  if (!emailValidation.isValid) {
    return res.status(400).json({
      error: 'Bad request',
      message: emailValidation.message
    });
  }

  const passwordValidation = validatePasswordFormat(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({
      error: 'Bad request',
      message: passwordValidation.message
    });
  }

  const passwordMatch = isPasswordMatched(password, confirmedPassword);
  if (!passwordMatch.isValid) {
    return res.status(400).json({
      error: 'Bad request',
      message: passwordMatch.message
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: 'Conflict', message: 'User already exists' });

    const hashedPassword = await generateHashedPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword
    });

    newUser && generateTokenizedCookie(newUser._id, res);
    await newUser.save();
    return res.status(201).json({ success: `${email} has been successfully registered` });

  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'Register failed - auth.controller' });
  };
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({
    error: 'Bad Request',
    message: 'Missing required field'
  });
  try {
    const user = await User.findOne({ email });
    if (!user || !(await isValidPassword(password, user?.password))) return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid email or password'
    });

    generateTokenizedCookie(user._id, res);

    return res.status(200).json({ success: `${email} logged in.`, user: user.email });

  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'Login failed - auth.controller' });

  };
};

// logout
const logout = async (req, res) => {
  try {
    await res.cookie('jwt', '', {
      maxAge: 0,
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'None'
    });
    return res.status(200).json({ message: 'Successfully Logged Out' });
  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'Logout failed - auth.controller' });
  };
};

// User
const profile = async (req, res) => {
  try {
    const { user } = await req;
    if (!user) return res.status(404).json({ error: 'not found', message: 'user not found' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'failed to serve profile - auth.controller' })
  };
};
export { register, login, logout, profile };