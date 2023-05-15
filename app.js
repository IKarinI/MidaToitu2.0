/* eslint-disable space-before-blocks */
/* eslint-disable no-plusplus */
const express = require('express');
const path = require('path');

const app = express(); // Calling express as a function

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const allRecipes = require('./recipeslist');

const ingredients = require('./ingredients');

const recipes = require('./recipes');

const port = 5000;

recipes.initStudents(allRecipes);

// eslint-disable-next-line no-undef


const header = (heading) => `
<!DOCTYPE html>
<html lang="et">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="/style.css" />
    <title>${heading}</title>
  </head>

  <body>
    <div class="vjoon" id="vj1"></div>
    <div class="vjoon" id="vj2"></div>
    <div class="vjoon" id="vj3"></div>
    <div class="v2line">`;

const footer = `
  </div>
  </body>
  </html>`;

app.get('/retseptid', (req, res) => {
  const results = [];
  let response = `${header('Retseptid')}<div class="sisu">
  <div class="lehepealkiri">
    <h1>Retseptid</h1>
  </div>`;
  // Siin, mul topelt kontroll samale asjale, Kõigepealt funktsioonis sees ja siis siin
  // eslint-disable-next-line max-len
  // Peaks funktsiooni kontrolli koha pealt jagama kaheks, peale seda kontrolli siin suunab vstava funktsiooni juurde.
  if (results.length < 1) {
    const showOnOnePage = 10;
    const suitableRecipes = recipes.getAllRecipes();
    for (let i = 0; i < showOnOnePage - 1; i++) {
      response
      += `
      <div class="retseptitabel2">
      <div class="vretseptikast" id="${suitableRecipes[i].id}">
      <div class="sretseptikast">
      <img src="/${suitableRecipes[i].pilt}">
      <div class="toiduNimetus">${suitableRecipes[i].retseptiNimi}</div>
      <div class="vaataRetsepti" id="${suitableRecipes[i].id}">Vaata Retsepti</div>
      </div>
      </div>
      </div>
      </div>`;
    }
  } else {
    const suitableRecipes = recipes.getSuitableRecipes(results);
    for (let i = 0; i < suitableRecipes.length - 1; i++) {
      if (suitableRecipes[i].noItemsList.length < 1){
        response += `<div class="tekst">
          <p>Nende retseptide jaoks on kõik koostisosad olemas:</p>
          </div>
          <div class="retseptitabel1">
          <div class="vretseptikast" id="${allRecipes[i].id}">
          <div class="sretseptikast">
          <img src="/${allRecipes[i].pilt}">
          <div class="toiduNimetus">${allRecipes[i].retseptiNimi}</div>
          <div class="retseptiAsjad">Koostisosad:<div class="koostisosad">`
        for (let j = 0; j < allRecipes[i].koostisosad.length - 1; j++) {
          response += ` 
                  ${allRecipes[i].koostisosadeNimekiri[j]},`;
        }
        response +=
          `</div>
          <div class="vaataRetsepti" id="${suitableRecipes[i].id}">Vaata Retsepti</div></div></div></div>`
      } else {
        response
          += `<div class="tekst">
          <p>Sulle võivad huvi pakkuda järgmised retseptid:</p>
          </div>
          <div class="retseptitabel2">
          <div class="vretseptikast" id="${allRecipes[i].id}">
          <div class="sretseptikast">
          <img src="/${allRecipes[i].pilt}">
          <div class="toiduNimetus">${allRecipes[i].retseptiNimi}</div>
          <div class="retseptiAsjad">Sul on puudu:`;
        for (let j = 0; j < suitableRecipes[i].missingItems.length - 1; j++) {
          response += `
              <div class="koostisosad">${suitableRecipes[i].koostisosadeNimekiri[j]}</div>`;
        }
        response += `</div>
        <div class="vaataRetsepti" id="${suitableRecipes[i].id}">Vaata Retsepti</div>
        </div>
        </div>
        </div>
        </div>`;
        response += `${footer}`;
      }
    }
  }
  return res.send(response);
});

app.get('/test', (req, res) => {
  const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 22, 23, 26, 2, 72, 6];
  const suitableRecipes = recipes.getSuitableRecipes(results);
  res.send(suitableRecipes);
});

app.get('/retseptid/:id', (req, res) => {
  const number = req.params.id;
  const recipe = recipes.getRecipeById(number);
  if (recipe === null) {
    return res.send('Sellist retsepti ei leidnud');
  }
  let response = `
    ${header(recipe.retseptiNimi)}
    <div class="vkast3">
    <div class="skast3">
      <div class="nimekast">
        <div class="nimi">${recipe.retseptiNimi}</div>
      </div>
      <div class="ylemine">
        <div class="peaminepilt">
          <img src="/${recipe.pilt}" class="pilt"></div>
        <div class="koostisosadValmistamine">
          <div class="koostisosadPea">
            <h3 class="pealkiri2">Koostisosad:</h3>`;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < recipe.koostisosadeNimekiri.length - 1; i++) {
    response += `
            <div class="koostisosad">${recipe.koostisosadeNimekiri[i]}</div>`;
  }
  response += `
          </div>
          <div class="valmistamiseKast">
            <h3 class="pealkiri2">Valmistamine:</h3>
            <div class="valmistamine">${recipe.valmistamine}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
   ${footer}`;
  return res.send(response);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${port}`);
});
