const r = require('rethinkdbdash')();
const get = require('lodash.get');
const eloRank = require('elo-rank');
const elo = new eloRank(32);
const uuid = require('uuid/v4');
const battleHistory = require('./battleHistory').finishBattle;


module.exports = async (data) => {
  console.log(data);
  console.log('Processing Battle ' + data.buid);
  const winnerData = await r.db('facemash2').table('data').get(data.winner).run();
  const loserData = await r.db('facemash2').table('data').get(data.loser).run();
  const eloLevels = getNewElo(winnerData, loserData);
  await r.db('facemash2').table('data').get(data.winner).update({elo: eloLevels.winnerElo}).run();
  await r.db('facemash2').table('data').get(data.loser).update({elo: eloLevels.loserElo}).run();

  console.log('----');
  console.log(data.loser);
  console.log(data.winner);
  console.log('----');

  battleHistory({
    elo: {
      winner: {
        before: winnerData.elo,
        after: eloLevels.winnerElo
      },
      loser: {
        before: loserData.elo,
        after: eloLevels.loserElo
      }
    },
    winner: data.winner,
    loser: data.loser,
    buid: data.buid,
    raw: data
  });

  console.log('Battle processed ' + data.buid);
};

function getNewElo(winnerData, loserData) {
  const winner = winnerData.elo;
  const loser = loserData.elo;

  const expectedWinner = elo.getExpected(winner, loser);
  const expectedLoser = elo.getExpected(loser, winner);

  return {
    winnerElo: elo.updateRating(expectedWinner, 1, winner),
    loserElo: elo.updateRating(expectedLoser, 0, loser)
  }
}
