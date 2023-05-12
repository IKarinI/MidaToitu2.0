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

module.exports = { getRecipeById, initStudents };
