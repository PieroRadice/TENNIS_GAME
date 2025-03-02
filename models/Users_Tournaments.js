const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_tournaments', {
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'uuid'
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
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users_tournaments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_tournaments_pkey",
        unique: true,
        fields: [
          { name: "user_uuid" },
          { name: "tournament_id" },
        ]
      },
    ]
  });
};
