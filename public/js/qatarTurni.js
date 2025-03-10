import { predictions } from "./qatarPredictions.js";
import { playersTurni } from "./qatarPlayersTurni.js";
const punteggi = [];

function risultatoTurno(playerNome, turnoChar) {
  const turno = parseInt(turnoChar);
  if (playersTurni[playerNome].turno > turno) return "ok";
  if (playersTurni[playerNome].turno < turno) return "uscito";
  if (
    playersTurni[playerNome].turno == turno &&
    !playersTurni[playerNome].giocato
  )
    return "inGara";
  if (
    playersTurni[playerNome].turno == turno &&
    playersTurni[playerNome].giocato &&
    playersTurni[playerNome].vinto
  )
    return "ok";
  if (
    playersTurni[playerNome].turno == turno &&
    playersTurni[playerNome].giocato &&
    !playersTurni[playerNome].vinto
  )
    return "esce";
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
    case "esce":
      playerElement.classList.add("highlight");
      break;
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
      break;
    case "esce":
      return false;
      break;
    case "inGara":
      return true;
      break;
    case "ok":
      return true;
      break;
    default:
      return false;
      break;
  }
}
function createCell(turno, title, playerNome, isWinner = false) {
  const cell = document.createElement("div");
  cell.className = isWinner ? "winner" : "cell";
  aggiornaStileGiocatore(cell, risultatoTurno(playerNome, turno));
  cell.innerHTML = `
  <div class="title">${title}</div>
  <div class="player">
    <img src="${playersTurni[playerNome].img}" alt="${playerNome}" />
    ${playerNome}
  </div>
`;
  return cell;
}

export function creaColonne(turno) {
  const columnContainer = document.getElementById("columns");

  predictions.forEach((prediction) => {
    //creazione header con dati dello scommettitore
    punteggi[prediction.name] = 0;

    const column = document.createElement("div");
    column.className = "column";

    const headerCell = document.createElement("div");
    headerCell.className = "header-cell";
    headerCell.innerHTML = `
    <img src="${prediction.img}" alt="Immagine ${prediction.name}" />
    ${prediction.name}
  `;
    column.appendChild(headerCell);
    const punteggioCell = document.createElement("div");
    punteggioCell.className = "punteggio";
    headerCell.appendChild(punteggioCell);
    //creazione della pila dei tennisti
    const content = document.createElement("div");
    content.className = "content";
    if (prediction.winner) {
      content.appendChild(
        createCell(turno, "VINCITORE", prediction.winner, true)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.winner) * 125;
    }
    if (prediction.semi1) {
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi1)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.semi1) * 25;
    }
    if (prediction.semi2) {
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi2)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.semi2) * 25;
    }
    if (prediction.semi3) {
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi3)
      );
      punteggi[prediction.name] +=
        calcolaPunteggioGiocatore(turno, prediction.semi3) * 25;
    }
    punteggioCell.innerHTML = `${punteggi[prediction.name]}`;
    column.appendChild(content);
    columnContainer.appendChild(column);
  });
}
