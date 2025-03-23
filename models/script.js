const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "Script",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      script: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "scripts",
      schema: "public",
    }
  );
};
