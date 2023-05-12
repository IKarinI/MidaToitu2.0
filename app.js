const express = require('express');
const path = require('path');

const app = express(); // Calling express as a function

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const allRecipes = require('./recipeslist');

const ingredients = require('./ingredients');

const recipes = require('./recipes');

const port = 3000;

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
  for (let i = 0; i < recipe.koostisosadeNimekiri.length - 1; i++) {
    response += `
            <div class="koostisosad">${recipe.koostisosadeNimekiri[i]}</div>`
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
