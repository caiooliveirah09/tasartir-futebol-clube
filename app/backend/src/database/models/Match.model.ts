import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './Team.model';

class MatchModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamsGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

TeamModel.belongsTo(MatchModel, { foreignKey: 'homeTeam', as: 'matchHome' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'awayTeam', as: 'matchAway' });

MatchModel.hasMany(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.hasMany(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
