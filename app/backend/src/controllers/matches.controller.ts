import { Request, Response } from 'express';
import statusHTTP from '../utils/statusHTTP';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private matchesService = new MatchesService();
  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, message } = await this.matchesService.getAllMatches();
      if (status === statusHTTP.UNAUTHORIZED) return res.status(status).json({ message });
      return res.status(status).json(message);
    }
    if (inProgress) {
      const { status, message } = await this.matchesService
        .getAllMatchesByProgress(inProgress as string);
      if (status === statusHTTP.UNAUTHORIZED) return res.status(status).json({ message });
      if (status && message) return res.status(status).json(message);
    }
  };

  public addNewMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { body } = req;
    const { status, message } = await this.matchesService.addNewMatch(body, token as string);
    if (status === statusHTTP.CREATED) return res.status(status).json(message);
    return res.status(status).json({ message });
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await this.matchesService.finishMatch(Number(id));
    return res.status(status).json({ message });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const { status, message } = await this
      .matchesService.updateMatch(Number(id), body);
    if (status === statusHTTP.UNAUTHORIZED) return res.status(status).json({ message });
    return res.status(status).json(message);
  };
}
