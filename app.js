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
  const allRecipesSmall = recipes.getAllRecipes();


  let response = 
  `${header('sisu')}<div class="sisu">
  <div class="lehepealkiri">
    <h1>Retseptid</h1>
  </div>
  <div class="tekst">
    <p>Nende retseptide jaoks on kõik koostisosad olemas:</p>
  </div>
  <div class="retseptitabel1">
  <div class="vretseptikast" id="1">
  <div class="sretseptikast">
  <img src="pildid/ahjulohe.jpg">
  <div class="toiduNimetus">Ahjulõhe muna-juustu kattega</div>
  <div class="retseptiAsjad">Koostisosad: juust, lõhe, muna, till</div>
  <div class="vaataRetsepti" id="5">Vaata Retsepti</div></div></div></div>

  <div class="tekst">
    <p>Sulle võivad huvi pakkuda järgmised retseptid:</p>
  </div>

  <div class="retseptitabel2">
  <div class="vretseptikast" id="1">
  <div class="sretseptikast">
  <img src="pildid/lohesupp.jpg"><div class="toiduNimetus">Lõhesupp</div>
  <div class="retseptiAsjad">
  Sul on puudu: porgand, porru, vahukoor</div>
  <div class="vaataRetsepti" id="1">Vaata Retsepti</div></div></div></div>
  
</div>
${footer}`;
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
