import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { SALT_ROUNDS, JWT_SECRET, NODE_ENV } = process.env;

const generateHashedPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(+SALT_ROUNDS);
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw new Error('Hashing password failed - auth.utils ' + error.message)
  };
};

const generateTokenizedCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '15d'
    });

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'None'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Generating jwt cookie failed - auth.utils ' + error.message })
  };
};

const isValidPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export { generateHashedPassword, generateTokenizedCookie, isValidPassword };