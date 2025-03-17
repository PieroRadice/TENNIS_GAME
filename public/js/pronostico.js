document.addEventListener("DOMContentLoaded", async () => {
  let semifinalists = [];
  let predictionEsiste = false;
  const playersList = document.getElementById("players-list");
  const semifinalistsList = document.getElementById("semifinalists-list");
  const winnerName = document.getElementById("winner-name");
  const submitButton = document.getElementById("submit-button");

  // Funzione per ottenere i giocatori
  async function fetchPlayers() {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) throw new Error("Errore nel caricamento dei giocatori");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async function fetchRanking(date) {
    try {
      const response = await fetch(`/api/rankings/${date}`);
      if (!response.ok) throw new Error("Errore nel caricamento dei giocatori");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchTournament() {
    try {
      //console.log(window.location.pathname.split("/")[2]);
      const response = await fetch(
        `/api/tournaments/${window.location.pathname.split("/")[2]}`
      );
      if (!response.ok) throw new Error("Errore nel caricamento del torneo");
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
      predictionEsiste = true;
      if (data[0].rows) return data[0].rows;
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
    //conversione
    const convertPredictionToSemifinalist = async (predictionRow) => {
      const playerSemifinalist = {};
      playerSemifinalist.id = predictionRow.player_id;
      playerSemifinalist.prediction = predictionRow.prediction;
      const player = await players.find(
        (player) => player.id === predictionRow.player_id
      );
      if (!player) {
        console.error("Player not found for id:", predictionRow.player_id);
        return null;
      }
      playerSemifinalist.name = player.name;
      playerSemifinalist.country = player.country;
      playerSemifinalist.created_at = player.created_at;
      playerSemifinalist.image_alt = player.image_alt;
      playerSemifinalist.image_src = player.image_src;
      playerSemifinalist.profile_url = player.profile_url;
      return playerSemifinalist;
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

      const rank = document.createElement("div");
      rank.textContent = `Ranking: ${player.rank}`;

      const label = document.createElement("label");
      label.textContent = player.name;

      const country = document.createElement("div");
      country.textContent = player.country;

      const div = document.createElement("div");
      div.classList.add("player");
      div.id = `semi-${player.name}`;
      div.append(img, radio, label, country, rank);
      semifinalistsList.appendChild(div);
      if (prediction && player.prediction == "winner") {
        document.getElementById(`semi-${player.name}`).classList.add("winner");
        radio.checked = true;
      }
    });
  }

  // Caricamento giocatori e creazione elementi
  const { data } = await fetchTournament();
  const players = await fetchPlayers();
  console.log(data);
  const ranking = (await fetchRanking(data.ranking_date)).data;
  console.log("ranking", ranking);
  const prediction = await fetchPrediction();
  if (predictionEsiste) await updateSemifinalists(prediction);
  /*const ranking = await fetchRanking();
  const addRankingToPlayers = ()=>{
    //funzione che aggiunge il ranking ai players
  }
*/
  players.forEach((player) => {
    let giocatoreInPrediction = false;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = player.name;
    //aggiungo ranking
    let newrank = ranking.filter((el) => el.player_name === player.name);
    console.log(newrank[0].ranking);
    if (predictionEsiste) {
      const sem = semifinalists.some((el) => {
        el.name === player.name;
      });
      if (sem) giocatoreInPrediction = true;
    } /*
    if (predictionEsiste) {
      if (semifinalists[0].name == player.name) giocatoreInPrediction = true;
      if (semifinalists[1].name == player.name) giocatoreInPrediction = true;
      if (semifinalists[2].name == player.name) giocatoreInPrediction = true;
      if (semifinalists[3].name == player.name) giocatoreInPrediction = true;
    }*/
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

    const rank = document.createElement("div");
    rank.textContent = `Ranking: ${player.rank}`;

    const label = document.createElement("label");
    label.textContent = player.name;

    const country = document.createElement("div");
    country.textContent = player.country;

    const div = document.createElement("div");
    div.classList.add("player");
    if (giocatoreInPrediction) checkbox.checked = true;
    div.append(img, checkbox, label, country, rank);

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
});
