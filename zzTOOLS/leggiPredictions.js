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
//const predictionService = require("../services/predictionService");
const rank = require("../services/rankingService");
const pred = async () => {
  //await predictionService
  //  .readPredictions(false, false, false)
  await rank
    .readRankingByDate("2025-02-25")
    .then((predictions) => {
      console.log("predictions", predictions);
    })
    .catch((error) => {
      console.log("Errore nella lettura delle predizioni", error);
    });
};

connectDB().then(() => {
  pred();
});
