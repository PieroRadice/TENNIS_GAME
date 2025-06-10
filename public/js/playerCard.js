class PlayerCard {
  constructor(player) {
    this.player = player;
    this.element = this.createPlayerElement();
  }

  createPlayerElement() {
    const div = document.createElement("div");
    div.id = `player-${this.player.name}`;
    div.classList.add("player");

    const img = document.createElement("img");
    img.src = this.player.image_src || "default.jpg";
    img.alt = this.player.image_alt || this.player.name;

    const punteggio = document.createElement("div");
    punteggio.textContent = this.player.Rankings.length
      ? `${this.player.Rankings[0].ranking} : ${this.player.puntiSemifinalist} / ${this.player.puntiWinner}`
      : "N/D";

    const label = document.createElement("label");
    label.textContent = this.player.name;

    const country = document.createElement("div");
    country.textContent = this.player.country;

    div.append(punteggio, img, checkbox, label, country);
    return div;
  }

  getElement() {
    return this.element;
  }
}

/**
 * Fetches players based on ranking date and tournament.
 * @param {string} rankingDate - The ranking date in YYYY-MM-DD format.
 * @param {Tournament} tournament - The tournament object.
 * @returns {Promise<Object[]>} - The list of players with updated scores.
 * @throws {Error} If fetching data fails.
 */
async function fetchPlayers(rankingDate, tournament) {
  try {
    const response = await fetch(`/api/players/ranking/:${rankingDate}`);
    if (!response.ok) throw new Error("Errore nel caricamento dei giocatori");
    const players = (await response.json()).data;

    var _punteggioWinner = {};
    var _punteggioSemifinalist = {};
    if (tournament.Scripts.length) {
      _punteggioWinner = tournament.Scripts.find((el) => {
        return el.name === "punteggioWinner";
      });
      _punteggioSemifinalist = tournament.Scripts.find((el) => {
        return el.name === "punteggioSemifinalist";
      });
      console.log(_punteggioSemifinalist.script);
      const punteggioSemifinalist = new Function(
        "ranking",
        _punteggioSemifinalist.Scripts
      );

      //
      const punteggioWinner = new Function("ranking", _punteggioWinner.Scripts);
      //eval(_punteggioWinner.script);
      //eval(_punteggioSemifinalist.script);
      players.forEach((player) => {
        if (player.Rankings.length) {
          player.puntiSemifinalist = punteggioSemifinalist(
            player.Rankings[0].ranking
          );
          player.puntiWinner = punteggioWinner(player.Rankings[0].ranking);
        }
      });
    }
    //console.log(players);
    return players;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchTournament(tournamentID) {
  try {
    let response = await fetch(`/api/tournaments/${tournamentID}/scripts`);
    const { data } = await response.json();
    //console.log("response", data[0]);
    return data[0];
  } catch (error) {
    console.error(error);
  }
}
async function fetchTournamentPredictions(tournamentId) {
  try {
    const url = `/api/predictions/tournaments/${tournamentId}`;
    const pred = await fetch(url);
    const { data } = await pred.json();
    return data;
  } catch (error) {
    console.error("Errore nel recupero delle prediction:", error);
  }
}

async function fetchTournamentUserPredictions(tournamentId) {
  try {
    const url = `/api/predictions/tournaments/${tournamentId}`;
    const pred = await fetch(url);
    if (!pred.ok) predictionEsiste = false;
    const { data } = await pred.json();
    if (data[0].rows) {
      predictionEsiste = true;
      return data[0].rows;
    }
  } catch (error) {
    console.error("Errore nel recupero della prediction:", error);
  }
}

async function fetchPredictionLoggedUser(tournamentId) {
  try {
    const url = `/api/predictions/tournaments/${tournamentId}/user`;
    const pred = await fetch(url);
    const { data } = await pred.json();
    if (data[0].rows) {
      return data[0].rows;
    }
  } catch (error) {
    console.error("Errore nel recupero della prediction:", error);
  }
}

export {
  PlayerCard,
  fetchPlayers,
  fetchTournament,
  fetchTournamentUserPredictions,
  fetchTournamentPredictions,
  fetchPredictionLoggedUser,
};
