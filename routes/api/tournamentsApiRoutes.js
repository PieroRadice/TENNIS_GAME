const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/api/tournamentApiController");
router.get("/", controller.getTournaments);
router.get("/:id", controller.getTournament); //get tournament by ID
router.post("/", controller.postTournament); //create new tournament
router.delete("/:id", controller.deleteTournament); //delete tournament by ID.
router.put("/:id", controller.putTournament); //update tournament by ID
router.get("/users", controller.getTournamentsUsers); //get all users in a tournament
router.get("/:tournamentId/users/:userId", controller.getTournamentUsers); //GET /tournaments/123/users/456 →
router.get("/:id/scripts/",controller.getTournamentsScripts)
// Ottiene i dettagli dell'utente 456 nel torneo 123get all users in a tournament by ID

module.exports = router;
