import express from 'express';
import { Workout } from '../models/index.js';
const router = express.Router();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.json({ message: 'Get all workouts', data: workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        return res.json({ message: `Get workout ${req.params.id}`, data: workout });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch workout', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json({ message: 'Create new workout', data: workout });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create workout', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        return res.json({ message: `Update workout ${req.params.id}`, data: workout });
    }
    catch (error) {
        return res.status(400).json({ message: 'Failed to update workout', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({ message: `Delete workout ${req.params.id}` });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to delete workout', error });
    }
});
export default router;
