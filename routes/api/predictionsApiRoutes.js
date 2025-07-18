const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/api/predictionApiController"); //get all predictions
/*router.use((req, res, next) => {
  console.log(req.url);
  next(); // Importante per far proseguire la richiesta
});*/
router.get("/", controller.getPredictions); //get predictions
router.get("/:id", controller.getPredictionById); //get player by ID
router.get("/tournaments/:id", controller.getPredictionsByTournamentId);
router.get(
  "/tournaments/:id/user",
  controller.getPredictionByUserIdTournamentId
);
router.post("/", controller.postPrediction);
router.patch("/", controller.postPrediction);
router.put("/", controller.postPrediction);
router.delete("/", controller.deletePredictionById);

// Export the router
module.exports = router;
