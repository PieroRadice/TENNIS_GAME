const { Sequelize, DataTypes } = require("sequelize");

// Configura la connessione al database
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PSSW,
  {
    host: process.env.DB_CONNESSIONE,
    dialect: "postgres",
  }
);
// Importa i modelli
const PlayersModel = require("./player");
const PlayersTournamentsModel = require("./playerTournament");
const PredictionsModel = require("./prediction");
const PredictionRowsModel = require("./predictionRow");
const RankingModel = require("./ranking");
const TournamentModel = require("./tournament");
const UsersTournamentsModel = require("./user_tournament");
const UsersModel = require("./user");
// Inizializza i modelli passando solo `sequelize`
const Player = PlayersModel(sequelize, DataTypes);
const PlayerTournament = PlayersTournamentsModel(sequelize, DataTypes);
const Prediction = PredictionsModel(sequelize, DataTypes);
const PredictionRow = PredictionRowsModel(sequelize, DataTypes);
const Ranking = RankingModel(sequelize, DataTypes);
const Tournament = TournamentModel(sequelize);
const UserTournament = UsersTournamentsModel(sequelize, DataTypes);
const User = UsersModel(sequelize);
// Oggetto che contiene tutti i modelli
const db = {
  sequelize, // Istanza Sequelize
  Sequelize, // Classe Sequelize

  Player, // Modello Giocatori
  PlayerTournament, // Modello Giocatori-Tornei
  Prediction, // Modello Pronostici
  PredictionRow,
  Ranking, // Modello Classifiche
  Tournament, // Modello Tornei
  UserTournament, // Modello Utenti-Tornei
  User, // Modello Utenti
};

// Esporta l'oggetto `db`
module.exports = db;

/*
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv/config");

// Configura Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PSSW,
  {
    host: process.env.DB_CONNESSIONE,
    dialect: process.env.DIALECT,
  }
);

const db = {};

// Carica automaticamente tutti i modelli nella cartella `models`
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Configura le associazioni, se presenti nei modelli
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Esporta l'oggetto `db` con tutti i modelli e l'istanza di Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/
