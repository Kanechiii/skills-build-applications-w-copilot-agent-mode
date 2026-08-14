import express, { Request, Response } from 'express';
import { Activity } from '../models/index.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId').populate('teamId');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId').populate('teamId');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    return res.json({ message: `Get activity ${req.params.id}`, data: activity });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch activity', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Create new activity', data: activity });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create activity', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    return res.json({ message: `Update activity ${req.params.id}`, data: activity });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update activity', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: `Delete activity ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete activity', error });
  }
});

export default router;
