import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Thompson',
                email: 'ava@example.com',
                fitnessGoal: 'Build endurance',
                streak: 18,
            },
            {
                name: 'Leo Martinez',
                email: 'leo@example.com',
                fitnessGoal: 'Increase strength',
                streak: 12,
            },
            {
                name: 'Nia Patel',
                email: 'nia@example.com',
                fitnessGoal: 'Improve mobility',
                streak: 21,
            },
            {
                name: 'Owen Brooks',
                email: 'owen@example.com',
                fitnessGoal: 'Lose weight',
                streak: 9,
            },
        ]);
        const [ava, leo, nia, owen] = users;
        const teams = await Team.insertMany([
            {
                name: 'Summit Striders',
                sport: 'Running',
                captain: ava._id,
                members: [ava._id, leo._id],
            },
            {
                name: 'Iron Pulse',
                sport: 'Strength',
                captain: nia._id,
                members: [nia._id, owen._id],
            },
        ]);
        const [summit, ironPulse] = teams;
        await User.updateMany({ _id: { $in: [ava._id, leo._id] } }, { $set: { teamId: summit._id } });
        await User.updateMany({ _id: { $in: [nia._id, owen._id] } }, { $set: { teamId: ironPulse._id } });
        const activities = await Activity.insertMany([
            {
                userId: ava._id,
                teamId: summit._id,
                type: 'Run',
                durationMinutes: 42,
                caloriesBurned: 420,
                date: new Date('2026-08-12'),
            },
            {
                userId: leo._id,
                teamId: summit._id,
                type: 'Strength',
                durationMinutes: 50,
                caloriesBurned: 510,
                date: new Date('2026-08-13'),
            },
            {
                userId: nia._id,
                teamId: ironPulse._id,
                type: 'Cycle',
                durationMinutes: 35,
                caloriesBurned: 390,
                date: new Date('2026-08-11'),
            },
            {
                userId: owen._id,
                teamId: ironPulse._id,
                type: 'HIIT',
                durationMinutes: 28,
                caloriesBurned: 320,
                date: new Date('2026-08-14'),
            },
        ]);
        await Leaderboard.insertMany([
            {
                userId: ava._id,
                teamId: summit._id,
                score: 980,
                rank: 1,
            },
            {
                userId: nia._id,
                teamId: ironPulse._id,
                score: 930,
                rank: 1,
            },
            {
                userId: leo._id,
                teamId: summit._id,
                score: 860,
                rank: 2,
            },
            {
                userId: owen._id,
                teamId: ironPulse._id,
                score: 810,
                rank: 2,
            },
        ]);
        await Workout.insertMany([
            {
                name: 'Tempo Run',
                category: 'Cardio',
                durationMinutes: 30,
                difficulty: 'Intermediate',
                equipment: ['Running shoes'],
                focus: 'Endurance',
            },
            {
                name: 'Upper Body Blast',
                category: 'Strength',
                durationMinutes: 45,
                difficulty: 'Advanced',
                equipment: ['Dumbbells', 'Bench'],
                focus: 'Power',
            },
            {
                name: 'Mobility Flow',
                category: 'Recovery',
                durationMinutes: 20,
                difficulty: 'Beginner',
                equipment: ['Mat'],
                focus: 'Flexibility',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
