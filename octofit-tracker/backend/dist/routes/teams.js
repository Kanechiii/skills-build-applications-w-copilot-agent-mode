import express from 'express';
import { Team, User } from '../models/index.js';
const router = express.Router();
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find().populate('captain').populate('members');
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('captain').populate('members');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        return res.json({ message: `Get team ${req.params.id}`, data: team });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch team', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const team = await Team.create(req.body);
        if (req.body.members?.length) {
            await User.updateMany({ _id: { $in: req.body.members } }, { $set: { teamId: team._id } });
        }
        res.status(201).json({ message: 'Create new team', data: team });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create team', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        return res.json({ message: `Update team ${req.params.id}`, data: team });
    }
    catch (error) {
        return res.status(400).json({ message: 'Failed to update team', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({ message: `Delete team ${req.params.id}` });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to delete team', error });
    }
});
export default router;
