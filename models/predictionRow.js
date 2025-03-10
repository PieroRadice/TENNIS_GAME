//const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "PredictionsRows",
    {
      prediction_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "predictions",
          key: "id",
        },
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
      prediction: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "predictions_rows",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "unique_prediction_rows",
          unique: true,
          fields: [{ name: "prediction_id" }, { name: "player_id" }],
        },
      ],
    }
  );
};
