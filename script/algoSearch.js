// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";

import {
  appareilsTagés,
  ingredientsTagés,
  ustensilsTagés,
} from "./optionSelect.js";

import {filterRecipesByTags} from "./index.js";

function searchRecipes(input) {
  const recettesApresFiltres = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const inputEnMinuscule = input.toLowerCase();
    const nomRecetteEnMinuscule = recipe.name.toLowerCase();
    const descrRecetteEnMinuscule = recipe.description.toLowerCase();

    let dedans = false;

    // Vérification du titre, de la liste des ingrédients et de la description
    if (
      nomRecetteEnMinuscule.includes(inputEnMinuscule) ||
      descrRecetteEnMinuscule.includes(inputEnMinuscule)
    ) {
      dedans = true;
      recettesApresFiltres.push(recipe);
    } else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j];
        if (ingredient.ingredient.toLowerCase().includes(inputEnMinuscule)) {
          dedans = true;
          break;
        }
      }
    }
  }

   filterRecipesByTags(
     recettesApresFiltres,
     appareilsTagés,
     ingredientsTagés,
     ustensilsTagés
   );
  

  return recettesApresFiltres;
}

export default searchRecipes;
