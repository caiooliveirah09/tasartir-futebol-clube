import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
// import statusHTTP from '../utils/statusHTTP';

export default class LeaderboardController {
  public leaderboardService = new LeaderboardService();
  public getAllLeaderboardHome = async (req: Request, res: Response) => {
    const { status, message } = await this.leaderboardService.getAllLeaderboardHome();
    return res.status(status).json(message);
  };
}
