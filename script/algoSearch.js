// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";


// Fonction de recherche étendue avec les tags sélectionnés
function searchRecipes(
  input,
  ingredientsTagés,
  ustensilsTagés,
  appareilsTagés
) {
  // Filtrer les recettes en fonction de la requête de recherche
  return recipes.filter(
    (recipe) =>
      // Vérifier le titre, la liste des ingrédients et la description
      recipe.name.toLowerCase().includes(input) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(input)
      ) ||
      recipe.description.toLowerCase().includes(input) ||
      // Vérifier les tags d'ingrédients, ustensiles et appareils sélectionnés
      ingredientsTagés.some((tag) =>
        recipe.ingredients
          .map((ingredient) => ingredient.ingredient.toLowerCase())
          .includes(tag)
      ) ||
      ustensilsTagés.some((tag) =>
        recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).includes(tag)
      ) ||
      appareilsTagés.includes(recipe.appliance.toLowerCase())
  );
}



export default searchRecipes;






