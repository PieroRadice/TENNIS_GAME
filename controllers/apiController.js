const { Router } = require("express");
const router = Router();

const db = require("../models");
const Tournament = db.Tournament;



const Users = db.Users;

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Errore nel recupero degli utenti:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { uuid: req.params.uuid },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Errore nel recupero dell'utente:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const postUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Errore nel creare l'utente:", error);
    res.status(500).json({ error: "Errore nel creare l'utente" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: { uuid: req.params.uuid },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Errore nel cancellare l'utente:", error);
    res.status(500).json({ error: "Errore nel cancellare l'utente" });
  }
};

const putUser = async (req, res) => {
  try {
    await Users.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    res.status(200).end();
  } catch (error) {
    console.error("Errore nel modificare l'utente:", error);
    res.status(500).json({ error: "Errore nel modificare l'utente" });
  }
};

const UsersTournaments = db.UsersTournaments;
//tutti gli utenti-tornei
router.get("/users_tournaments", async (req, res) => {
  try {
    const users_tournaments = await UsersTournaments.findAll();
    res.status(200).json(users_tournaments);
  } catch (error) {
    console.error("Errore nel recupero degli utenti-tornei:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});
//tutti i tornei di un utente
router.get("/users_tournaments/:user_uuid", async (req, res) => {
  try {
    const users_tournaments = await UsersTournaments.findAll({
      where: { user_uuid: req.params.user_uuid },
    });
    res.status(200).json(users_tournaments);
  } catch (error) {
    console.error("Errore nel recupero degli utenti-tornei:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});
//tutti gli  utenti di un  torneo
router.get("/users_tournaments/:tournament_id", async (req, res) => {
  try {
    const users_tournaments = await UsersTournaments.findOne({
      where: { tournament_id: req.params.tournament_id },
    });
    res.status(200).json(users_tournaments);
  } catch (error) {
    console.error("Errore nel recupero degli utenti di un torneo:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});
//un utente-torneo
router.get("/users_tournaments/:user_uuid/:tournament_id", async (req, res) => {
  try {
    const users_tournaments = await UsersTournaments.findOne({
      where: {
        user_uuid: req.params.user_uuid,
        tournament_id: req.params.tournament_id,
      },
    });
    res.status(200).json(users_tournaments);
  } catch (error) {
    console.error("Errore nel recupero dell'utente-torneo:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});
module.exports = router;
