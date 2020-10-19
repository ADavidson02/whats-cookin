// let recipeSet = [];

let modal;
let trigger;
let closeButton;

const recipesDisplay = document.querySelector('.recipes-display');
let instructions = document.querySelector('.instructions')

// trigger.addEventListener('click', toggleModal);
// closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
window.addEventListener('load', onLoad);


function onLoad() {
  getRandomUser();
  const allRecipes = assignRecipes(recipeData)
  displayRecipes(allRecipes)
}

function callModalListeners() {
  modal = document.querySelector(".modal");
  trigger = document.querySelector(".trigger");
  closeButton = document.querySelector(".close-button");

  trigger.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);
}

function toggleModal(event) {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target && event.id === modal) {
    toggleModal();
    //add other window-click event targets here
  }
}

function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomUser() {
  user = new User(getRandomIndex(usersData))
  userPantry = new Pantry(user);
  let message = document.querySelector('.whats-cookin-message');
  message.innerHTML = `What's Cookin' in ${user.name}'s Kitchen?`
}

function displayElement(className) {
  document.querySelector(`.${className}`).remove('hidden')
}

function hideElement(className) {
  document.querySelector(`.${className}`).add('hidden')
}

function assignRecipes(recipesArray) {
  return recipesArray.map(recipe => new Recipe(recipe));
}

function displayRecipes(recipeArray) {
recipeArray.forEach(recipe => {

const recipeBlock =
`
  <article class="recipe-block" id="${recipe.id}">
    <figure>
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
      <h2>${recipe.name}</h2>
      <h3>${recipe.tags}</h3>
    </hgroup>
    <p>
      <button>Like</button>
      <button>Remove</button>
    </p>
    <p>
      <button class="trigger" id="trigger">Click here to see more</button>
      <div class="modal" id="modal">
        <div class="modal-content">
          <span class="close-button" id="close-button">x</span>
          <h1>Instructions</h1>
            <p class="instructions">${recipe.instructions}</p>
          <h3>Ingredients</h3>
            <p>${recipe.mapIngredientsInfo()}</p>
          </div>
        </div>
      </p>
    </article>
  `
    recipesDisplay.insertAdjacentHTML('afterend', recipeBlock);

    callModalListeners();
    displayRecipeInstructions(recipe);
    });
  };

  function displayRecipeIngredients(recipe, className) {
  recipe.ingredients.forEach(ingredient => {
    ingredient =
    `
    ${getIngredientName(ingredient)}:
    ${ingredient.quantity.amount} ${ingredient.quantity.unit}</br>
    `
    populateModal(ingredient, className);
  });
}

function displayRecipeIngredients(recipe, className) {
  recipe.ingredients.forEach(ingredient => {
    ingredient =
    `
    ${getIngredientName(ingredient)}:
    ${ingredient.quantity.amount} ${ingredient.quantity.unit}</br>
    `
    populateModal(ingredient, className);
  });
}


    function getIngredientName(ingredient) {
  let name;
  ingredientsData.forEach(ingredientData => {
    if (ingredient.id === ingredientData.id) {
      name = ingredientData.name;
    }
  })
  return name;
}
  }
