let modal;
let trigger;
let likeButton
let completeRecipeSet
let removeButton
//Query Selectors
let allRecipes = document.querySelector('.all-recipes');
let recipesDisplay = document.querySelector('.recipes-display');
let instructions = document.querySelector('.instructions');
let ingredients = document.querySelector('.ingredients');
let estimatedCost = document.querySelector('.estimated-cost')
let closeButton = document.querySelector('.close-button');
let recipeInfoModal = document.querySelector('.modal')
let favoritesTab = document.querySelector('.tab-favorite-recipes')
let favoriteDisplay = document.querySelector('.favorite-recipes')
let allRecipesTab = document.querySelector('.tab-all-recipes')
//Functions//Event Listeners
window.addEventListener('click', windowOnClick);
window.addEventListener('load', onLoad);
recipesDisplay.addEventListener('click', recipeBlockClickHandler)
// favoritesView.addEventListener('click', displayFavorites)
//Functions
function onLoad() {
  getRandomUser();
  completeRecipeSet = assignRecipes(recipeData)
  displayRecipesAll(completeRecipeSet)
}
//Call
function recipeBlockClickHandler(event) {
  if (event.target.classList.contains("close-button")) {
    recipeInfoModal.classList.toggle("show-modal")
  }
  if (event.target.classList.contains("trigger")) {
    let recipeID = event.target.closest(".recipe-block").id
    displayModal(recipeID)
  }
  if (event.target.classList.contains("like-btn")) {
    let newRecipe = event.target.closest(".recipe-block").id
    addToFavorites(newRecipe)
  }
  if (event.target.classList.contains("remove-btn")) {
    let removeRecipe = event.target.closest(".recipe-block").id
    removeFromFavorites(removeRecipe)
    displayFavorites()
  }
}
//MODAL
function displayModal(recipeID) {
  const foundRecipe = recipeData.find(recipe => {
    return recipe.id === +recipeID
  })
  document.querySelector('.ingredients').innerText = ''
  document.querySelector('.instructions').innerText = ''
  document.querySelector('.estimated-cost').innerText = ''
  displayRecipeInstructions(foundRecipe, "instructions");
  displayRecipeIngredients(foundRecipe, "ingredients");
  displayCostOfRecipe(foundRecipe, "estimated-cost");
  modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal")
}
function toggleModal(event) {
  modal.classList.toggle("show-modal");
}
//WINDOW EVENTS
function windowOnClick(event) {
// event.preventDefault();
  if (event.target === modal) {
    toggleModal();
  }
  if(event.target === favoritesTab) {
    event.preventDefault();
    displayFavorites()
  }
  if(event.target === allRecipesTab) {
    event.preventDefault();
    displayAllView()
  }
    //add other window-clickevent targets Here
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
// function showElement(className) {
//   document.querySelector(`.${className}`).remove('hidden')
// }
function showElement(item) {
  item.classList.remove('hidden')
}
function hideElement(className) {
  className.classList.add('hidden')
}
function assignRecipes(recipesArray) {
  return recipesArray.map(recipe => new Recipe(recipe));
}
function displayRecipesAll(completeRecipeSet) {
  favoriteDisplay.innerHTML = " ";
  completeRecipeSet.forEach(recipe => {
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
      <button class="like-btn">Like</button>
      <button class="remove-btn">Remove</button>
    </p>
      <button class="trigger" id="trigger">Click here to see more</button>
    </article>
  `
    allRecipes.insertAdjacentHTML('beforeend', recipeBlock);
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
function removeFromFavorites(newRecipe) {
  let removedRecipe = recipeData.find(recipe => {
     return recipe.id === +newRecipe
  })
    user.removeFavoriteRecipes(removedRecipe)
}

function displayFavorites() {
  allRecipes.innerHTML = " ";
  allRecipesTab.classList.remove('current')
  favoritesTab.classList.add('current')
  displayFavorited(user.favoriteRecipes);
}

function displayFavorited(favoriteRecipes) {
  user.favoriteRecipes.forEach(recipe => {
const favoritesBlock =
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
      <button class="remove-btn">Remove</button>
    </p>
      <button class="trigger" id="trigger">Click here to see more</button>
    </article>
  `
    favoriteDisplay.insertAdjacentHTML('beforeend', favoritesBlock);
    });
  };
  function displayAllView() {
    favoritesTab.classList.remove('current')
    allRecipesTab.classList.add('current')
    completeRecipeSet = assignRecipes(recipeData)
    displayRecipesAll(completeRecipeSet);
  }

