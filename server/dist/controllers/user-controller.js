import { User } from '../models/user.js';
// GET /Users - Get all users
export const getAllUsers = async (_req, res) => {
    try {
        // Find all users and exclude the password attribute
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        // Respond with the users in JSON format
        res.json(users);
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ message: error.message });
    }
};
// GET /Users/:id - Get a user by id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the user by primary key and exclude the password attribute
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            // Respond with the user in JSON format
            res.json(user);
        }
        else {
            // Respond with a 404 status code if the user is not found
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ message: error.message });
    }
};
// POST /Users - Create a new user
export const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Create a new user with the provided data
        const newUser = await User.create({ username, password });
        // Respond with the created user and a 201 status code
        res.status(201).json(newUser);
    }
    catch (error) {
        // Handle any errors and respond with a 400 status code
        res.status(400).json({ message: error.message });
    }
};
// PUT /Users/:id - Update a user by id
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        // Find the user by primary key
        const user = await User.findByPk(id);
        if (user) {
            // Update the user with the provided data
            user.username = username;
            user.password = password;
            // Save the updated user
            await user.save();
            // Respond with the updated user
            res.json(user);
        }
        else {
            // Respond with a 404 status code if the user is not found
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 400 status code
        res.status(400).json({ message: error.message });
    }
};
// DELETE /Users/:id - Delete a user by id
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the user by primary key
        const user = await User.findByPk(id);
        if (user) {
            // Delete the user
            await user.destroy();
            // Respond with a success message
            res.json({ message: 'User deleted' });
        }
        else {
            // Respond with a 404 status code if the user is not found
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ message: error.message });
    }
};
