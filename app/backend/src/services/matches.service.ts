import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import statusHTTP from '../utils/statusHTTP';
import Jwt from '../utils/jwt.utils';
import INewMatch from '../interfaces/INewMatch';
import IGoals from '../interfaces/IGoals';

const INCLUDE = [
  { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
  { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
];

const invalidToken = 'Token must be a valid token';

export default class MatchesService {
  private jwt = new Jwt();
  public getAllMatches = async (token: string) => {
    this.jwt.validateToken(token);
    try {
      const allMatches = await MatchModel.findAll({ include: INCLUDE });
      return { status: statusHTTP.OK, message: allMatches };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: invalidToken };
    }
  };

  public getAllMatchesByProgress = async (inProgress: string, token: string) => {
    try {
      this.jwt.validateToken(token);
      if (inProgress === 'true') {
        const matchesInProgress = await MatchModel
          .findAll({ include: INCLUDE, where: { inProgress: 1 } });
        return { status: statusHTTP.OK, message: matchesInProgress };
      }
      const matchesNotInProgress = await MatchModel
        .findAll({ include: INCLUDE, where: { inProgress: 0 } });
      return { status: statusHTTP.OK, message: matchesNotInProgress };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: invalidToken };
    }
  };

  public addNewMatch = async (newMatch: INewMatch, token: string) => {
    try {
      this.jwt.validateToken(token);
      if (newMatch.homeTeam === newMatch.awayTeam) {
        return { status: statusHTTP.UNPROCESSABLE_ENTITY,
          message: 'It is not possible to create a match with two equal teams' };
      }
      const awayTeam = await TeamModel.findOne({ where: { id: newMatch.awayTeam } });
      const homeTeam = await TeamModel.findOne({ where: { id: newMatch.homeTeam } });
      if (!awayTeam || !homeTeam) {
        return { status: statusHTTP.NOT_FOUND, message: 'There is no team with such id!' };
      }
      const newMatchInProgress = { ...newMatch, inProgress: true };
      const data = await MatchModel.create(newMatchInProgress);
      return { status: statusHTTP.CREATED, message: data };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: invalidToken };
    }
  };

  public finishMatch = async (id: number, token: string) => {
    try {
      this.jwt.validateToken(token);
      await MatchModel.update({ inProgress: 0 }, { where: { id } });
      return { status: statusHTTP.OK, message: 'Finished' };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: invalidToken };
    }
  };

  public updateMatch = async (id: number, goals: IGoals, token: string) => {
    try {
      this.jwt.validateToken(token);
      const { homeTeamGoals, awayTeamGoals } = goals;
      await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
      const updatedMatch = await MatchModel.findOne({ where: { id } });
      return { status: statusHTTP.OK, message: updatedMatch };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: invalidToken };
    }
  };
}
