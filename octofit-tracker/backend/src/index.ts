import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API URL support — use a human-friendly label when in Codespaces
// Hostnames cannot contain spaces, so we provide a display name with spaces
// while using a hyphenated form for the actual hostname.
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    const friendlyDisplay = 'friendly orbit';
    const friendlyHost = friendlyDisplay.replace(/\s+/g, '-');
    return `https://${friendlyHost}-${port}.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

// Human-friendly display name for Codespaces (kept for UI/logs)
const getDisplayName = (): string => {
  if (process.env.CODESPACE_NAME) {
    return 'friendly orbit';
  }
  return `localhost:${port}`;
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiUrl: getApiUrl(),
    displayName: getDisplayName(),
  });
});

// Register route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to octofit_db');
    app.listen(port, () => {
      console.log(`OctoFit backend running on ${getApiUrl()} (${getDisplayName()})`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
