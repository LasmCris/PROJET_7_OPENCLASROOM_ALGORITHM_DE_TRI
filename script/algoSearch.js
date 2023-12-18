// Import de la fonction et de l'objet recipes
import recipes from "/data/recipes.js";

// Fonction de recherche étendue avec les tags sélectionnés
// Fonction pour filtrer les recettes en fonction des tags
function filterRecipesByTags(recipe, ingredientsTagés, ustensilsTagés, appareilsTagés, zonneDetag) {
  return (
    // Vérification des tags d'ingrédients
    ingredientsTagés.some((tag) =>
      recipe.ingredients
        .map((ingredient) => ingredient.ingredient.toLowerCase())
        .includes(tag)
    ) ||
    // Vérification des tags d'ustensiles
    ustensilsTagés.some((tag) =>
      recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).includes(tag)
    ) ||
    // Vérification des tags d'appareils
    appareilsTagés.includes(recipe.appliance.toLowerCase()) ||
    // Vérification des tags de la zone de détag
    zonneDetag.some((tag) => tag && recipe.name.toLowerCase().includes(tag))
  );
}

// Fonction principale pour rechercher les recettes
function searchRecipes(input, ingredientsTagés, ustensilsTagés, appareilsTagés, zonneDetag) {
  // Filtrage des recettes en fonction de la requête de recherche et des tags
  return recipes.filter(
    (recipe) =>
      // Vérification du titre, de la liste des ingrédients et de la description
      recipe.name.toLowerCase().includes(input) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(input)
      ) ||
      recipe.description.toLowerCase().includes(input) ||
      // Utilisation de la fonction pour filtrer les recettes en fonction des tags
      filterRecipesByTags(recipe, ingredientsTagés, ustensilsTagés, appareilsTagés, zonneDetag)
  );
}


export default searchRecipes;
