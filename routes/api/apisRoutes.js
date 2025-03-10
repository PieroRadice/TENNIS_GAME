const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../../middleware/authMiddleware");

//router.use("/users",  requireAuth,  require("./userRoutes"));

router.use("/users", requireAuth, require("./usersApiRoutes"));
router.use("/tournaments", requireAuth, require("./tournamentsApiRoutes"));
router.use("/players", requireAuth, require("./playersApiRoutes"));

module.exports = router;
