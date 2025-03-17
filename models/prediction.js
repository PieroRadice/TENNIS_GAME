const PredictionRow = require("../models/predictionRow");
module.exports = function (sequelize, DataTypes) {
  const Prediction = sequelize.define(
    "Prediction",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "uuid",
        },
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tournaments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "predictions",
      schema: "public",
      timestamps: true,
      freezeTableName: true,
      indexes: [
        {
          name: "id",
          fields: [{ name: "id" }],
        },
        {
          name: "unique_user_tournament",
          unique: true,
          fields: [{ name: "user_uuid" }, { name: "tournament_id" }],
        },
      ],
    }
  );

  Prediction.associate = (models) => {
    Prediction.hasMany(models.PredictionRow, {
      foreignKey: "prediction_id",
      as: "prediction_id",
    });
  };

  return Prediction;
};

/*
const prediction = new Prediction('2', '4',  [
    { player_id: 2,  prediction: 'semifinalist' }, 
    { player_id: 3,  prediction: 'winner' }, 
    { player_id: 5,  prediction: 'semifinalist' }, 
    { player_id: 1,  prediction: 'semifinalist' }
]);

console.log(prediction);
*/
