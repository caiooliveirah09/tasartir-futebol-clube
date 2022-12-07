import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private matchesService = new MatchesService();
  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, message } = await this.matchesService.getAllMatches();
      return res.status(status).json(message);
    }
    if (inProgress) {
      const { status, message } = await this.matchesService
        .getAllMatchesByProgress(inProgress as string);
      if (status && message) return res.status(status).json(message);
    }
  };
}
