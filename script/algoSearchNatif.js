// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";

// Fonction fonctionIncludesNative pour simuler la fonction includes avec une boucle native
function fonctionIncludesNative(ceQueJeSearch, cibleDeLaSearch) {
  for (let i = 0; i < ceQueJeSearch.length - cibleDeLaSearch.length + 1; i++) {
    if (
      ceQueJeSearch.slice(i, i + cibleDeLaSearch.length) === cibleDeLaSearch
    ) {
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
  const recettesApresFiltres = [];

  for (const recipe of recipes) {
    const inputEnMinuscule = input.toLowerCase();
    const nomRecetteEnMinuscule = recipe.name.toLowerCase();
    const descrRecetteEnMinuscule = recipe.description.toLowerCase();
    const appareilsEnMinuscule = recipe.appliance.toLowerCase();

    let dedans = false;

    // Vérification du titre, de la liste des ingrédients et de la description
    if (
      fonctionIncludesNative(nomRecetteEnMinuscule, inputEnMinuscule) ||
      fonctionIncludesNative(descrRecetteEnMinuscule, inputEnMinuscule)
    ) {
      dedans = true;
    } 
    if (!dedans) {
      for (const ingredient of recipe.ingredients) {
        if (
          fonctionIncludesNative(
            ingredient.ingredient.toLowerCase(),
            inputEnMinuscule
          )
        ) {
          dedans = true;
          break;
        }
      }
    }

    // Vérification des tags d'ingrédients
    if (!dedans) {
      for (const tag of ingredientsTagés) {
        for (const ingredient of recipe.ingredients) {
          if (
            fonctionIncludesNative(ingredient.ingredient.toLowerCase(), tag)
          ) {
            dedans = true;
            break;
          }
        }
        if (dedans) break;
      }
    }

    // Vérification des ustensiles
    if (!dedans) {
      for (const tag of ustensilsTagés) {
        for (const ustensil of recipe.ustensils) {
          if (fonctionIncludesNative(ustensil.toLowerCase(), tag)) {
            dedans = true;
            break;
          }
        }
        if (dedans) break;
      }
    }

    // Vérification de l'appareil
    if (!dedans) {
      if (fonctionIncludesNative(appareilsEnMinuscule, appareilsTagés)) {
        dedans = true;
      }
    }

    if (dedans) {
      recettesApresFiltres.push(recipe);
    }
  }

  return recettesApresFiltres;
}

export default searchRecipes;
