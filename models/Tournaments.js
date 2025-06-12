const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "tournaments",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // id è la chiave primaria
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      href: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: { type: DataTypes.STRING(255), allowNull: true },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      surface: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      prizemoney: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      datainizio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      datafine: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tournaments",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "tournaments_pkey",
          unique: true,
          fields: [{ name: "id" }], // Chiave primaria su id
        },
        {
          name: "unique_name_year", // Nome dell'indice univoco
          unique: true,
          fields: [
            { name: "name" }, // Campo name
            sequelize.literal("EXTRACT(YEAR FROM datafine)"), // Anno estratto da datafine
          ],
        },
      ],
    }
  );
};
