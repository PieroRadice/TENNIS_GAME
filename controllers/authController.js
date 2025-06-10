const db = require("../models");
const User = db.User;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { spedisciMailConferma } = require("../config/mailer");
const { handleErrors } = require("./authErrorsManagement");

const maxAge = 3 * 24 * 60 * 60;

const getSignup = (req, res) => {
  res.render("signup");
};

const getSignupVerify = (req, res) => {
  res.render("home");
};

const postSignup = (req, res) => {
  const { email, password } = req.body;
  console.log("post - sign up", password);
  let user = null;
  User.sync({ alter: false })
    .then(() => {
      return User.create({ email, password });
    })
    .then((data) => {
      user = data;
      //return spedisciMailConferma(user.email,  user.uuid);
      return spedisciMailConferma("radice.p@gmail.com", user.uuid);
    })
    .then(() => {
      res.status(200).json(user);
      console.log(`mail spedita a ${user.email}`);
    })
    .catch((err) => {
      //console.log(err);
      //la parte di gestione degli errori deve essere sviluppata
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

const confermaSignup = async (req, res) => {
  //devo cercare nel db se esiste il token
  //devo vedere se l'utente è già attivo
  //devo modificare il campo active
  //poi devo confermare l'avvenuta registrazione (magari con una una mail dove invio anche la pssw)
  //poi c'è da gestire la durata della
  const tokenConfermaSignup = req.params.token;
  try {
    const user = await User.findOne({ where: { uuid: tokenConfermaSignup } });

    if (user) {
      if (!user.active) {
        await User.update(
          { active: true },
          { where: { uuid: tokenConfermaSignup } }
        );
      }
      const token = createToken(user.uuid);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

const getLogin = (req, res) => {
  res.render("login");
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await checkLogin(email, password);
    const token = createToken(user.uuid);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.uuid });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
// creazione del token che verrà spedito al client per riconoscerlo nelle richieste successive
const createToken = function (uuid) {
  return jwt.sign({ uuid }, "un segreto generato a caso", {
    expiresIn: maxAge,
  });
};

const checkLogin = async function (email, password) {
  const user = await User.findOne({ where: { email: email } });
  //console.log(user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    //console.log("auth--- " + auth);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const getLogout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  getLogout,
  confermaSignup,
  getSignupVerify,
};
