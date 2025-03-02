var DataTypes = require("sequelize").DataTypes;
var _users = require("./Users");

function initModels(sequelize) {
  var Users = _users(sequelize, DataTypes);

  return {
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
