// Set whether to force database refresh
const forceDatabaseRefresh = false;

// Import environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import express framework
import express from 'express';

// Import routes
import routes from './routes/index.js';

// Import sequelize instance
import { sequelize } from './models/index.js';

// Create an express application
const app = express();

// Set the port from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Serve static files from the client's dist folder
app.use(express.static('../client/dist'));

// Parse JSON request bodies
app.use(express.json());

// Use the imported routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
