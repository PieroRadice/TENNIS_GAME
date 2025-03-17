const router = require("express").Router();

const tournamentService = require("../../services/tournamentService");

router.get("/", (req, res) => {
  res.render("tornei");
});
router.get("/:id/pronostico", async (req, res) => {
  res.render("pronostico", {
    tournament: await tournamentService.getTournament(req.params.id),
  });
});
router.post("/:id/pronostico", async (req, res) => {
  res.render("pronostico", {
    tournament: await service.getTournament(req.params.id),
  });
});
module.exports = router;
// The routes are the same,  but the controller is different.
// The controller for tournaments is tournamentsController.js,  while the controller for tornei is torneiController.js.
// The controller for tornei is in the controllers folder,  and it has the following code:
