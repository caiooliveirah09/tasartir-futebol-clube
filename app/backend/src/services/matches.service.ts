import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import statusHTTP from '../utils/statusHTTP';

const INCLUDE = [
  { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
  { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
];

export default class MatchesService {
  public getAllMatches = async () => {
    const allMatches = await MatchModel.findAll({ include: INCLUDE });
    return { status: statusHTTP.OK, message: allMatches };
  };

  public getAllMatchesByProgress = async (inProgress: string) => {
    if (inProgress === 'true') {
      const matchesInProgress = await MatchModel
        .findAll({ include: INCLUDE, where: { inProgress: 1 } });
      return { status: statusHTTP.OK, message: matchesInProgress };
    }
    const matchesNotInProgress = await MatchModel
      .findAll({ include: INCLUDE, where: { inProgress: 0 } });
    return { status: statusHTTP.OK, message: matchesNotInProgress };
  };
}
