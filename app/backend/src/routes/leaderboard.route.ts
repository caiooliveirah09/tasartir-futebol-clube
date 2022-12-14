import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboard = new LeaderboardController();

router.get('/home', leaderboard.getAllLeaderboardHome);

export default router;
