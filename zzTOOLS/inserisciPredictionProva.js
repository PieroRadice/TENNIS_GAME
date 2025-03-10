// Configurazione del database
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv/config");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PSSW,
  {
    host: process.env.DB_CONNESSIONE,
    dialect: process.env.DIALECT,
  }
);
// Funzione per connettersi al database
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connessione al database riuscita");
    await sequelize.sync();
  } catch (error) {
    console.error("Errore di connessione al database:", error);
    process.exit(1);
  }
}
const prediction = {
  user_uuid: "4630665c-9eb7-4e3b-94d7-4854111e1c0f",
  tournament_id: "4",
  rows: [
    { player_id: 2, prediction: "semifinalist" },
    { player_id: 3, prediction: "winner" },
    { player_id: 5, prediction: "semifinalist" },
    { player_id: 1, prediction: "semifinalist" },
  ],
};
console.log(prediction);
const predictionService = require("../services/predictionService");

predictionService.createPrediction(prediction);
