
const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "users",
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "users_email",
          unique: true,
          fields: [{ name: "email" }],
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [{ name: "uuid" }],
        },
      ],
    }
  );
};
