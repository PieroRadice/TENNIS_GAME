const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "Ranking",
    {
      player_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "players",
          key: "name",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      ranking: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "rankings",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "player_name_index",
          unique: true,
          fields: [{ name: "player_name" }], // Chiave primaria su id
        },
      ],
    }
  );
};
