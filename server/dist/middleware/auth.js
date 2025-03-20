import jwt from 'jsonwebtoken';
// Middleware to authenticate JWT token
export const authenticateToken = (req, res, next) => {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];
        // Get the secret key from environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';
        // Verify the token using the secret key
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                // If there is an error, respond with a 403 status code (Forbidden)
                return res.sendStatus(403);
            }
            // Attach the user information to the request object
            req.user = user;
            // Call the next middleware function
            return next();
        });
    }
    else {
        // If the authorization header is not present, respond with a 401 status code (Unauthorized)
        res.sendStatus(401);
    }
};
