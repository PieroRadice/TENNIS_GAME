const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "PlayerTournament",
    {
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Player",
          key: "id",
        },
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Tournament",
          key: "id",
        },
      },
      turno: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "players_tournaments",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "player_tournament_pkey",
          unique: true,
          fields: [{ name: "player_id" }, { name: "tournament_id" }],
        },
      ],
    }
  );
};
