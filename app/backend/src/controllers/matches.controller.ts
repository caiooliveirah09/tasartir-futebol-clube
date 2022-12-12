import { Request, Response } from 'express';
import statusHTTP from '../utils/statusHTTP';
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

  public addNewMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { body } = req;
    const { status, message } = await this.matchesService.addNewMatch(body, token as string);
    if (status === statusHTTP.UNPROCESSABLE_ENTITY) return res.status(status).json({ message });
    return res.status(status).json(message);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const { status, message } = await this.matchesService.finishMatch(Number(id), token as string);
    return res.status(status).json({ message });
  };
}
