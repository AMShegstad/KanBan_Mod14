import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Login function to authenticate user and return JWT token
export const login = async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
        // If the user is not found, respond with a 404 status code (Not Found)
        return res.status(404).json({ message: 'User not found' });
    }
    // Compare the provided password with the stored password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        // If the password is invalid, respond with a 401 status code (Unauthorized)
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Sign a new JWT token with the username and secret key
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    // Respond with the token
    return res.json({ token });
};
// Create a new router instance
const router = Router();
// POST /login - Login a user
router.post('/login', login);
// Export the router
export default router;
