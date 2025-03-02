const db = require("../models");

const Prediction = db.predictions;
const User = db.users; // Import the User model
const Player = db.players; // Import the Player model
const Tournament = db.tournaments; // Import the Tournament model

const get = async (filters = {}) => {
  try {
    const whereClause = {};
    let includeClause = [];
    // Aggiunge filtri solo se presenti
    if (filters.user_id) {
      whereClause.user_id = filters.user_id;
      includeClause = [{ model: Player }, { model: Tournament }];
    }
    if (filters.tournament_id) {
      whereClause.tournament_id = filters.tournament_id;
      includeClause = [{ model: Player }, { model: User }];
    }
    if (filters.player_id) {
      whereClause.player_id = filters.player_id;
      includeClause = [{ model: User }, { model: Tournament }];
    }
    if (filters.prediction) {
      whereClause.prediction = filters.prediction;
      includeClause = [
        { model: User },
        { model: Player },
        { model: Tournament },
      ];
    }

    // Esegue la query con i filtri dinamici
    const predictions = await Prediction.findAll({
      where: whereClause,
      include: includeClause,
    });
    return predictions;
  } catch (error) {
    console.error("Errore nel recupero delle predictions:", error);
    throw error;
  }
};

const getPredictions = () => get();
const getUserPredictions = (userId) => get({ user_id: userId });
const getTournamentPredictions = (tournamentId) =>
  get({ tournament_id: tournamentId });
const getPlayerPredictions = (playerId) => get({ player_id: playerId });
const getPrediction = (prediction) => get({ prediction });

const postPrediction = async (data) => {
  try {
    const prediction = await Prediction.create(data);
    return prediction;
  } catch (error) {
    console.error("Errore nel salvataggio della prediction:", error);
    throw error;
  }
};

const putPrediction = async (data, id) => {
  try {
    const prediction = await Prediction.update(data, {
      where: { id },
    });
    return prediction;
  } catch (error) {
    console.error("Errore nell'aggiornamento della prediction:", error);
    throw error;
  }
};

const deletePrediction = async (id) => {
  try {
    const prediction = await Prediction.destroy({
      where: { id },
    });
    return prediction;
  } catch (error) {
    console.error("Errore nell'eliminazione della prediction:", error);
    throw error;
  }
};

module.exports = {
  getPredictions,
  getUserPredictions,
  getTournamentPredictions,
  getPlayerPredictions,
  getPrediction,
  postPrediction,
  putPrediction,
  deletePrediction,
}; // Export the functions

module.exports = {};
