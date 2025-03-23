const db = require("../models");
const { sequelize } = require("../models");
const Prediction = db.Prediction;
const PredictionRow = db.PredictionRow;

/*
const esempio_prediction = {
  user_uuid: "4630665c-9eb7-4e3b-94d7-4854111e1c0f",
  tournament_id: "4",
  rows: [
    { player_id: 2, prediction: "semifinalist" },
    { player_id: 3, prediction: "winner" },
    { player_id: 5, prediction: "semifinalist" },
    { player_id: 1, prediction: "semifinalist" },
  ],
};
*/
const readPredictionRow = async (prediction_id) => {
  try {
    return await PredictionRow.findAll({
      where: { prediction_id },
    });
  } catch (error) {
    console.error("Errore durante il recupero delle predictionRows:", error);
    throw error;
  }
};

const readPredictions = async (user_uuid, tournament_id, prediction_id) => {
  try {
    const whereClause = {};
    if (user_uuid) whereClause.user_uuid = user_uuid;
    if (tournament_id) whereClause.tournament_id = tournament_id;
    if (prediction_id) whereClause.id = prediction_id;
    const __predictions = await Prediction.findAll({ where: whereClause });
    const predictions = [];
    for (const prediction of __predictions) {
      const _prediction = {
        id: prediction.id,
        user_uuid: prediction.user_uuid,
        tournament_id: prediction.tournament_id,
        rows: [],
      };

      const predictionRows = await readPredictionRow(prediction.id);
      _prediction.rows = predictionRows.map((row) => ({
        player_id: row.player_id,
        prediction: row.prediction,
      }));

      predictions.push(_prediction);
    }
    return predictions;
  } catch (error) {
    console.error("Errore durante il recupero delle predictions:", error);
    throw error;
  }
};

const readPredictionsUser = async (user_uuid) => {
  return await readPredictions(user_uuid, false, false);
};
const readPredictionsTournament = async (tournament_id) => {
  return await readPredictions(false, tournament_id, false);
};
const readPrediction = async (prediction_id) => {
  return await readPredictions(false, false, prediction_id);
};
const readPredictionByUserIdTournamentId = async (user_uuid, tournament_id) => {
  const risultato = await readPredictions(user_uuid, tournament_id, false);
  //risultato.forEach(el=>console.log(el));
  return risultato;
};
const getPredictions = async (filters) => {
  const { userUUID, tournamentId, playerId } = filters;
  console.log("Recupero delle predictions con filtri:", filters);

  try {
    const predictions = await Prediction.findAll({
      where: {
        ...(userUUID && { user_uuid: userUUID }),
        ...(tournamentId && { tournament_id: tournamentId }),
      },
      include: [
        {
          model: PredictionRow,
          as: "rows",
          where: playerId ? { player_id: playerId } : undefined,
          required: playerId ? true : false, // Se playerId è presente, deve esistere almeno una riga corrispondente
        },
      ],
    });

    console.log("Predictions trovate:", predictions);
    return predictions;
  } catch (error) {
    console.error("Errore durante il recupero delle predictions:", error);
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

const updatePrediction = async (predictionId, updateData) => {
  const { user_uuid, tournament_id, rows } = updateData;
  console.log("Aggiornamento della prediction:", predictionId, updateData);

  try {
    const result = await sequelize.transaction(async (t) => {
      // 1. Aggiorna la prediction principale
      await Prediction.update(
        { user_uuid, tournament_id },
        { where: { id: predictionId }, transaction: t }
      );

      // 2. Elimina le righe esistenti per questa prediction
      await PredictionRow.destroy({
        where: { prediction_id: predictionId },
        transaction: t,
      });

      // 3. Inserisci le nuove righe
      const rowsData = rows.map((row) => ({
        prediction_id: predictionId,
        player_id: row.player_id,
        prediction: row.prediction,
      }));

      await PredictionRow.bulkCreate(rowsData, { transaction: t });

      return await Prediction.findByPk(predictionId, { transaction: t });
    });

    console.log("Prediction aggiornata con successo:", result);
    return result;
  } catch (error) {
    console.error("Errore durante l'aggiornamento della prediction:", error);
    throw error;
  }
};

const patchPrediction = async (predictionId, updateData) => {
  console.log("Modifica parziale della prediction:", predictionId, updateData);

  try {
    const result = await sequelize.transaction(async (t) => {
      // Aggiorna solo i campi forniti
      if (updateData.user_uuid || updateData.tournament_id) {
        await Prediction.update(
          {
            user_uuid: updateData.user_uuid,
            tournament_id: updateData.tournament_id,
          },
          { where: { id: predictionId }, transaction: t }
        );
      }

      if (updateData.rows) {
        for (const row of updateData.rows) {
          await PredictionRow.upsert(
            {
              prediction_id: predictionId,
              player_id: row.player_id,
              prediction: row.prediction,
            },
            { transaction: t }
          );
        }
      }

      return await Prediction.findByPk(predictionId, { transaction: t });
    });

    console.log("Prediction modificata con successo:", result);
    return result;
  } catch (error) {
    console.error("Errore durante la modifica della prediction:", error);
    throw error;
  }
};

const deletePrediction = async (predictionId) => {
  console.log("Eliminazione della prediction:", predictionId);

  try {
    await sequelize.transaction(async (t) => {
      // 1. Elimina le righe collegate
      await PredictionRow.destroy({
        where: { prediction_id: predictionId },
        transaction: t,
      });

      // 2. Elimina la prediction
      await Prediction.destroy({
        where: { id: predictionId },
        transaction: t,
      });
    });

    console.log("Prediction eliminata con successo");
    return { message: "Prediction eliminata con successo" };
  } catch (error) {
    console.error("Errore durante l'eliminazione della prediction:", error);
    throw error;
  }
};

module.exports = {
  readPredictions,
  readPredictionsUser,
  readPredictionsTournament,
  readPrediction,
  readPredictionByUserIdTournamentId,
  createPrediction,
  updatePrediction,
  deletePrediction,
  patchPrediction,
};
