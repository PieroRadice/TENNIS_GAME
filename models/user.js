//const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = function (sequelize) {
  return sequelize.define(
    "User",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // genera automaticamente UUID
        allowNull: false,
        primaryKey: true,
      },
      soprannome: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
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
        set(value) {
          console.log("set---------", value);
          //dobbiamo validare il valore immesso dall'utente in questa fase,  utilizzando una regex in validate andremmo a validare il risultato di bcrypt e non il valore immesso dall'utente
          const check =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!check.test(value)) {
            throw new Error("Validation is on password failed");
          }
          this.setDataValue(
            "password",
            bcrypt.hashSync(value, bcrypt.genSaltSync())
          );
          //per recuperare la password invece occorre decriptarla per poterla confrontare con il valore immesso da parte dell'utente
        },
      },

      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "user_email",
          unique: true,
          fields: [{ name: "email" }],
        },
        {
          name: "user_pkey",
          unique: true,
          fields: [{ name: "uuid" }],
        },
      ],
    }
  );
};
