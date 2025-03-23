const db = require("../models");

const Player = db.Player;
const Ranking = db.Ranking;

const readPlayers = async (playerId, rankingDate) => {
  try {
    rankingDate = await Ranking.max("date");
    console.log("rankingDate", rankingDate);
    const whereClause1 = {};
    const whereClause2 = {};
    if (playerId) whereClause1.playerId = playerId;
    if (rankingDate) whereClause2.date = rankingDate;

    const players = await Player.findAll({
      where: whereClause1,
      include: [
        {
          model: Ranking,
          required: false, // ⬅️ Questo rende la JOIN di tipo LEFT JOIN (incluso anche se non ha Ranking)
          where: whereClause2, // ⬅️ Seleziona solo i ranking con score 1000 (modifica con il valore che ti serve)
          attributes: ["date", "ranking"],
        },
      ],
    });
    return players;
  } catch {
    (error) => {
      console.error("Errore durante il recupero dei giocatori:", error);
      throw error;
    };
  }
};

module.exports = {
  readPlayers,
};
