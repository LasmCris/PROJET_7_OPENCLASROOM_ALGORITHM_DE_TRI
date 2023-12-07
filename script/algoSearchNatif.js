// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";


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
      nomRecetteEnMinuscule.includes(inputEnMinuscule) ||
      descrRecetteEnMinuscule.includes(inputEnMinuscule)
    ) {
      dedans = true;
    } else {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(inputEnMinuscule)) {
          dedans = true;
          break;
        }
      }
    }

    // Vérification des tags d'ingrédients
    if (!dedans) {
      for (const tag of ingredientsTagés) {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase() === tag) {
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
          if (ustensil.toLowerCase() === tag) {
            dedans = true;
            break;
          }
        }
        if (dedans) break;
      }
    }

    // Vérification de l'appareil
    if (!dedans) {
      if (appareilsTagés.includes(appareilsEnMinuscule)) {
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
