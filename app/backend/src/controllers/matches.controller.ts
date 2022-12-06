import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public getAllMatches = async (req: Request, res: Response) => {
    const matchesService = new MatchesService();
    const { status, message } = await matchesService.getAllMatches();
    return res.status(status).json(message);
  };
}
