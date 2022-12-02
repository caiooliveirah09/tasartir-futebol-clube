import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
// import statusHTTP from '../utils/statusHTTP';

export default class TeamsController {
  public teamsService = new TeamsService();
  public getAllTeams = async (req: Request, res: Response) => {
    const { status, message } = await this.teamsService.getAllTeams();
    return res.status(status).json(message);
  };

  public getTeamById = async (req: Request, res:Response) => {
    const { id } = req.params;
    const { status, message } = await this.teamsService.getTeamById(Number(id));
    return res.status(status).json(message);
  };
}
