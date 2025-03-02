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
const TournamentModel = require("./Tournaments");
const UsersModel = require("./Users");
const UsersTournamentsModel = require("./Users_Tournaments");
const PlayersModel = require("./Players");
const PlayersTournamentsModel = require("./Players_Tournaments");
const PredictionsModel = require("./Predictions");
// Inizializza i modelli passando solo `sequelize`
const Tournament = TournamentModel(sequelize);
const Users = UsersModel(sequelize);
const UsersTournaments = UsersTournamentsModel(sequelize, DataTypes);
const Players = PlayersModel(sequelize, DataTypes);
const PlayersTournaments = PlayersTournamentsModel(sequelize, DataTypes);
const Predictions = PredictionsModel(sequelize, DataTypes);

// Oggetto che contiene tutti i modelli
const db = {
  sequelize, // Istanza Sequelize
  Sequelize, // Classe Sequelize
  Tournament, // Modello Tornei
  Users, // Modello Utenti
  UsersTournaments, // Modello Utenti-Tornei
  Players, // Modello Giocatori
  PlayersTournaments, // Modello Giocatori-Tornei
  Predictions, // Modello Pronostici
};

// Esporta l'oggetto `db`
module.exports = db;
