"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      profile_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_src: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Player",
      tableName: "players",
      timestamps: false, // Disattiva `createdAt` e `updatedAt` automatici
      underscored: true, // Se segui la convenzione con underscore nei nomi delle colonne
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
