//import { predictions } from "./predictionsMiami.js";
import { playersTurni } from "./playersTurniMiami.js";
//import { players } from "./players.js";

import {
  PlayerCard,
  fetchPlayers,
  fetchTournament,
  fetchTournamentPredictions,
  fetchTournamentUserPredictions,
  fetchPredictionLoggedUser,
} from "./playerCard.js";
import { players } from "./players.js";

const punteggi = [];

function risultatoTurno(playerNome, turnoChar) {
  const turno = parseInt(turnoChar);
  const giocatore = playersTurni.find((player) => player.nome === playerNome);
  if (!giocatore) console.error("Giocatore non trovato", playerNome);
  switch (turno) {
    case 1:
    case 2:
    case 3:
    case 4:
      if (giocatore.turno > turno) return "ok";
      if (giocatore.turno < turno) return "uscito";
      if (giocatore.turno == turno && !giocatore.giocato) return "inGara";
      if (giocatore.turno == turno && giocatore.giocato && giocatore.vinto)
        return "ok";
      if (giocatore.turno == turno && giocatore.giocato && !giocatore.vinto)
        return "esce";
      break;
    case 5:
      if (giocatore.turno > turno) return "ok";
      if (giocatore.turno < 5) return "uscito";
      if (giocatore.turno == turno && !giocatore.giocato) return "inGara";
      if (giocatore.turno == turno && giocatore.giocato && giocatore.vinto)
        return "ok";
      if (giocatore.turno == turno && giocatore.giocato && !giocatore.vinto)
        return "semif";
    case 6:
      //if (giocatore.turno > turno) return "ok"; aso che non esiste
      if (giocatore.turno < 5) return "uscito";
      if (giocatore.turno === 5) return "semif";
      if (giocatore.turno === turno && !giocatore.giocato) return "semif";
      if (giocatore.turno === turno && giocatore.giocato && giocatore.vinto)
        return "ok";
      if (giocatore.turno == turno && giocatore.giocato && !giocatore.vinto)
        return "finalist";
      break;
  }
}
// Assumendo che tu abbia una funzione per aggiungere i giocatori alla DOM
function aggiornaStileGiocatore(playerElement, risultatoTurno) {
  if (!playerElement) return;

  // Rimuovi tutte le classi specifiche
  playerElement.classList.remove("hidden", "transparent", "highlight");

  // Applica lo stile in base al risultatoTurno
  switch (risultatoTurno) {
    case "uscito":
      playerElement.classList.add("hidden");
      break;
    case "inGara":
      playerElement.classList.add("transparent");
      break;
    case "semif":
      playerElement.classList.add("transparent");
      break;
    case "esce": //il caso esce non si verifica in semifinale
      playerElement.classList.add("highlight");
      break;
    case "winn":
      playerElement.classList.add("highlight");
      break;
    case "finalist":
    case "ok":
    default:
      // Nessuna modifica
      break;
  }
}
function calcolaPunteggioGiocatore(turno, playerNome) {
  switch (risultatoTurno(playerNome, turno)) {
    case "uscito":
      return false;
    case "esce":
      return false;
    case "inGara":
      return true;
    case "semif":
      return true;
    case "ok":
      return true;
    case "finalist":
      return true;
    default:
      return false;
  }
}
//FUNZIONE CHE CREA UNA CELLA PER CIASCUN GIOCATORE DEL PRONOSTICO
function createCell(turno, playerNome, isWinner = false) {
  const giocatore = playersTurni.find((player) => player.nome === playerNome);
  const cell = document.createElement("div");
  const semif = risultatoTurno(giocatore.nome, turno);
  cell.className = isWinner ? "winner" : "cell";
  console.log("mod: ", playerNome, "semif", semif);

  aggiornaStileGiocatore(cell, risultatoTurno(giocatore.nome, turno));
  cell.innerHTML = `
  <div class="title">${""}</div>
  <div class="title">punti: ${
    isWinner
      ? puntiRankingWinner(players[playerNome].ranking)
      : puntiRankingSemi(players[playerNome].ranking)
  }</div>
  <div class="player">
    <img src="${players[playerNome].img}" alt="${playerNome}" />
    ${playerNome}
  </div>
  <div class="title">classifica: ${players[playerNome].ranking}</div>
`;

  return cell;
}

export async function creaColonne(tournamentID, turno) {
  console.log(tournamentID);
  let tournament = {};
  let players = [];
  let predictions = [];
  let risultati = playersTurni; //da sostituire poi con un fetch a db quando avremo organizzato i risultati
  try {
    //console.log(",,,,,,,,", await fetchTournament(tournamentID));
    tournament = await fetchTournament(tournamentID);
  } catch (error) {
    console.log(error);
  }
  try {
    players = await fetchPlayers(tournament.rankingDate, tournament);
    console.log(players);
  } catch (error) {
    console.log(error);
  }
  try {
    predictions = await fetchTournamentPredictions(tournamentID);
    console.log(predictions);
  } catch (error) {}

  const columnContainer = document.getElementById("columns");

  predictions.forEach((prediction) => {
    //creazione header con dati dello scommettitore
    punteggi[prediction.name] = 0;

    const column = document.createElement("div");
    column.className = "column";
    console.log("prediction.name", prediction.name);
    const headerCell = document.createElement("div");
    headerCell.className = "header-cell";
    headerCell.innerHTML = `
    <img src="../../immagini/${prediction.img}" alt="Immagine ${prediction.name}" />
    ${user.name}
  `;
    column.appendChild(headerCell);
    const punteggioCell = document.createElement("div");
    punteggioCell.className = "punteggio";
    headerCell.appendChild(punteggioCell);
    //creazione della pila dei tennisti
    const content = document.createElement("div");
    content.className = "content";
    if (prediction.winner) {
      const semif = risultatoTurno(prediction.winner, turno);
      if (semif === "semif") {
        content.appendChild(
          createCell(turno, "VINCITORE", prediction.winner, false)
        );
        punteggi[prediction.name] +=
          calcolaPunteggioGiocatore(turno, prediction.winner) *
          puntiRankingSemi(players[prediction.winner].ranking);
      } else {
        content.appendChild(
          createCell(turno, "VINCITORE", prediction.winner, true)
        );
        punteggi[prediction.name] +=
          calcolaPunteggioGiocatore(turno, prediction.winner) *
          puntiRankingWinner(players[prediction.winner].ranking);
      }
    }
    if (prediction.semi1) {
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi1)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.semi1) *
        puntiRankingSemi(players[prediction.semi1].ranking);
    }
    if (prediction.semi2) {
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi2)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.semi2) *
        puntiRankingSemi(players[prediction.semi2].ranking);
    }
    if (prediction.semi3) {
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi3)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.semi3) *
        puntiRankingSemi(players[prediction.semi3].ranking);
    }
    punteggioCell.innerHTML = `${punteggi[prediction.name]}`;
    column.appendChild(content);
    columnContainer.appendChild(column);
  });
}
