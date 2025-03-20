import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}
// Add the `user` property to the Request interface, if this doesn't work, comment out and change line 14 to "req: Request."
interface AuthRequest extends Request {
  user?: any; // Replace `any` with the correct User type
}

// Middleware to authenticate JWT token
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
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
      req.user = user as JwtPayload;
      // Call the next middleware function
      return next();
    });
  } else {
    // If the authorization header is not present, respond with a 401 status code (Unauthorized)
    res.sendStatus(401);
  }
};
