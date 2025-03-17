const db = require("../models");
//const { sequelize } = require("../models");
const Ranking = db.Ranking;

const readRankingByDate = async (date) => {
  console.log("date",date);
  try {
    return await Ranking.findAll({
      where: { date },
    });
  } catch (error) {
    console.error("errore durante il recupero del ranking");
  }
};

module.exports = {
  readRankingByDate,
};
