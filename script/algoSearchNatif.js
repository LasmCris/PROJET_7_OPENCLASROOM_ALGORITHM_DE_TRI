// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";


// Fonction customIncludes pour émuler la fonction includes avec une boucle native
function customIncludes(str, target) {
  for (let i = 0; i < str.length - target.length + 1; i++) {
    if (str.slice(i, i + target.length) === target) {
      return true;
    }
  }
  return false;
}

function searchRecipes(
  input,
  ingredientsTagés,
  ustensilsTagés,
  appareilsTagés
) {
  const filteredRecipes = [];

  for (const recipe of recipes) {
    const lowerCasedInput = input.toLowerCase();
    const lowerCasedName = recipe.name.toLowerCase();
    const lowerCasedDescription = recipe.description.toLowerCase();
    const lowerCasedAppliance = recipe.appliance.toLowerCase();

    let found = false;

    // Vérification du titre, de la liste des ingrédients et de la description
    if (
      customIncludes(lowerCasedName, lowerCasedInput) ||
      customIncludes(lowerCasedDescription, lowerCasedInput)
    ) {
      found = true;
    } else {
      for (const ingredient of recipe.ingredients) {
        if (
          customIncludes(ingredient.ingredient.toLowerCase(), lowerCasedInput)
        ) {
          found = true;
          break;
        }
      }
    }

    // Vérification des tags d'ingrédients
    if (!found) {
      for (const tag of ingredientsTagés) {
        for (const ingredient of recipe.ingredients) {
          if (customIncludes(ingredient.ingredient.toLowerCase(), tag)) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    // Vérification des ustensiles
    if (!found) {
      for (const tag of ustensilsTagés) {
        for (const ustensil of recipe.ustensils) {
          if (customIncludes(ustensil.toLowerCase(), tag)) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    // Vérification de l'appareil
    if (!found) {
      if (customIncludes(lowerCasedAppliance, appareilsTagés)) {
        found = true;
      }
    }

    if (found) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}




export default searchRecipes;
