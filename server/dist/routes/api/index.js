import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
// Create a new router instance
const router = Router();
// Use ticket routes for /tickets path
router.use('/tickets', ticketRouter);
// Use user routes for /users path
router.use('/users', userRouter);
// Export the router
export default router;
