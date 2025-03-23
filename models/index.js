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
const ScriptModel = require("./script");
const UsersTournamentsModel = require("./user_tournament");
const UsersModel = require("./user");
// Inizializza i modelli passando solo `sequelize`
const Player = PlayersModel(sequelize, DataTypes);
const PlayerTournament = PlayersTournamentsModel(sequelize, DataTypes);
const Prediction = PredictionsModel(sequelize, DataTypes);
const PredictionRow = PredictionRowsModel(sequelize, DataTypes);
const Ranking = RankingModel(sequelize, DataTypes);
const Script = ScriptModel(sequelize, DataTypes);
const Tournament = TournamentModel(sequelize);
const UserTournament = UsersTournamentsModel(sequelize, DataTypes);
const User = UsersModel(sequelize);

//definisco le relazioni fra le tabelle
//Molti a molti User Tournament
Tournament.belongsToMany(User, {
  through: UserTournament,
  foreignKey: "tournament_id",
  otherKey: "user_uuid",
});
User.belongsToMany(Tournament, {
  through: UserTournament,
  foreignKey: "user_uuid",
  otherKey: "tournamen_id",
});
//Player Ranking
Player.hasMany(Ranking, {
  foreignKey: "player_name",
  sourceKey: "name",
});
Ranking.belongsTo(Player, { foreignKey: "player_name", targetKey: "name" });
//Tournament Srcips
Tournament.belongsToMany(Script, {
  through: "TournamentScript",
  foreignKey: "tournament_id",
});
Script.belongsToMany(Tournament, {
  through: "TournamentScript",
  foreignKey: "scriptName",
});

// Oggetto che contiene tutti i modelli
const db = {
  sequelize, // Istanza Sequelize
  Sequelize, // Classe Sequelize

  Player, // Modello Giocatori
  PlayerTournament, // Modello Giocatori-Tornei
  Prediction, // Modello Pronostici
  PredictionRow,
  Ranking, // Modello Classifiche
  Script,
  Tournament, // Modello Tornei
  UserTournament, // Modello Utenti-Tornei
  User, // Modello Utenti
};

// Esporta l'oggetto `db`
module.exports = db;
