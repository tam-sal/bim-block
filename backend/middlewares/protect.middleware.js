import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const protect = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: 'Unauthorized / Invalid token' });
    const user = await User.findOne(decoded.userId).select('-password');
    if (!user) return res.status(400).json({ error: 'user does not exist' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(501).json({ error: 'Failed to run protect middleware - protect.middleware - ' + error.message })
  };
};

export default protect;