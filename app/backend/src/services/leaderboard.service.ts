// import Jwt from '../utils/jwt.utils';
// import { QueryTypes } from 'sequelize';
// import db from '../database/models';
import statusHTTP from '../utils/statusHTTP';
// import { compare } from 'bcryptjs';
// import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import MatchModel from '../database/models/Match.model';
import ITeam from '../interfaces/ITeam';
import leaderboardHome from '../utils/leaderboard.utils';

const INCLUDE = [
  { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
  { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
];

export default class LeaderboardService {
  public getAllLeaderboardHome = async () => {
    const quantityOfTeams = await TeamModel.findAndCountAll();
    const flamengoCasa = await MatchModel.findAll({ include: INCLUDE }) as ITeam[];
    // const flamengoVisita = await MatchModel.findAll({ where: { awayTeam: 7 } });
    const teste = leaderboardHome(flamengoCasa, quantityOfTeams.count as number);
    // const seila2 = await db.query('SELECT * FROM TRYBE_FUTEBOL_CLUBE.teams;');
    return { status: statusHTTP.OK, message: teste };
  };
}
