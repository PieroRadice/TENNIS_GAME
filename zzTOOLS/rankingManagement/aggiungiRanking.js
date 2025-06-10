const fs = require("fs");
const csv = require("csv-parser");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv/config");

const db = require("../../models");
const Player = db.Player;
const Ranking = db.Ranking;

// Configurazione del database
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

// Funzione per elaborare il file CSV
async function processCSV(filePath,rankingDate) {
  await connectDB();
  const results = [];
  fs.createReadStream(filePath)

    .pipe(
      csv({ headers: true, skipLines: 1, trim: true }, { separator: ", " })
    )
    .on("data", (data) => {
      const name = data[Object.keys(data)[0]];
      const value = parseInt(data[Object.keys(data)[1]], 10);
      //const value = data[Object.keys(data)[1]];
      results.push({ name, value });
    })
    .on("end", async () => {
      for (const row of results) {
        console.log("Elaborazione riga:", row);
        const { name, value } = row;

        let player = await Player.findOne({ where: { name } });
        if (!player) {
          player = await Player.create({ name });
        }

        await Ranking.create({
          player_name: name,
          date: new Date(rankingDate),
          ranking: value,
        });
      }
      console.log("Elaborazione completata");
    });
}

// Esegui la funzione con il percorso del file CSV
processCSV("zzTOOLS/rankingManagement/2025-03-31.csv","2025-03-31");
