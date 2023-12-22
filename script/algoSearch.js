// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";


// Fonction principale pour rechercher les recettes
function searchRecipes(input) {
  // Filtrage des recettes en fonction de la requête de recherche et des tags
  return recipes.filter(
    (recipe) =>
      // Vérification du titre, de la liste des ingrédients et de la description
      recipe.name.toLowerCase().includes(input) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(input)
      ) ||
      recipe.description.toLowerCase().includes(input)
  );
}


export default searchRecipes;
