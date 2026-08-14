import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    streak: { type: Number, default: 0 },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    equipment: [{ type: String }],
    focus: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard =
  mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
