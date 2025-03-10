/*
var DataTypes = require("sequelize").DataTypes;
var _tournaments = require("./Tournaments");
var _users = require("./Users");
var _users_tournaments = require("./Users_Tournaments");
var _players = require("./Players");

function initModels(sequelize) {
  var tournaments = _tournaments(sequelize,  DataTypes);
  var users = _users(sequelize,  DataTypes);
  var users_tournaments = _users_tournaments(sequelize,  DataTypes);
  var players = _players(sequelize,  DataTypes);

  return {
    tournaments, 
    users, 
    users_tournaments, 
    players, 
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
*/
