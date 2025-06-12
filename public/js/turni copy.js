const playersTurni = {
  "Jannik Sinner": {
    turno: 7,
    giocato: 0,
    vinto: 1,
    img: "https://www.atptour.com/-/media/alias/player-headshot/s0ag",
  },
  "Alexander Zverev": {
    turno: 6,
    giocato: 0,
    vinto: 1,
    img: "https://www.atptour.com/-/media/alias/player-headshot/z355",
  },
  "Carlos Alcaraz": {
    turno: 6,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/a0e2",
  },
  "Taylor Fritz": {
    turno: 3,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/fb98",
  },
  "Daniil Medvedev": {
    turno: 2,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/mm58",
  },
  "Novak Djokovic": {
    turno: 7,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/d643",
  },
  "Andrey Rublev": {
    turno: 1,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/re44",
  },
  "Jack Draper": {
    turno: 4,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/D0CO",
  },
  "Lorenzo Musetti": {
    turno: 3,
    giocato: 1,
    vinto: 0,
    img: "https://www.atptour.com/-/media/alias/player-headshot/m0ej",
  },
};

const predictions = [
  {
    name: "Pier",
    img: "https://www.tennisworlditalia.com/imgb/40869/la-rivista-gq-descrive-federer-come-il-migliore-di-sempre-e-partono-le-critiche.webp",
    winner: "Jannik Sinner",
    semi1: "Carlos Alcaraz",
    semi2: "Daniil Medvedev",
    semi3: "Novak Djokovic",
  },
  {
    name: "Pam",
    img: "https://static2.amica.it/wp-content/uploads/2023/07/8456559_large.jpg?v=1278015_1688727790",
    winner: "Carlos Alcaraz",
    semi1: "Jannik Sinner",
    semi2: "Alexander Zverev",
    semi3: "Daniil Medvedev",
  },
  {
    name: "Piero",
    img: "immagini/agassi.png",
    winner: "Taylor Fritz",
    semi1: "Jannik Sinner",
    semi2: "Jack Draper",
    semi3: "Lorenzo Musetti",
  },
  {
    name: "Lombo",
    img: "https://c7.alamy.com/compit/gbwtye/tennis-wimbledon-championships-mens-singles-final-bjorn-borg-v-john-mcenroe-bjorn-borg-in-azione-gbwtye.jpg",
    winner: "Carlos Alcaraz",
    semi1: "Jannik Sinner",
    semi2: "Alexander Zverev",
    semi3: "Novak Djokovic",
  },
  {
    name: "Mix",
    img: "https://compass-media.vogue.it/photos/6481dae3e03ab1e612092926/3:4/w_1920,c_limit/3241967",
    winner: "Jannik Sinner",
    semi1: "Taylor Fritz",
    semi2: "Carlos Alcaraz",
    semi3: "Andrey Rublev",
  },
  {
    name: "Rob",
    img: "immagini/wavrinka.png",
    winner: "Alexander Zverev",
    semi1: "Carlos Alcaraz",
    semi2: "Jannik Sinner",
    semi3: "Andrey Rublev",
  },
  {
    name: "Cuzzo",
    img: "immagini/macroe.png",
    winner: "Jannik Sinner",
    semi1: "Taylor Fritz",
    semi2: "Carlos Alcaraz",
    semi3: "Alexander Zverev",
  },
  {
    name: "Gigi",
    img: "https://static.wixstatic.com/media/aff08a_abda19b7314f4c42a58085b83414859f~mv2.png/v1/crop/x_40,y_0,w_830,h_1270/fill/w_634,h_970,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pete%20Sampras%2C%20%40Tennis.png",
    winner: "Jannik Sinner",
    semi1: "Carlos Alcaraz",
    semi2: "Daniil Medvedev",
    semi3: "Andrey Rublev",
  },
];

export function risultatoTurno(playerNome, turnoChar) {
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
export function aggiornaStileGiocatore(playerElement, risultatoTurno) {
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
export function createCell(turno, title, playerNome, isWinner = false) {
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
    const column = document.createElement("div");
    column.className = "column";

    const headerCell = document.createElement("div");
    headerCell.className = "header-cell";
    headerCell.innerHTML = `
    <img src="${prediction.img}" alt="Immagine ${prediction.name}" />
    ${prediction.name}
  `;
    column.appendChild(headerCell);
    //creazione della pila dei tennisti
    const content = document.createElement("div");
    content.className = "content";

    if (prediction.winner)
      content.appendChild(
        createCell(turno, "VINCITORE", prediction.winner, true)
      );

    if (prediction.semi1)
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi1)
      );

    if (prediction.semi2)
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi2)
      );

    if (prediction.semi3)
      content.appendChild(
        createCell(turno, "ALTRO SEMIFINALISTA", prediction.semi3)
      );

    column.appendChild(content);
    columnContainer.appendChild(column);
  });
}
