import statusHTTP from '../utils/statusHTTP';
import TeamModel from '../database/models/Team.model';

export default class LoginService {
  public getAllTeams = async () => {
    const teams = await TeamModel.findAll();
    return { status: statusHTTP.OK, message: teams };
  };

  public getTeamById = async (id: number) => {
    const team = await TeamModel.findOne({ where: { id } });
    return { status: statusHTTP.OK, message: team };
  };
}
