const predictionService = require("../../services/predictionService");

const getPredictions = async (req, res) => {
  try {
    const pr = await predictionService.readPredictions();
    res.status(200).json({ success: true, data: pr });
  } catch (error) {
    console.error("Errore nel recupero delle predictions:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const getPredictionById = async (req, res) => {
  try {
    const { id } = req.params; // Estrai il parametro "id" dalla URL

    if (!id) {
      return res.status(400).json({ success: false, message: "ID mancante" });
    }

    const prediction = await predictionService.readPrediction(id);

    if (!prediction || prediction.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Prediction non trovata" });
    }

    res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    console.error("Errore nel recupero della prediction:", error);
    res
      .status(500)
      .json({ success: false, message: "Errore interno del server" });
  }
};

const getPredictionByTournamentId = async (req, res) => {
  try {
    const { id } = req.params; // Estrai il parametro "id" dalla URL

    if (!id) {
      return res.status(400).json({ success: false, message: "ID mancante" });
    }

    const prediction = await predictionService.readPredictionsTournament(id);

    if (!prediction || prediction.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Prediction non trovata" });
    }

    res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    console.error("Errore nel recupero della prediction:", error);
    res
      .status(500)
      .json({ success: false, message: "Errore interno del server" });
  }
};
const getPredictionByUserIdTournamentId = async (req, res) => {
  try {
    const { id } = req.params; // Estrai il parametro "id" dalla URL
    if (!id) {
      return res.status(400).json({ success: false, message: "ID mancante" });
    }

    const user_uuid = res.locals.user.dataValues.uuid;
    const prediction =
      await predictionService.readPredictionByUserIdTournamentId(user_uuid, id);

    if (!prediction || prediction.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Prediction non trovata" });
    }

    res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    console.error("Errore nel recupero della prediction:", error);
    res
      .status(500)
      .json({ success: false, message: "Errore interno del server" });
  }
};

const postPrediction = async (req, res) => {
  const prediction = req.body;
  prediction.user_uuid = res.locals.user.dataValues.uuid;
  //console.log("res.local ", res.locals.user.dataValues.uuid);
  //console.log("prediction ", prediction);
  try {
    const esistePrediction =
      await predictionService.readPredictionByUserIdTournamentId(
        res.locals.user.dataValues.uuid,
        prediction.tournament_id
      );
    console.log("esistePrediction", esistePrediction);
    if (esistePrediction.length === 0) {
      const newPred = await predictionService.createPrediction(prediction);
      res.status(200).json({ success: true, data: newPred });
    } else {
      await predictionService.deletePrediction(esistePrediction[0].id);
      const newPred = await predictionService.createPrediction(prediction);
      res.status(200).json({ success: true, data: newPred });
    }
  } catch (error) {
    res.status(500).json({ error: "Errore nel creare la prediction" });
  }
};

const deletePredictionById = async (req, res) => {
  const _prediction = req.body;
  try {
    pred = await predictionService.readPredictionByUserIdTournamentId(
      res.locals.user.dataValues.uuid,
      _prediction.tournament_id
    );
    console.log("pred", pred);
    if (pred) {
      await predictionService.deletePrediction(pred[0].id);
      res.status(204).end();
    }
  } catch (error) {
    console.error("Errore nel cancellare la prediction:", error);
    res.status(500).json({ error: "Errore nel cancellare la prediction" });
  }
};

module.exports = {
  getPredictions,
  getPredictionById,
  getPredictionByTournamentId,
  getPredictionByUserIdTournamentId,
  postPrediction,
  deletePredictionById,
};
