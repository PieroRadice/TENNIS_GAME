//questo file raccoglie tutte le route che hanno a che fare con il processo di autenticazione
const { Router } = require("express");
const controller = require("../controllers/authController");
const router = Router();
//rispetto a quanto avremmo fatto nel file app qui semplicemente sostituiamo a app la costante router
//di fatto router eredita da express la capacità di gestire le req,  esattamente come avrebbe fatto la app
//router.get('/',  (req,  res) => res.render('home'));
router.get("/signup", controller.getSignup);
router.post("/signup", controller.postSignup);
router.get("/signup_verify", controller.getSignupVerify);
router.get("/confermaSignup/:token", controller.confermaSignup);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);
router.get("/logout", controller.getLogout);
// ciascuna delle righe di codice che precedono devono indicare che cosa la web app deve fare per ciascuna delle
//rotte. Per migliorare la leggibilità e la manutenibilità del codice queste funzioni sono raggruppate in file
//separati nella cartella controllers dove è contenuta la logica dell'applicazione
module.exports = router;
