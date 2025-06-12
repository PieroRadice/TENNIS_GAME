document.addEventListener("DOMContentLoaded", async () => {
  let semifinalists = [];
  let predictionEsiste = false;
  const playersList = document.getElementById("players-list");
  const semifinalistsList = document.getElementById("semifinalists-list");
  const winnerName = document.getElementById("winner-name");
  const submitButton = document.getElementById("submit-button");
  const deleteButton = document.getElementById("delete-button");

  // Funzione per ottenere i giocatori
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

*/
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

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "winner";
      radio.value = player.name;
      radio.onchange = function radioOnchange() {
        //metto tutti a "semifinalist" ma il target a "winner"
        winnerName.innerText = player.name;
        semifinalists.forEach((p) => (p.prediction = "semifinalist"));
        player.prediction = "winner";
        //aggiorno lo stile aggiornando le classi
        document
          .querySelectorAll(".winner")
          .forEach((el) => el.classList.remove("winner"));
        document.getElementById(`semi-${player.name}`).classList.add("winner");
      };

      const img = document.createElement("img");
      img.src = player.image_src || "default.jpg";
      img.alt = player.image_alt || player.name;

      const punteggio = document.createElement("div");
      if (player.Rankings.length) {
        punteggio.textContent = `${player.Rankings[0].ranking} : ${player.puntiSemifinalist} / ${player.puntiWinner}`;
      } else {
        punteggio.textContent = "N/D";
      }
      const label = document.createElement("label");
      label.textContent = player.name;

      const country = document.createElement("div");
      country.textContent = player.country;

      const div = document.createElement("div");
      div.classList.add("player");
      div.id = `semi-${player.name}`;
      div.append(punteggio, img, radio, label, country);

      semifinalistsList.appendChild(div);
      if (prediction && player.prediction == "winner") {
        document.getElementById(`semi-${player.name}`).classList.add("winner");
        radio.checked = true;
      }
    });
  }
  //---------------------------------------------------------------
  // Caricamento giocatori e creazione elementi
  const tournament = (await fetchTournament()).data[0];
  console.log("tournament", tournament);
  const players = await fetchPlayers(tournament.ranking_date);

  const prediction = await fetchPrediction();
  if (predictionEsiste) await updateSemifinalists(prediction);
  //---------------------------------------------------------------
  players.forEach((player) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = player.name;

    //verifico che il giocatore sia nelle prediction per gestire la checkbox
    let giocatoreInPrediction = false;
    if (predictionEsiste) {
      const sem = semifinalists.some((el) => {
        return el.name === player.name;
      });
      //console.log("sem", sem);
      if (sem) giocatoreInPrediction = true;
    }
    //funzione per scegliere il giocatore
    checkbox.onchange = function checkBoxChange() {
      if (checkbox.checked) {
        if (semifinalists.length < 4) {
          player.prediction = "semifinalist";
          semifinalists.push(player);
        } else {
          checkbox.checked = false;
          alert("Puoi selezionare massimo 4 semifinalisti!");
        }
      } else {
        semifinalists = semifinalists.filter((p) => p.name !== player.name);
      }
      updateSemifinalists();
    };

    const img = document.createElement("img");
    img.src = player.image_src || "default.jpg";
    img.alt = player.image_alt || player.name;
    //const rank = document.createElement("div");
    const punteggio = document.createElement("div");
    if (player.Rankings.length) {
      punteggio.textContent = `${player.Rankings[0].ranking} : ${player.puntiSemifinalist} / ${player.puntiWinner}`;
    } else {
      punteggio.textContent = "N/D";
    }

    const label = document.createElement("label");
    label.textContent = player.name;

    const country = document.createElement("div");
    country.textContent = player.country;

    const div = document.createElement("div");
    div.classList.add("player");
    if (giocatoreInPrediction) checkbox.checked = true;
    div.append(punteggio, img, checkbox, label, country);

    playersList.appendChild(div);
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
