const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../../middleware/authMiddleware");

//router.use("/users",  requireAuth,  require("./userRoutes"));

router.use("/users", requireAuth, require("./usersApiRoutes"));
router.use("/tournaments", requireAuth, require("./tournamentsApiRoutes"));
router.use("/players", requireAuth, require("./playersApiRoutes"));
router.use("/predictions", requireAuth, require("./predictionsApiRoutes"));
router.use("/rankings", requireAuth, require("./rankingsApiRoutes"));
module.exports = router;
