import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';
// GET /tickets - Get all tickets
export const getAllTickets = async (_req, res) => {
    try {
        // Find all tickets and include the assigned user information
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        // Respond with the tickets in JSON format
        res.json(tickets);
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ message: error.message });
    }
};
// GET /tickets/:id - Get a ticket by id
export const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the ticket by primary key and include the assigned user information
        const ticket = await Ticket.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        if (ticket) {
            // Respond with the ticket in JSON format
            res.json(ticket);
        }
        else {
            // Respond with a 404 status code if the ticket is not found
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ message: error.message });
    }
};
// POST /tickets - Create a new ticket
export const createTicket = async (req, res) => {
    const { name, status, description, assignedUserId } = req.body;
    try {
        // Create a new ticket with the provided data
        const newTicket = await Ticket.create({ name, status, description, assignedUserId });
        // Respond with the created ticket and a 201 status code
        res.status(201).json(newTicket);
    }
    catch (error) {
        // Handle any errors and respond with a 400 status code
        res.status(400).json({ message: error.message });
    }
};
// PUT /tickets/:id - Update a ticket by id
export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        // Find the ticket by primary key
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            // Update the ticket with the provided data
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            ticket.assignedUserId = assignedUserId;
            // Save the updated ticket
            await ticket.save();
            // Respond with the updated ticket
            res.json(ticket);
        }
        else {
            // Respond with a 404 status code if the ticket is not found
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 400 status code
        res.status(400).json({ message: error.message });
    }
};
// DELETE /tickets/:id - Delete a ticket by id
export const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the ticket by primary key
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            // Delete the ticket
            await ticket.destroy();
            // Respond with a success message
            res.json({ message: 'Ticket deleted' });
        }
        else {
            // Respond with a 404 status code if the ticket is not found
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ message: error.message });
    }
};
