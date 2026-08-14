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
const sanitizeForHost = (name: string): string => name.replace(/[^a-z0-9-]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();

const getApiUrl = (): string => {
  // Allow an explicit override for Codespaces/friendly orbit environments.
  // If `FRIENDLY_ORBIT` is a full URL (starts with http), use it verbatim.
  // Otherwise treat it as a short name and build the GitHub Codespaces host.
  const friendlyEnv = process.env.FRIENDLY_ORBIT;
  if (friendlyEnv) {
    if (/^https?:\/\//i.test(friendlyEnv)) {
      return friendlyEnv.endsWith('/') ? friendlyEnv.slice(0, -1) : friendlyEnv;
    }
    const hostPart = sanitizeForHost(friendlyEnv) || 'friendly-orbit';
    return `https://${hostPart}-${port}.app.github.dev`;
  }

  if (process.env.CODESPACE_NAME) {
    const raw = process.env.CODESPACE_NAME as string;
    const hostPart = sanitizeForHost(raw) || 'friendly-orbit';
    return `https://${hostPart}-${port}.app.github.dev`;
  }

  // If not in Codespaces or friendly orbit override, serve localhost
  return `http://localhost:${port}`;
};

// Human-friendly display name for Codespaces (kept for UI/logs)
const getDisplayName = (): string => {
  if (process.env.FRIENDLY_ORBIT) return process.env.FRIENDLY_ORBIT as string;
  if (process.env.CODESPACE_NAME) return process.env.CODESPACE_NAME as string;
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

const startServer = () => {
  app.listen(port, () => {
    console.log(`OctoFit backend running on ${getApiUrl()} (${getDisplayName()})`);
  });
};

if (process.env.SKIP_DB === 'true') {
  console.warn('SKIP_DB=true — skipping MongoDB connection and starting server for local/dev testing');
  startServer();
} else {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Connected to octofit_db');
      startServer();
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
}
