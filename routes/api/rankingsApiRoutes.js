const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/api/rankingApiController"); //get all predictions
router.use((req, res, next) => {
  console.log(req.url);
  next(); // Importante per far proseguire la richiesta
});

router.get("/:date", controller.getRankingByDate); //get player by ID

module.exports = router;