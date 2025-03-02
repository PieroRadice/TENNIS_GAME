const express = require("express");
const http = require("http");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv/config");

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRoutes");
const tornei = require("./routes/torneiRoutes");
const apiRouter = require("./routes/apiRoutes");

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));

app.use(authRouter);
app.use("/tornei", requireAuth, tornei);
app.use("/api", apiRouter);

const db = require("./models");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connessione al database riuscita!");
  })
  .catch((err) => {
    console.error("Errore di connessione al database:", err);
  });

const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => {
  console.log(`server in ascolto su porta ${PORT}`);
});
