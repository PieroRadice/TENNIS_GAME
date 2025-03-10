const db = require("../../models");
const { use } = require("../../routes/authRoutes");
const Predictions = db.predictions;
const tournamentService = require("../../services/tournamentService");
const predictionsService = require("../services/predictionsService");

const postPronostico = async (req, res) => {
  //recupero id utente dalla richiesta
  user_id = res.locals.user;
  //recuopero i dati dal body della richiesta
  const predizione = req.body;
  //controllo se il torneo è in corso o completato
  //controllo se l'utente ha già inserito una predizione per quel torneo
  try {
    const torneo = await tournamentService.getTournament(
      predizione.tournament_id
    );
    if (torneo.status === "completed" || torneo.status === "in-progress") {
      res.status(400).json({ error: "Torneo non in corso" });
    }
    if (
      predictionsService.getUserTournamentPredictions(
        user_id,
        predizione.tournament_id
      )
    ) {
      res
        .status(400)
        .json({ error: "Hai già inserito una predizione per questo torneo" });
    }
  } catch (error) {
    res.status(404).json({ error: "Torneo non trovato" });
  }

  //controllo se tutti i players sono presenti nel db
  predizione.players.forEach(async (player) => {
    try {
      const player = await predictionsService.getPlayer(player);
      if (!player) {
        res.status(404).json({ error: "Player non trovato" });
      }
    } catch (error) {
      res.status(404).json({ error: "Player non trovato" });
    }
  });
  //inserimento predizione
  try {
    predizione.players.forEach(async (player) => {
      await predictionsService.postPrediction({
        user_id: user_id,
        tournament_id: predizione.tournament_id,
        player_id: player.id,
        prediction: player.prediction,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'inserimento della predizione" });
  }
};

module.exports = {
  postPronostico,
};
// The controller for predictions is predictionsController.js,  and it has the following code:
