const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const creaFileRanking = (pathToDataFile, dataRanking) => {
  const html = fs.readFileSync(pathToDataFile, "utf-8");
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const elems = document
    .getElementsByClassName("mega-table desktop-table non-live")[0]
    .getElementsByClassName("lower-row");
  const players = [];

  for (let i = 0; i < Math.min(600, elems.length); i++) {
    const row = elems[i];
    const player = {};

    // Rank
    const rankElem = row.querySelector("td.rank.bold.heavy.tiny-cell");
    player.rank = elems[i].getElementsByClassName(
      "rank bold heavy tiny-cell"
    )[0].innerHTML;

    player.name = elems[i]
      .getElementsByClassName("name center")[0]
      .getElementsByTagName("span")[0].innerHTML;

    players.push(player);
  }

  // Crea il contenuto CSV
  const csvLines = ["rank,name"];
  players.forEach((p) => {
    csvLines.push(`${p.name},${p.rank}`);
  });

  const csvContent = csvLines.join("\n");
  const outputPath = path.join(__dirname, dataRanking);
  fs.writeFileSync(outputPath, csvContent, "utf-8");

  console.log(`✅ File CSV creato con successo: ${outputPath}`);
};

// Esempio di utilizzo:
// creaFileRanking("./pagina.html", "classifica.csv");

creaFileRanking("./zzTOOLS/rankingManagement/2025-03-31.html", "2025-03-31.csv");
