// let recipeSet = [];

let modal;
let trigger;
let likeBtn

//Query Selectors
let allRecipes = document.querySelector('.all-recipes');
let recipesDisplay = document.querySelector('.recipes-display');
let instructions = document.querySelector('.instructions');
let ingredients = document.querySelector('.ingredients');
let estimatedCost = document.querySelector('.estimated-cost')
let closeButton = document.querySelector('.close-button');
let instructionModal = document.querySelector('.modal')
let favoritesView = document.querySelector('.favorite-recipes-view')


//Functions//Event Listeners

window.addEventListener('click', windowOnClick);
window.addEventListener('load', onLoad);
recipesDisplay.addEventListener('click', recipeBlockClickHandler)
// favoritesView.addEventListener('click', displayFavorites)


//Functions
function onLoad() {
  getRandomUser();
  const allRecipes = assignRecipes(recipeData)
  displayRecipes(allRecipes)
}

//Call
function recipeBlockClickHandler(event) {
  if (event.target.classList.contains("close-button")) {
    instructionModal.classList.toggle("show-modal")
  }
  if (event.target.classList.contains("trigger")) {
    let recipeID = event.target.closest(".recipe-block").id
    displayModal(recipeID)
  }
  if (event.target.classList.contains("like-btn")) {
    let newRecipe = event.target.closest(".recipe-block").id
    addToFavorites(newRecipe)
  }
}

function displayModal(recipeID) {
  // callModalListeners();
  const foundRecipe = recipeData.find(recipe => {
    return recipe.id === +recipeID
  })
  document.querySelector('.ingredients').innerHTML = ''
  document.querySelector('.instructions').innerHTML = ''
  document.querySelector('.estimated-cost').innerHTML = ''
  displayRecipeInstructions(foundRecipe, "instructions")
  displayRecipeIngredients(foundRecipe, "ingredients");
  displayCostOfRecipe(foundRecipe, "estimated-cost")
  modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal")
}

// function callModalListeners() {
//   modal = document.querySelector(".modal");
//   trigger = document.querySelector(".trigger");
//   closeButton = document.querySelector(".close-button");
//
//   trigger.addEventListener('click', toggleModal);
//   closeButton.addEventListener('click', toggleModal);
// }

function toggleModal(event) {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  event.preventDefault();
  if (event.target === modal) {
    toggleModal();
  }
  if(event.target === favoritesView) {
      event.preventDefault()
    displayFavorites()
  
    //add other window-clickevent targets Here
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

function showElement(className) {
  document.querySelector(`.${className}`).remove('hidden')
}

function hideElement(className) {
  className.classList.add("hidden")
}

function assignRecipes(recipesArray) {
  return recipesArray.map(recipe => new Recipe(recipe));
}

// function displayRecipes(recipeArray) {
//   recipeArray.forEach(recipe => {
function displayRecipes(list) {
  list.forEach(recipe => {

const recipeBlock =
`
  <article class="recipe-block" id="${recipe.id}">
    <figure>
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
      <h2>${recipe.name}</h2>
      <h3 class="tags">${recipe.tags}</h3>
    </hgroup>
    <p>
      <button class ="like-btn">Like</button>
      <button>Remove</button>
    </p>
      <button class="trigger" id="trigger">Click here to see more</button>
    </article>
  `
    recipesDisplay.insertAdjacentHTML('beforeend', recipeBlock);
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

function displayRecipeInstructions(recipe, className) {
  recipe.instructions.forEach(instruction => {

    instruction =
    `${instruction.number}. ${instruction.instruction}</br>`

    populateModal(instruction, className);
  });
}

function populateModal(item, className) {
  document.querySelector(`.${className}`).insertAdjacentHTML('beforeend', item)
}

// function displayTags(item, className) {
//   document.querySelector().insertAdjacentHTML('beforeend', item)
// }

function getIngredientName(ingredient) {
  let name;
  ingredientsData.forEach(ingredientData => {
    if (ingredient.id === ingredientData.id) {
      name = ingredientData.name;
    }
  })
  return name;
}

function displayCostOfRecipe(recipe, className) {
  recipe = new Recipe(recipe)
  let cost = `¢${recipe.getCostOfRecipe()}`
  populateModal(cost, className)
}

function addToFavorites(newRecipe) {
  const foundRecipe = recipeData.find(recipe => {
     return recipe.id === +newRecipe
  })
    user.addFavoriteRecipes(foundRecipe)
}


function displayFavorites() {
  hideElement(allRecipes);
  
  
}
