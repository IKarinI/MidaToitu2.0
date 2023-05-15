/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
let recipes = [];

const initStudents = (dataToInit) => {
  recipes = dataToInit;
  return recipes;
};

function getRecipeById(number) {
  if (number <= recipes.length && number > -1) {
    // eslint-disable-next-line no-const-assign
    return recipes[number - 1];
  }
  return null;
}

function getAllRecipes() {
  return recipes;
}

function getSuitableRecipes(results) {
  let missingItems = [];
  let recipesToShow = [];
  let obj = {};
  // if (results === []) { See võrdlus ei pruugi töötada
  /*   if (results.length < 1) {
    for (let i = 0; i < recipes.length - 1; i++) {
      obj = {};
      obj.recipeId = recipes[i].id;
      obj.noItemsList = [];
      recipesToShow.push(obj);
    }
  } else { */
  for (let i = 0; i < recipes.length - 1; i++) { // Iga retsept
    missingItems = [];
    obj = {};
    for (let j = 0; j < recipes[i].koostisosad.length; j++) {
      // Iga element retsepti koostisosade listis
      // if (results.includes(recipes[i].koostisosad[j]) === false) {
      // Lihtsam viis, kuidas kontrollida
      if (!results.includes(recipes[i].koostisosad[j])) {
        missingItems.push(recipes[i].koostisosad[j]);
      }
    }
    if (missingItems.length <= 3) {
      obj.id = recipes[i].id;
      // obj.noItemsList = [missingItems];
      // eslint-disable-next-line max-len
      // sellega omistad viite sellele originaalmassiivile ja kui seda muudad siis muutub ka objekti sees
      // Teen siia tsükli, sest muidu teeb [[list]]
      // obj.noItemsList = [missingItems];
      obj.noItemsList = [];
      for (let j = 0; j < missingItems.length; j++) {
        obj.noItemsList.push(missingItems[j]);
      }
      recipesToShow.push(obj);
      // Sortingu jaoks on vaja seda listi pikkust objekti kylge
      obj.missingItemsListLen = missingItems.length;
      // }
    }
  }
  recipesToShow = recipesToShow.sort((a, b) => a.missingItemsListLen - b.missingItemsListLen);
  return recipesToShow;
}

module.exports = {
  getRecipeById, initStudents, getAllRecipes, getSuitableRecipes,
};
