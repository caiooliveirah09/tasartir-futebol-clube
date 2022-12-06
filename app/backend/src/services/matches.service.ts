import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import statusHTTP from '../utils/statusHTTP';

export default class MatchesService {
  public getAllMatches = async () => {
    const allMatches = await MatchModel.findAll({ include: [
      { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
      { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return { status: statusHTTP.OK, message: allMatches };
  };
}
