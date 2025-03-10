const db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const Prediction = db.Prediction;
const PredictionRow = db.PredictionRow;
const Player = db.Player; // Import the Player model
const Ranking = db.Ranking; // Import the Ranking model

const getPredictions = async (filters = {}) => {
  try {
    const whereClause = {};
    const includeClause = [];
    if (filters.user_id) {
      whereClause.user_id = filters.user_id;
      includeClause = [
        { model: PredictionRow, attributes: ["player_id", "prediction"] },
      ];
    }
    if (filters.tournament_Id) {
      whereClause.tournament_id = filters.tournament_id;
      includeClause = [
        { model: PredictionRow, attributes: ["player_id", "prediction"] },
      ];
    }
    const prediction = await Prediction.findAll({
      where: whereClause,
      include: includeClause,
    });
    return prediction;
  } catch (error) {
    console.error("Errore nel recupero delle predictions:", error);
    throw error;
  }
};

const getPrediction = async (id) => {
  try {
    const prediction = await Prediction.findByPk(id, {
      include: [
        {
          model: PredictionRow,
          attributes: ["player_id", "prediction"],
          include: [
            {
              model: Player,
              include: [
                {
                  model: Ranking,
                  attributes: ["ranking"],
                  where: { ranking: { [Op.gt]: 0 } }, // Clausola WHERE per Ranking
                  required: false, // LEFT JOIN invece di INNER JOIN
                },
              ],
            },
          ],
        },
      ],
    });
    return prediction;
  } catch (error) {
    console.error("Errore nel recupero della prediction:", error);
    throw error;
  }
};

const createPrediction = async (predictionData) => {
  const { user_uuid, tournament_id, rows } = predictionData;
  console.log("Creazione di una nuova prediction:", predictionData);

  try {
    // Inizia una transazione per garantire l'atomicità delle operazioni
    const result = await sequelize.transaction(async (t) => {
      // 1. Inserisci il record nella tabella predictions
      const prediction = await Prediction.create(
        {
          user_uuid: user_uuid,
          tournament_id: tournament_id,
        },
        { transaction: t }
      );

      // 2. Recupera l'ID del record appena inserito
      const predictionId = prediction.id;

      // 3. Prepara i dati per l'inserimento in predictions_rows
      const rowsData = rows.map((row) => ({
        prediction_id: predictionId,
        player_id: row.player_id,
        prediction: row.prediction,
      }));

      // 4. Inserisci i record nella tabella predictions_rows
      await PredictionRow.bulkCreate(rowsData, { transaction: t });

      return prediction; // Ritorna il risultato (opzionale)
    });

    console.log("Prediction creata con successo:", result);
    return result;
  } catch (error) {
    console.error("Errore durante la creazione della prediction:", error);
    throw error;
  }
};

module.exports = {
  getPredictions,
  getPrediction,
  createPrediction,
};
