import express from 'express';
import { User } from '../models/index.js';
const router = express.Router();
router.get('/', async (_req, res) => {
    try {
        const users = await User.find().populate('teamId');
        res.json({ message: 'Get all users', data: users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('teamId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: `Get user ${req.params.id}`, data: user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch user', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'Create new user', data: user });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: `Update user ${req.params.id}`, data: user });
    }
    catch (error) {
        return res.status(400).json({ message: 'Failed to update user', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `Delete user ${req.params.id}` });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to delete user', error });
    }
});
export default router;
