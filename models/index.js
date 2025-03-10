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
const PredictionRowsModel = require("./predictionRow");
const PredictionsModel = require("./prediction");
const RankingModel = require("./ranking");
const TournamentModel = require("./tournament");
const UsersModel = require("./user");
const UsersTournamentsModel = require("./user_tournament");
// Inizializza i modelli passando solo `sequelize`
const Player = PlayersModel(sequelize, DataTypes);
const PlayerTournament = PlayersTournamentsModel(sequelize, DataTypes);
const PredictionRow = PredictionRowsModel(sequelize, DataTypes);
const Ranking = RankingModel(sequelize, DataTypes);
const Tournament = TournamentModel(sequelize);
const User = UsersModel(sequelize);
const UserTournament = UsersTournamentsModel(sequelize, DataTypes);

const Prediction = PredictionsModel(sequelize, DataTypes);
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
  User, // Modello Utenti
  UserTournament, // Modello Utenti-Tornei
};

// Esporta l'oggetto `db`
module.exports = db;
