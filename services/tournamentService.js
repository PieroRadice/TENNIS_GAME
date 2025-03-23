const { where } = require("sequelize");
const db = require("../models");

const Tournament = db.Tournament;
const Script = db.Script;
const getTournaments = async () => {
  try {
    return await Tournament.findAll({ order: [["datafine", "ASC"]] });
  } catch (error) {
    console.error("Errore nel recupero dei tornei:", error);
    throw error;
  }
};

const getTournament = async (id) => {
  try {
    const tournament = await Tournament.findOne({
      where: { id },
    });
    return tournament;
  } catch (error) {
    console.error("Errore nel recupero del torneo:", error);
    throw error;
  }
};

const getTournamentsScripts = async (tournamentId, scriptName) => {
  try {
    const whereClause1 = {};
    if (tournamentId) whereClause1.id = tournamentId;
    const whereClause2 = {};
    if (scriptName) whereClause2.name = scriptName;
    const scripts = await Tournament.findAll({
      //attributes:[id],
      where: whereClause1,
      include: [{ model: Script, required: false, where: whereClause2 }],
    });
    return scripts;
  } catch (error) {
    console.error("Errore durante il recupero degli script:", error);
    throw error;
  }
};

const postTournament = async (tournament) => {
  try {
    return await Tournament.create(tournament);
  } catch (error) {
    console.error("Errore nel creare il torneo:", error);
    throw error;
  }
};

const deleteTournament = async (id) => {
  try {
    await Tournament.destroy({
      where: { ID: id },
    });
    return true;
  } catch (error) {
    console.error("Errore nel cancellare il torneo:", error);
    throw error;
  }
};

const putTournament = async (id, tournament) => {
  try {
    await Tournament.update(req.body, {
      where: { ID: id },
    });
    return tournament;
  } catch (error) {
    console.error("Errore nel modificare il torneo:", error);
    throw error;
  }
};

const Users = db.User;
const UsersTournaments = db.UserTournament;
const getTournamentsUsers = async () => {
  try {
    const users_tournaments = await UsersTournaments.findAll({
      include: [{ model: Users, through: UsersTournaments }],
    });
    return users_tournaments;
  } catch (error) {
    console.error("Errore nel recupero degli utenti-tornei:", error);
    throw error;
  }
};
//tutti gli  utenti di un  torneo
const getTournamentUsers = async (id) => {
  try {
    const users_tournaments = await UsersTournaments.findOne({
      where: { tournament_id: id },
      include: [{ model: Users, through: UsersTournaments }],
    });
    return users_tournaments;
  } catch (error) {
    console.error("Errore nel recupero degli utenti di un torneo:", error);
    throw error;
  }
};
//un utente-torneo
const getTournamentUser = async (user_id, tournament_id) => {
  try {
    const users_tournaments = await UsersTournaments.findOne({
      where: {
        user_uuid: user_id,
        tournament_id: tournament_id,
      },
      include: [{ model: Users, through: UsersTournaments }],
    });
    return users_tournaments;
  } catch (error) {
    console.error("Errore nel recupero dell'utente-torneo:", error);
    throw error;
  }
};

//Inizia parte che lega i giocatori ai tornei
const getTournamentPlayers = async (id) => {
  try {
    const tournamentPlayers = await players_tournaments.findAll({
      where: { id },
      include: [
        {
          model: Players,
          through: { attributes: ["rating", "turno", "posizione"] }, // Inclusione degli attributi aggiuntivi
        },
      ],
    });
    return tournamentPlayers;
  } catch (error) {
    console.error("Errore nel recupero dei giocatori di un torneo:", error);
    throw error;
  }
};

const postAllPlayersToTournament = async (tournament_id) => {
  try {
    const players = await Players.findAll();

    // Crea una entry per ogni giocatore nella tabella players_tournaments
    const newEntries = await Promise.all(
      players.map((player) =>
        players_tournaments.create({
          player_id: player.id,
          tournament_id,
          rating: player.rating,
        })
      )
    );

    return newEntries;
  } catch (error) {
    console.error("Errore nell'aggiunta dei giocatori al torneo:", error);
    throw error;
  }
};

module.exports = {
  getTournaments,
  getTournament,
  getTournamentsScripts,
  postTournament,
  deleteTournament,
  putTournament,
  getTournamentsUsers,
  getTournamentUsers,
  getTournamentUser,
  getTournamentPlayers,
  postAllPlayersToTournament,
};
