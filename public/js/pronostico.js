document.addEventListener("DOMContentLoaded", async () => {
  // Funzione per ottenere i giocatori
  //---------------------------------------------------------------

  class PlayerCard {
    constructor(player, onCheckboxChange) {
      this.player = player;
      this.onCheckboxChange = onCheckboxChange;
      this.element = this.createPlayerElement();
    }

    createPlayerElement() {
      const div = document.createElement("div");
      div.id = `player-${this.player.name}`;
      div.classList.add("player");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = this.player.name;

      if (this.onCheckboxChange) {
        checkbox.onchange = (event) =>
          this.onCheckboxChange(event, this.player);
      }

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

  async function fetchPlayers(rankingDate) {
    try {
      const response = await fetch(`/api/players/ranking/:${rankingDate}`);
      if (!response.ok) throw new Error("Errore nel caricamento dei giocatori");
      const players = (await response.json()).data;
      console.log(players);
      let _punteggioWinner = {};
      let _punteggioSemifinalist = {};
      if (tournament.Scripts.length) {
        _punteggioWinner = tournament.Scripts.find((el) => {
          return el.name === "punteggioWinner";
        });
        _punteggioSemifinalist = tournament.Scripts.find((el) => {
          return el.name === "punteggioSemifinalist";
        });
        console.log(_punteggioSemifinalist.script);
        eval(_punteggioWinner.script);
        eval(_punteggioSemifinalist.script);
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

  async function fetchTournament() {
    try {
      //console.log(window.location.pathname.split("/")[2]);
      let response = await fetch(
        `/api/tournaments/${window.location.pathname.split("/")[2]}/scripts`
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // Funzione per ottenere una prediction esistente
  async function fetchPrediction() {
    try {
      const tournament_id = window.location.pathname.split("/")[2];
      const url = `/api/predictions/tournaments/${tournament_id}/user`;
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

  // Funzione per aggiornare i semifinalisti
  async function updateSemifinalists(prediction = false) {
    /*prediction
    [ {…}, {…}, {…}, {…} ]
    { player_id: 2, prediction: "semifinalist" }
    */
    /*semifinalists
    Array(4) [ {…}, {…}, {…}, {…} ]
    Object { id: 1, name: "Jannik Sinner", country: "ITA", … }​
      country: "ITA"
      created_at: "2025-02-27T18:55:14.697Z"
      id: 1
      image_alt: "Jannik Sinner"
      image_src: "https://www.atptour.com/-/media/alias/player-headshot/s0ag"
      name: "Jannik Sinner"
      prediction: "semifinalist"
      profile_url: "https://www.atptour.comhttps://www.atptour.com/en/players/jannik-sinner/s0ag/overview"
      // */
    const convertPredictionToSemifinalist = async (predictionRow) => {
      const player = await players.find(
        (player) => player.id === predictionRow.player_id
      );
      if (!player) {
        console.error("Player not found for id:", predictionRow.player_id);
        return null;
      }
      player.prediction = predictionRow.prediction;
      return player;
    };

    semifinalistsList.innerHTML = "";

    if (prediction) {
      for (const el of prediction) {
        const sem = await convertPredictionToSemifinalist(el); // Ascolta la promessa
        semifinalists.push(sem);
      }
    }

    semifinalists.forEach((player) => {
      //inizializzo tutti a "semifinalist"
      if (!prediction) {
        player.prediction = "semifinalist";
      }
      //definisco le azioni che devono essere fatte quando si seleziona la checkbox
      //togliere il giocatore da semifinalist,  richaimare updateSemifinalists,
      //cercare il giocatore fra i player e mettere checkbox.checkeda false
      function checkBoxChange(event, player) {
        if (event.target.checked) {
        } else {
          //event.target.checked = false;
          semifinalists = semifinalists.filter((p) => p.name !== player.name);
        }
        const el = document
          .getElementById("players-list")
          .querySelector(`input[type="checkbox"][value='${player.name}']`);
        el.checked = false;
        updateSemifinalists();
      }

      //costruisco la playercard
      const playerCard = new PlayerCard(player, checkBoxChange);
      // console.log("playercard", playerCard.getElement());
      const playerElement = playerCard.getElement();
      const checkbox = playerElement.querySelector("input[type='checkbox']");
      checkbox.checked = true;
      //console.log("semifinalist", playerCard.getElement());
      //aggiungo il radio button per indicare il finalista
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = "rd";
      radio.name = "winner";
      radio.value = player.name;
      const label = document.createElement("label");
      label.for = radio.id;
      label.innerHTML = "Vincitore";
      const d = document.createElement("div");
      player.prediction === "winner"
        ? (radio.checked = true)
        : (radio.checked = false);
      d.append(label, radio);
      radio.onchange = function radioOnchange(event) {
        //metto tutti a "semifinalist" ma il target a "winner"
        //winnerName.innerText = "this.player.name";
        if (event.target.checked) {
          console.log("event.target.checked", event.target.checked);
          semifinalists.forEach((p) => (p.prediction = "semifinalist"));
          player.prediction = "winner";
          //aggiorno lo stile aggiornando le classi
          document
            .querySelectorAll(".winner")
            .forEach((el) => el.classList.remove("winner"));
          document
            .getElementById(`player-${player.name}`)
            .classList.add("winner");
        }
      };
      const sem = playerCard.getElement();
      player.prediction === "winner"
        ? sem.classList.add("winner")
        : sem.classList.add("semifinalist");
      sem.appendChild(d);
      console.log(sem);
      semifinalistsList.appendChild(sem);
      //predictionEsiste? deleteButton.
    });
  }
  //-----------fine updateSemifinalsits
  //---------------------------------------------------------------
  let semifinalists = [];
  let predictionEsiste = false;
  const playersList = document.getElementById("players-list");
  const semifinalistsList = document.getElementById("semifinalists-list");
//  const winnerName = document.getElementById("winner-name");
  const submitButton = document.getElementById("submit-button");
  const deleteButton = document.getElementById("delete-button");
  
  // Caricamento giocatori e creazione elementi
  const tournament = (await fetchTournament()).data[0];
  //console.log("tournament", tournament);
  const players = await fetchPlayers(tournament.ranking_date);
  //console.log("players", players);
  const prediction = await fetchPrediction();
  if (predictionEsiste) await updateSemifinalists(prediction);
  //console.log("prediction", prediction);

  players.forEach((player) => {
    // Funzione per gestire la selezione del giocatore
    function checkBoxChange(event, player) {
      if (event.target.checked) {
        if (semifinalists.length < 4) {
          player.prediction = "semifinalist";
          semifinalists.push(player);
        } else {
          event.target.checked = false;
          alert("Puoi selezionare massimo 4 semifinalisti!");
        }
      } else {
        semifinalists = semifinalists.filter((p) => p.name !== player.name);
      }
      updateSemifinalists();
    }

    let giocatoreInPrediction = semifinalists.some(
      (el) => el.name === player.name
    );

    const playerCard = new PlayerCard(player, checkBoxChange);
    // console.log("playercard", playerCard.getElement());
    const playerElement = playerCard.getElement();
    // Aggiorna lo stato della checkbox
    const checkbox = playerElement.querySelector("input[type='checkbox']");
    if (checkbox) {
      checkbox.checked = giocatoreInPrediction;
    }

    playersList.appendChild(playerElement);
  });

  // Gestione invio pronostico
  submitButton.addEventListener("click", async () => {
    const pronostico = {
      tournament_id: window.location.pathname.split("/")[2],
      rows: semifinalists.map((player) => ({
        player_id: player.id,
        prediction: player.prediction,
      })),
    };

    if (
      pronostico.rows.length !== 4 ||
      pronostico.rows.every((p) => p.prediction !== "winner")
    ) {
      alert("Devi selezionare 4 semifinalisti e un vincitore!");
      return;
    }

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pronostico),
      });

      if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
      alert("Pronostico inviato con successo!");
    } catch (error) {
      console.error("Errore nell'invio dei dati:", error);
    }
  });

  deleteButton.addEventListener("click", async () => {
    const pronostico = {
      tournament_id: window.location.pathname.split("/")[2],
      rows: semifinalists.map((player) => ({
        player_id: player.id,
        prediction: player.prediction,
      })),
    };

    if (
      pronostico.rows.length !== 4 ||
      pronostico.rows.every((p) => p.prediction !== "winner")
    ) {
      alert("Devi selezionare 4 semifinalisti e un vincitore!");
      return;
    }

    try {
      const response = await fetch("/api/predictions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pronostico),
      });

      if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
      location.reload();
      alert("Pronostico eliminato!");
    } catch (error) {
      console.error("Errore nell'invio dei dati per la cancellazione:", error);
    }
  });
});
