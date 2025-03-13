// Import express Router
import { Router } from 'express';

// Import authentication and API routes
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

// Import authentication middleware
import { authenticateToken } from '../middleware/auth.js';

// Create a new router instance
const router = Router();

// Use authentication routes for /auth path
router.use('/auth', authRoutes);

// Use authentication middleware and API routes for /api path
router.use('/api', authenticateToken, apiRoutes);

// Export the router
export default router;
