import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import statusHTTP from '../utils/statusHTTP';
import Jwt from '../utils/jwt.utils';
import INewMatch from '../interfaces/INewMatch';

const INCLUDE = [
  { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
  { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
];

export default class MatchesService {
  private jwt = new Jwt();
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

  public addNewMatch = async (newMatch: INewMatch, token: string) => {
    try {
      this.jwt.validateToken(token);
      if (newMatch.homeTeam === newMatch.awayTeam) {
        return { status: statusHTTP.UNPROCESSABLE_ENTITY,
          message: 'It is not possible to create a match with two equal teams' };
      }
      const newMatchInProgress = { ...newMatch, inProgress: true };
      const data = await MatchModel.create(newMatchInProgress);
      return { status: statusHTTP.CREATED, message: data };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: 'Token unauthorized' };
    }
  };

  public finishMatch = async (id: number, token: string) => {
    try {
      this.jwt.validateToken(token);
      await MatchModel.update({ inProgress: 0 }, { where: { id } });
      return { status: statusHTTP.OK, message: 'Finished' };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: 'Token unauthorized' };
    }
  };
}
