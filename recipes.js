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
  const obj = {};
  if (results === []) {
    recipesToShow = getAllRecipes();
  } else {
    for (let i = 0; i < recipes.length; i++) { // Iga retsept
      for (let j = 0; j < recipes[i].koostisosad.length; j++) {
      // Iga element retsepti koostisosade listis
        if (results.includes(recipes[i].koostisosad[j]) === false) {
          missingItems.push(recipes[i].koostisosad[j]);
        }
      }
      if (missingItems.length <= 3) {
        obj.recipeId = recipes.id;
        obj.noItemsList = missingItems;
        recipesToShow.push(obj);
      }
    }
  }
  return recipesToShow;
}

module.exports = {
  getRecipeById, initStudents, getAllRecipes, getSuitableRecipes,
};
