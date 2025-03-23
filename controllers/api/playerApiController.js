const db = require("../../models");
const playerService = require("../../services/playersService");

const Players = db.Player;

const getPlayers = async (req, res) => {
  try {
    const player = await Players.findAll();
    res.status(200).json(player);
  } catch (error) {
    console.error("Errore nel recupero degi giocatori:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};
const getPlayersWithRankingDate = async (req, res) => {
  try {
    const rankingDate = req.params.date;
    const result = await playerService.readPlayers(false, rankingDate);
    res.status(200).json({ success: "ok", data: result });
  } catch (error) {
    console.error("Errore nel recupero dei giocatori con ranking:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await Players.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Errore nel recupero delgiocatore:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const postPlayer = async (req, res) => {
  try {
    const player = await Players.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    console.error("Errore nel creare il giocatore:", error);
    res.status(500).json({ error: "Errore nel creare il giocatore" });
  }
};

const deletePlayer = async (req, res) => {
  try {
    await Players.destroy({
      where: { id: req.params.id },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Errore nel cancellare il giocatore:", error);
    res.status(500).json({ error: "Errore nel cancellare il giocatore" });
  }
};

const putPlayer = async (req, res) => {
  try {
    await Players.update(req.body, {
      where: { uuid: req.params.id },
    });
    res.status(200).end();
  } catch (error) {
    console.error("Errore nel modificare il giocatore:", error);
    res.status(500).json({ error: "Errore nel modificare il giocatore" });
  }
};

const postPlayerToTournament = async (req, res) => {
  try {
    const { player_id, tournament_id } = req.body;

    if (!player_id || !tournament_id) {
      return res
        .status(400)
        .json({ error: "player_id e tournament_id sono obbligatori" });
    }

    // Recupera il rating del giocatore dalla tabella Players
    const player = await Players.findByPk(player_id);
    if (!player) {
      return res.status(404).json({ error: "Giocatore non trovato" });
    }

    // Crea la nuova entry nella tabella players_tournaments
    const newEntry = await players_tournaments.create({
      player_id,
      tournament_id,
      rating: player.rating, // Usa il rating del giocatore dalla tabella Players
    });

    res.status(201).json({
      message: "Giocatore aggiunto al torneo con successo",
      data: newEntry,
    });
  } catch (error) {
    console.error("Errore nell'aggiunta del giocatore al torneo:", error);
    res.status(500).json({ error: "Errore nell'inserimento dei dati" });
  }
};

const patchPlayerTournamentInfo = async (req, res) => {
  try {
    const { player_id, tournament_id } = req.params;
    const { turno, posizione } = req.body;

    if (turno === undefined || !posizione) {
      return res
        .status(400)
        .json({ error: "I campi turno e posizione sono obbligatori" });
    }

    // Trova il record nella tabella players_tournaments
    const playerTournament = await players_tournaments.findOne({
      where: { player_id, tournament_id },
    });

    if (!playerTournament) {
      return res
        .status(404)
        .json({ error: "Giocatore non trovato nel torneo" });
    }

    // Aggiorna i campi turno e posizione
    await playerTournament.update({ turno, posizione });

    res.status(200).json({
      message: "Dati aggiornati con successo",
      data: playerTournament,
    });
  } catch (error) {
    console.error("Errore nell'aggiornamento dei dati del giocatore:", error);
    res.status(500).json({ error: "Errore nell'aggiornamento dei dati" });
  }
};

const deletePlayerFromTournament = async (req, res) => {
  try {
    const { player_id, tournament_id } = req.body;

    if (!player_id || !tournament_id) {
      return res
        .status(400)
        .json({ error: "player_id e tournament_id sono obbligatori" });
    }

    // Cerca l'entry nella tabella players_tournaments
    const entry = await players_tournaments.findOne({
      where: { player_id, tournament_id },
    });
    if (!entry) {
      return res.status(404).json({ error: "Giocatore non trovato" });
    }

    // Cancella l'entry dalla tabella players_tournaments
    await entry.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(
      "Errore nella cancellazione del giocatore dal torneo:",
      error
    );
    res.status(500).json({ error: "Errore nella cancellazione dei dati" });
  }
};

module.exports = {
  getPlayers,
  getPlayersWithRankingDate,
  getPlayer,
  postPlayer,
  deletePlayer,
  putPlayer,

  postPlayerToTournament,
  patchPlayerTournamentInfo,
  deletePlayerFromTournament,
};
