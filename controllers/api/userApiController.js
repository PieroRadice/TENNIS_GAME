const db = require("../../models");

const User = db.User;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Errore nel recupero degli utenti:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
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
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Errore nel creare l'utente:", error);
    res.status(500).json({ error: "Errore nel creare l'utente" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
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
    await User.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    res.status(200).end();
  } catch (error) {
    console.error("Errore nel modificare l'utente:", error);
    res.status(500).json({ error: "Errore nel modificare l'utente" });
  }
};

const patchUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    res.status(200).end();
  } catch (error) {
    console.error("Errore nel modificare l'utente:", error);
    res.status(500).json({ error: "Errore nel modificare l'utente" });
  }
};

const UsersTournaments = db.UserTournament;
const Tournaments = db.Tournaments;
//tutti gli utenti-tornei
const getUsersTournaments = async (req, res) => {
  try {
    const users_tournaments = await User.findAll({
      include: [{ model: Tournaments, through: UsersTournaments }],
    });
    res.status(200).json(users_tournaments);
  } catch (error) {
    console.error("Errore nel recupero degli utenti-tornei:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};
const getUserTournaments = async (req, res) => {
  try {
    const user_tournaments = await User.findByPk(user_uuid, {
      include: [{ model: Tournaments, through: UsersTournaments }],
    });
    res.status(200).json(user_tournaments);
  } catch (error) {
    console.error("Errore nel recupero dei tornei dell'utente:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};
const getUserTournament = async (req, res) => {
  try {
    const user_tournaments = await User.findOne({
      where: {
        user_uuid: req.params.user_uuid,
        tournament_id: req.params.tournament_id,
      },
      include: [{ model: Tournaments, through: UsersTournaments }],
    });
    res.status(200).json(user_tournaments);
  } catch (error) {
    console.error("Errore nel recupero dei tornei dell'utente:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  deleteUser,
  putUser,
  patchUser,

  getUsersTournaments,
  getUserTournaments,
  getUserTournament,
};
