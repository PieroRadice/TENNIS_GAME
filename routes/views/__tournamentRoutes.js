const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => res.render("../views/tornei.ejs"));
router.get("/Qatar", (req, res) => res.render("../views/Qatar.ejs"));
router.get("/Qatar/Squadra", (req, res) =>
  res.render("../views/QatarSceltaGiocatori.ejs")
);
module.exports = router;
