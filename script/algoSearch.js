// Import de la fonction et de l'objet recipes
import generateRecipeArticle from "./index.js";
import recipes from "/data/recipes.js";
import {
  ingredientsTagés,
  ustensilsTagés,
  appareilsTagés,
} from "./optionSelect.js";

// Sélecteur DOM de la barre de recherche
const searchInput = document.querySelector(".formulaire__inputSearch");

// Sélecteur DOM de la section des articles de recette
const sectionArticleRecette = document.querySelector(".sectionArticleRecette");

// Fonction de recherche étendue avec les tags sélectionnés
function searchRecipes(query) {
    // Filtrer les recettes en fonction de la requête de recherche
    const filteredRecipes = recipes.filter(recipe =>
        // Vérifier le titre, la liste des ingrédients et la description
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query)) ||
        recipe.description.toLowerCase().includes(query) ||
        // Vérifier les tags d'ingrédients, ustensiles et appareils sélectionnés
        ingredientsTagés.some(tag => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(tag)) ||
        ustensilsTagés.some(tag => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(tag)) ||
        appareilsTagés.includes(recipe.appliance.toLowerCase())
    );

    // Effacer la section avant d'ajouter les nouvelles recettes
    sectionArticleRecette.innerHTML = "";

    // Générer et ajouter dynamiquement les articles de recette
    filteredRecipes.forEach(recipe => {
        const recipeArticle = generateRecipeArticle(recipe);
        sectionArticleRecette.appendChild(recipeArticle);
    });
}

// Écouteur d'événements pour la saisie dans la barre de recherche
searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  // Vérifier si la longueur de la requête est supérieure ou égale à 3 caractères
  if (query.length >= 3) {
    searchRecipes(query);
  } else {
    // Si la longueur de la requête est inférieure à 3 caractères, réafficher tous les articles de recette
    sectionArticleRecette.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeArticle = generateRecipeArticle(recipe);
      sectionArticleRecette.appendChild(recipeArticle);
    });
  }
});

// // Import de la fonction et de l'objet recipes
// import generateRecipeArticle from "./index.js";
// import recipes from "/data/recipes.js";
// import { ingredientsTagés, ustensilsTagés, appareilsTagés } from "./optionSelect.js";

// // Sélecteur DOM de la barre de recherche
// const searchInput = document.querySelector(".formulaire__inputSearch");

// // Sélecteur DOM de la section des articles de recette
// const sectionArticleRecette = document.querySelector(".sectionArticleRecette");

// // Fonction de recherche
// function searchRecipes(query) {
//   // Filtrer les recettes en fonction de la requête de recherche
//   const filteredRecipes = recipes.filter(
//     (recipe) =>
//       // Vérifier le titre, la liste des ingrédients et la description
//       recipe.name.toLowerCase().includes(query) ||
//       recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(query)
//       ) ||
//       recipe.description.toLowerCase().includes(query)
//   );

//   // Effacer la section avant d'ajouter les nouvelles recettes
//   sectionArticleRecette.innerHTML = "";

//   // Générer et ajouter dynamiquement les articles de recette
//   filteredRecipes.forEach((recipe) => {
//     const recipeArticle = generateRecipeArticle(recipe);
//     sectionArticleRecette.appendChild(recipeArticle);
//   });
// }

// // Écouteur d'événements pour la saisie dans la barre de recherche
// searchInput.addEventListener("input", function () {
//     const query = searchInput.value.toLowerCase();

//     // Vérifier si la longueur de la requête est supérieure ou égale à 3 caractères
//     if (query.length >= 3) {
//         searchRecipes(query);
//     } else {
//         // Si la longueur de la requête est inférieure à 3 caractères, réafficher tous les articles de recette
//         sectionArticleRecette.innerHTML = "";
//         recipes.forEach(recipe => {
//             const recipeArticle = generateRecipeArticle(recipe);
//             sectionArticleRecette.appendChild(recipeArticle);
//         });
//     }
// });
