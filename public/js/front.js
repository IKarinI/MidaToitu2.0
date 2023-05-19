/* eslint-disable linebreak-style */
let chosenList = [];
let ingredients;

const getIngredients = async () => {
  const response = await axios.get('http://localhost:5000/ingredients');
  ingredients = response.data.ingredients;
};

getIngredients();

const addToChosenList = (id) => {
  const ingredient = ingredients.find((element) => element.id === Number(id));
  chosenList.push(ingredient);
  // salvesta veebilehitseja mällu ka
};

function searchDirections() {
  let input = document.getElementById("myInput").value;
  let filter = input.toUpperCase();
  let nupudeKast = document.getElementById("nupud");
  let nupuValikud = nupudeKast.getElementsByClassName("nupud"); // HTMLcollection nuppudest
  for (let i = 0; i < nupuValikud.length; i++) {
    let txtValue = nupuValikud[i].textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      nupuValikud[i].style.display = "";
    } else {
      nupuValikud[i].style.display = "none";
    }
  }
}

/* const sendData = () => {
  axios.post('http://localhost:5000/')
} */
