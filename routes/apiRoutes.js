const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../middleware/authMiddleware");

router.use("/users", requireAuth, require("./userRoutes"));
router.use("/tournaments", requireAuth, require("./tournamentRoutes"));
router.use("/players", requireAuth, require("./playerRoutes"));

module.exports = router;
