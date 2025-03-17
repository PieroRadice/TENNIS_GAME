const serviceRanking = require("../../services/rankingService");

const getRankingByDate = async (req, res) => {
  try {
    const date = req.params.date;
    const ranking = await serviceRanking.readRankingByDate(date);
    res.status(200).json({ success: true, data: ranking });
  } catch (error) {
    console.error("Errore nel recupero del ranking:", error);
    res.status(500).json({ error: "Errore nel recupero ranking" });
  }
};

module.exports = {
    getRankingByDate,
}
