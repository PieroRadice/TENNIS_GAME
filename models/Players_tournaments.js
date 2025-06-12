const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('players_tournaments', {
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'players',
        key: 'id'
      }
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tournaments',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    turno: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    posizione: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'players_tournaments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "players_tournaments_pkey",
        unique: true,
        fields: [
          { name: "player_id" },
          { name: "tournament_id" },
        ]
      },
    ]
  });
};
