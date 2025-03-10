const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/api/userApiController");
router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.postUser);
router.delete("/:id", controller.deleteUser);
router.put("/:id", controller.putUser);
router.get("/tournaments/", controller.getUsersTournaments);
router.get("/tournaments/:id", controller.getUserTournaments);
router.get("/:idUser/tournaments/:tournamentId", controller.getUserTournament);

module.exports = router;
// The userRoutes.js file is similar to the authRoutes.js file,
// but it has different routes and controllers.
// The userRoutes.js file is responsible for handling all the routes related to users,
//  such as getting all users,  getting a specific user,  creating a user,  deleting a user,
// and updating a user.
