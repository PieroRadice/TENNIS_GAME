const db = require("../../models");

const serviceTournament = require("../../services/tournamentService");

const getTournaments = async (req, res) => {
  try {
    const tournaments = await serviceTournament.getTournaments();
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Errore nel recupero dei tornei:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const getTournament = async (req, res) => {
  try {
    //console.log("9999999", req.params.id);
    const tourn = await serviceTournament.getTournament(req.params.id);
    res.status(200).json({ success: true, data: tourn });
  } catch (error) {
    console.error("Errore nel recupero del torneo:", error);
    res.status(500).json({ error: "Errore nel recupero del torneo" });
  }
};

const postTournament = async (req, res) => {
  try {
    res.status(201).json(await serviceTournament.postTournament(req.body));
  } catch (error) {
    console.error("Errore nel creare il torneo:", error);
    res.status(500).json({ error: "Errore nel creare il torneo" });
  }
};

const deleteTournament = async (req, res) => {
  try {
    await serviceTournament.deleteTournament(req.params.ID);
    res.status(204).end();
  } catch (error) {
    console.error("Errore nel cancellare il torneo:", error);
    res.status(500).json({ error: "Errore nel cancellare il torneo" });
  }
};

const putTournament = async (req, res) => {
  try {
    await serviceTournament.putTournament(req.params.ID, req.body);
    res.status(200).end();
  } catch (error) {
    console.error("Errore nel modificare il torneo:", error);
    res.status(500).json({ error: "Errore nel modificare il torneo" });
  }
};

const getTournamentsUsers = async (req, res) => {
  try {
    res.status(200).json(await serviceTournament.getTournamentsUsers());
  } catch (error) {
    console.error("Errore nel recupero degli utenti-tornei:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};
//tutti gli  utenti di un  torneo
const getTournamentUsers = async (req, res) => {
  try {
    res
      .status(200)
      .json(await serviceTournament.getTournamentUsers(req.params.ID));
  } catch (error) {
    console.error("Errore nel recupero degli utenti di un torneo:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};
//un utente-torneo
const getTournamentUser = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await serviceTournament.getTournamentUser(
          req.params.ID,
          req.params.user_id
        )
      );
  } catch (error) {
    console.error("Errore nel recupero dell'utente-torneo:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const getTournamentPlayers = async (req, res) => {
  try {
    res
      .status(200)
      .json(await serviceTournament.getTournamentPlayers(req.params.ID));
  } catch (error) {
    console.error("Errore nel recupero dei giocatori di un torneo:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const postAllPlayersToTournament = async (req, res) => {
  try {
    const { tournament_id } = req.body;
    if (!tournament_id) {
      return res.status(400).json({ error: "tournament_id è obbligatorio" });
    }
    res.status(201).json({
      message: "Giocatori aggiunti al torneo con successo",
      data: serviceTournament.postAllPlayersToTournament(tournament_id),
    });
  } catch (error) {
    console.error("Errore nell'aggiunta dei giocatori al torneo:", error);
    res.status(500).json({ error: "Errore nell'inserimento dei dati" });
  }
};
const playersController = require("./playerApiController");
const postPlayerToTournament = playersController.postPlayerToTournament;
const patchPlayerTournamentInfo = playersController.patchPlayerTournamentInfo;

module.exports = {
  getTournaments,
  getTournament,
  postTournament,
  deleteTournament,
  putTournament,

  getTournamentsUsers,
  getTournamentUsers,
  getTournamentUser,

  getTournamentPlayers,
  postAllPlayersToTournament,
  postPlayerToTournament,
  patchPlayerTournamentInfo,
};
