import ITeam from '../interfaces/ITeam';
// import MatchModel from '../database/models/Match.model';

interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

const totalPoints = (filtered: ITeam[]) => filtered
  .reduce((acc: number, cur) => {
    if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 3;
    if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

const totalGames = (filtered: ITeam[]) => filtered.reduce((acc: number) => acc + 1, 0);

const totalVictories = (filtered: ITeam[]) => filtered
  .reduce((acc: number, cur) => (cur.homeTeamGoals > cur.awayTeamGoals ? acc + 1 : acc), 0);

const totalDraws = (filtered: ITeam[]) => filtered
  .reduce((acc: number, cur) => (cur.homeTeamGoals === cur.awayTeamGoals ? acc + 1 : acc), 0);

const totalLosses = (filtered: ITeam[]) => filtered
  .reduce((acc: number, cur) => (cur.homeTeamGoals < cur.awayTeamGoals ? acc + 1 : acc), 0);

const goalsFavor = (filtered: ITeam[]) => filtered
  .reduce((acc: number, cur) => (acc + cur.homeTeamGoals), 0);

const goalsOwn = (filtered: ITeam[]) => filtered
  .reduce((acc: number, cur) => (acc + cur.awayTeamGoals), 0);

const goalsBalance = (Favor: number, Own: number) => Favor - Own;

const efficiency = (Points: number, Games: number) => ((Points / (Games * 3)) * 100).toFixed(2);

const sortLeaderboard = (leaderboard: ILeaderboard[]) => leaderboard
  .sort((teamOne: ILeaderboard, teamTwo: ILeaderboard) => teamTwo.totalPoints
    - teamOne.totalPoints
    || teamTwo.totalVictories - teamOne.totalVictories
    || teamTwo.goalsBalance - teamOne.goalsBalance
    || teamTwo.goalsFavor - teamOne.goalsFavor
    || teamOne.goalsOwn - teamTwo.goalsOwn);

const leaderboardHome = (home: ITeam[], quantityOfTeams: number) => {
  const b = [] as ILeaderboard[];
  for (let i = 1; i <= quantityOfTeams as unknown as number; i += 1) {
    const filtered = home
      .filter((team) => team.homeTeam === i && team.inProgress === false);
    b.push({
      name: filtered[0].teamHome.teamName,
      totalPoints: totalPoints(filtered),
      totalGames: totalGames(filtered),
      totalVictories: totalVictories(filtered),
      totalDraws: totalDraws(filtered),
      totalLosses: totalLosses(filtered),
      goalsFavor: goalsFavor(filtered),
      goalsOwn: goalsOwn(filtered),
      goalsBalance: goalsBalance(goalsFavor(filtered), goalsOwn(filtered)),
      efficiency: efficiency(totalPoints(filtered), totalGames(filtered)),
    });
  }
  return sortLeaderboard(b);
};

export default leaderboardHome;

/* - `Classificação`: Posição na classificação;
- `team`: Nome do team;
- `P`: Total de Pontos;
- `J`: Total de Jogos;
- `V`: Total de Vitórias;
- `E`: Total de Empates;
- `D`: Total de Derrotas;
- `GP`: Gols marcados a favor;
- `GC`: Gols sofridos;
- `SG`: Saldo total de gols;
- `%`: Aproveitamento do team.

{
    name: filtrado[0].teamHome.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
  };
*/
