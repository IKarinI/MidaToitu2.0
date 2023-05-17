/* eslint-disable space-before-blocks */
/* eslint-disable no-plusplus */
const express = require('express');
const path = require('path');
const html = require('./html');

const app = express(); // Calling express as a function

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const allRecipes = require('./recipeslist');

const ingredients = require('./ingredients');

const recipes = require('./recipes');

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

recipes.initStudents(allRecipes);
recipes.initIngredients(ingredients);

app.get('/ingredients', (req, res) => res.send({ ingredients }));

app.get('/retseptid', (req, res) => {
  const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 22, 23, 26, 2, 72, 6];
  let response = `${html.header('Retseptid')}<div class="sisu">
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
      <button class="vaataRetsepti" id="${suitableRecipes[i].id}" onClick="location.href = 'retseptid/${suitableRecipes[i].id}';">Vaata Retsepti</button>
      </div>
      </div>
      </div>
      </div>`;
    }
  } else {
    const suitableRecipes = recipes.getSuitableRecipes(results);
    let smallHeadingCount = 0;
    for (let i = 0; i < suitableRecipes.length - 1; i++) {
      if (suitableRecipes[i].noItemsList.length < 1){
        if (smallHeadingCount === 0){
          smallHeadingCount++;
          response += `<div class="tekst">
          <p>Nende retseptide jaoks on kõik koostisosad olemas:</p>
          </div>
          <div class="retseptitabel1">`;
        }
        response += `
          <div class="vretseptikast" id="${allRecipes[suitableRecipes[i].id].id}">
          <div class="sretseptikast">
          <img src="/${allRecipes[suitableRecipes[i].id].pilt}">
          <div class="toiduNimetus">${allRecipes[suitableRecipes[i].id].retseptiNimi}</div>
          <div class="retseptiAsjad">Koostisosad:<div class="koostisosad">`;
        for (let j = 0; j < allRecipes[suitableRecipes[i].id].koostisosad.length - 1; j++) {
          for (let k = 0; k < ingredients.length - 1; k++) {
            if (allRecipes[suitableRecipes[i].id].koostisosad[j] === ingredients[k].id){
              response += ` 
                    ${ingredients[k].Nimetus},`;
            }
          }
        }
        response
          += `</div>
          <button class="vaataRetsepti" id="${allRecipes[suitableRecipes[i].id].id}" onClick="location.href = 'retseptid/${suitableRecipes[i].id}';">Vaata Retsepti</button>
          </div></div></div>`;
      } else {
        if (smallHeadingCount === 1){
          smallHeadingCount++;
          response
          += `<div class="tekst">
          <p>Sulle võivad huvi pakkuda järgmised retseptid:</p>
          </div>
          <div class="retseptitabel2">`;
        }
        response
          += `
          <div class="vretseptikast" id="${allRecipes[suitableRecipes[i].id].id}">
          <div class="sretseptikast">
          <img src="/${allRecipes[suitableRecipes[i].id].pilt}">
          <div class="toiduNimetus">${allRecipes[suitableRecipes[i].id].retseptiNimi}</div>
          <div class="retseptiAsjad">Sul on puudu:`;
        for (let j = 0; j < (suitableRecipes[i].missingItemslistLen) - 1; j++) {
          response += `
              <div class="koostisosad">${suitableRecipes[i].koostisosadeNimekiri[j]}</div>`;
        }
        response += `</div>
        <div class="vaataRetsepti" id="${allRecipes[suitableRecipes[i].id].id}">Vaata Retsepti</div>
        </div>
        </div>
        </div>
        </div>`;
        response += `${html.footer}`;
      }
    }
  }
  return res.send(response);
});

app.get('/otsing', (req, res) => {
  let insideTheBox = '';
  let suitableIngredients = recipes.getIngredients();
  const chosenIngredientsList = [
    { id: 1, Nimetus: 'avokaado' },
    { id: 2, Nimetus: 'banaan' },
    { id: 3, Nimetus: 'basiilik/petersell' },
    { id: 4, Nimetus: 'hapukoor' },
    { id: 5, Nimetus: 'jahu' },
    { id: 7, Nimetus: 'kana' },
    { id: 8, Nimetus: 'kartul' },
    { id: 11, Nimetus: 'küüslauk' },
    { id: 13, Nimetus: 'majonees/ketšup' },
    { id: 14, Nimetus: 'muna' },
    { id: 15, Nimetus: 'murulauk' },
    { id: 18, Nimetus: 'porgand' },
    { id: 22, Nimetus: 'riivsai' },
    { id: 23, Nimetus: 'sai' },
    { id: 27, Nimetus: 'sulajuust' },
    { id: 30, Nimetus: 'vahukoor' },
  ];
  if (Object.keys(req.query).length > 0){
    insideTheBox = req.query.t;
    suitableIngredients = recipes.searchIngredients(ingredients, insideTheBox);
    // chosenIngredientsList=[];
  }
  let response = `${html.header('Retseptide otsing')}<div class="sisu">
  <div class="pealkiri">
    <h1>Mis Sul juba kapis olemas on?</h1>
  </div>
  <div class="veerg1">
    <div class="topnav">
      <form class="search-container">
        <span class="icon"><i class="fa fa-search icon fa-lg"></i></span>
        <input autocomplete="off" type="text" id="myInput" onkeyup="searchDirections()" placeholder="Otsing..." name="search">
      </form>
    </div>

    <div class="nupukast">
      <div id="nupud">`;
  for (let i = 0; i < suitableIngredients.length; i++) {
    response
    += `<button class="nupud" id="${suitableIngredients[i].id}" onClick="addToChosenList('${suitableIngredients[i].id}')">${suitableIngredients[i].Nimetus}</button>`;
  }

  response += `
      </div>

    <div class="first" id="first"></div>
  </div>
  <div class="veerg2">
    <div class="vkast">
      <div class="skast">
        <div class="second" id="second">
          <p>Sinu valikud:</p>
          <a class="otsinupp">Otsi retsepti</a>
        </div>`;
  for (let j = 0; j < chosenIngredientsList.length - 1; j++){
    response += `      
          <div class="nimekirjaElemendid">${chosenIngredientsList[j].Nimetus}</div>`;
  }
  response += `
      </div>
    </div>
  </div>
</div>
${html.footer}`;
  return res.send(response);
});

app.get('/test', (req, res) => {
  const insideTheBox = 'Ba';
  const suitableIngredients = recipes.searchIngredients(ingredients, insideTheBox);
  res.send(suitableIngredients);
});

app.get('/retseptid/:id', (req, res) => {
  const number = req.params.id;
  const recipe = recipes.getRecipeById(number);
  if (recipe === null) {
    return res.send('Sellist retsepti ei leidnud');
  }
  let response = `
    ${html.header(recipe.retseptiNimi)}
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
   ${html.footer}`;
  return res.send(response);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${port}`);
});
