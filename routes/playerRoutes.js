const { Router } = require("express");
const router = Router();
const controller = require("../controllers/playersController");
router.get("/", controller.getPlayers);
router.get("/:id", controller.getPlayer); //get player by ID
router.post("/", controller.postPlayer); //create new player
router.delete("/:id", controller.deletePlayer); //delete player by ID
router.put("/:id", controller.putPlayer); //update player by ID

module.exports = router;
