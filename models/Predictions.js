const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('predictions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uuid'
      },
      unique: "unique_prediction"
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tournaments',
        key: 'id'
      },
      unique: "unique_prediction"
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'players',
        key: 'id'
      },
      unique: "unique_prediction"
    },
    prediction: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'predictions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "predictions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_prediction",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "tournament_id" },
          { name: "player_id" },
        ]
      },
    ]
  });
};
