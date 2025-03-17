const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/api/predictionApiController"); //get all predictions
router.use((req, res, next) => {
  console.log(req.url);
  next(); // Importante per far proseguire la richiesta
});
router.get("/", controller.getPredictions); //get predictions
router.get("/:id", controller.getPredictionById); //get player by ID
router.get("/tournaments/:id", controller.getPredictionByTournamentId);
router.get(
  "/tournaments/:id/user",
  controller.getPredictionByUserIdTournamentId
);
router.post("/", controller.postPrediction);
//router.get("/user/:id", controller.getPredictionsUser); //get predictions by user
// Export the router
module.exports = router;
