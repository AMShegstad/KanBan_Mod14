// Import express Router
import { Router } from 'express';

// Import User model
import { User } from '../models/user.js';

// Import JWT and bcrypt libraries
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login function to authenticate user and return JWT token
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);

// Export the router
export default router;
