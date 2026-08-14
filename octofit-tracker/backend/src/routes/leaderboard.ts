import express, { Request, Response } from 'express';
import { Leaderboard } from '../models/index.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const rows = await Leaderboard.find().populate('userId').populate('teamId').sort({ score: -1 });
    res.json({ message: 'Get leaderboard', data: rows });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.get('/:teamId', async (req: Request, res: Response) => {
  try {
    const rows = await Leaderboard.find({ teamId: req.params.teamId }).populate('userId').sort({ score: -1 });
    res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: rows });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch team leaderboard', error });
  }
});

export default router;
