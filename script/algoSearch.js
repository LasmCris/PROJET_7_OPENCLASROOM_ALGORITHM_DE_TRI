// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";





function searchRecipes(input,) 
{
  const recettesApresFiltres = [];

  for (const recipe of recipes) {
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
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(inputEnMinuscule)) {
          dedans = true;
          break;
        }
      }
    }

  }

  return recettesApresFiltres;
}



export default searchRecipes;
